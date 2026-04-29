const key = "AIzaSyBZ1hbUOA-lHkS_j1_0-HpLwj0WrHMfkgc";
const SYSTEM_PROMPT = "You are a helpful assistant.";

async function test() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: "Hello" }] }],
        }),
      }
    );
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Body:", text);
  } catch (err) {
    console.error(err);
  }
}
test();
