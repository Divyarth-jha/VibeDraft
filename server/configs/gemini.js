import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",  // stable model
      contents: [
        { role: "user", parts: [{ text: prompt }] }
      ]
    });

    // Extract the text properly (genai format)
    const text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "No content";

    return text;

  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Failed to generate content");
  }
}

export default main;
