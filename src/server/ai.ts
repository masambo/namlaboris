import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { OpenRouter } from "@openrouter/sdk";

const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(8000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
});

const SYSTEM_PROMPT = `You are NamLaboris AI, a professional labour-law assistant for employers, HR practitioners, and legal teams operating in Namibia and the wider SADC region.

Guidelines:
- Anchor answers in the Namibian Labour Act (No. 11 of 2007) and SADC labour standards. Cite section numbers when relevant.
- Cover disciplinary hearings, grievances, retrenchments, arbitrations, contracts, and compliance audits.
- Use clear, structured markdown: short headings, bullet points, numbered procedures.
- Be concise but practical: every answer should give the user a next action.
- If a matter is high-risk (constructive dismissal, mass retrenchment, criminal conduct), recommend escalation to qualified counsel.
- Never invent case law. If you are uncertain, say so plainly.
- Do not provide a binding legal opinion — frame guidance as informational support.`;

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      // 1. Try OpenRouter via @openrouter/sdk
      const openRouterKey = process.env.OPENROUTER_API_KEY;
      if (openRouterKey) {
        try {
          const openrouter = new OpenRouter({
            apiKey: openRouterKey,
          });
          const stream = await openrouter.chat.send({
            chatRequest: {
              model: "google/gemini-2.0-flash-001",
              maxTokens: 500,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...data.messages
              ],
              stream: true
            }
          });

          let reply = "";
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              reply += content;
            }
          }
          
          if (reply) {
            return { error: null, reply };
          }
        } catch (err: any) {
          console.warn("OpenRouter failed, trying fallback:", err.message);
          // If it's a credit issue, we definitely want to try the fallback
        }
      }

      // 2. Try Google Gemini API directly (Fallback)
      const geminiKey = process.env.GEMINI_API_KEY;
      if (geminiKey) {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
              },
              contents: data.messages.map((m) => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }],
              }))
            }),
          }
        );

        if (res.status === 429) {
          return { error: "Too many requests. Please wait a moment and try again.", reply: null };
        }
        if (!res.ok) {
          const text = await res.text();
          console.error("Gemini API error:", res.status, text);
          return { error: `AI error (${res.status}). Please try again.`, reply: null };
        }

        const json = await res.json();
        const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        if (!reply) {
          return { error: "AI returned an empty response. Please try again.", reply: null };
        }
        return { error: null, reply };
      }

      return { error: "AI is not configured. Add OPENROUTER_API_KEY to your .env file.", reply: null };
    } catch (err: any) {
      console.error("AI call failed:", err);
      const is503 = err?.message?.includes("503") || err?.status === 503;
      const errorMsg = is503 
        ? "The AI service is temporarily overloaded (503). Please wait a few seconds and try again."
        : (err?.message || "Failed to reach AI service. Please check your connection.");
      return { error: errorMsg, reply: null };
    }
  });
