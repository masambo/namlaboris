import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { error: "AI is not configured. Please contact support.", reply: null };
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
        }),
      });

      if (res.status === 429) {
        return { error: "Too many requests right now. Please wait a moment and try again.", reply: null };
      }
      if (res.status === 402) {
        return { error: "AI credits exhausted. Please add credits in workspace settings.", reply: null };
      }
      if (!res.ok) {
        const text = await res.text();
        console.error("AI gateway error:", res.status, text);
        return { error: "The AI assistant is temporarily unavailable.", reply: null };
      }

      const json = await res.json();
      const reply: string = json?.choices?.[0]?.message?.content ?? "";
      return { error: null, reply };
    } catch (err) {
      console.error("chatWithAssistant failed:", err);
      return { error: "An unexpected error occurred. Please try again.", reply: null };
    }
  });
