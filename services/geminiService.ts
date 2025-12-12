import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateGameCode = async (gameTitle: string, tags: string[]): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set your Gemini API Key.");
  }

  const isSwing = tags.includes('Swing') || tags.includes('Graphics');
  const contextPrompt = isSwing 
    ? "This should be a Java Swing application with a GUI in a single file." 
    : "This should be a console-based application using System.in and System.out.";

  const prompt = `
    Create a complete, compilable, single-file Java source code for a "${gameTitle}" game.
    ${contextPrompt}
    
    Requirements:
    1. The class name must be compatible with a file named based on the game (e.g., SnakeGame).
    2. Include comments explaining the code for a beginner.
    3. Ensure the code is robust and handles basic errors.
    4. Do not use external libraries beyond the standard Java JDK.
    5. The output must be ONLY the raw Java code. Do not wrap in markdown code blocks like \`\`\`java.
    
    Make it educational and clean.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let code = response.text || '// No code generated.';
    
    // Cleanup if the model accidentally included markdown backticks despite instructions
    code = code.replace(/^```java\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '');

    return code;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate code. Please try again.");
  }
};
