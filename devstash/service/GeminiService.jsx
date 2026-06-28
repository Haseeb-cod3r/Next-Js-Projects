import { GoogleGenAI } from "@google/genai";


const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!apiKey) console.warn('"api key" is missing')
const ai = new GoogleGenAI({ apiKey })


const createDevStashCard = {
  functionDeclarations: [
    {
      name: "createDevStashCard",
      description: "Extracts structured bookmark fields from a user's natural language command.",
      parameters: {
        type: "OBJECT",
        properties: {

          url: { type: "STRING", description: "The web address URL (e.g., github.com)." },
          title: { type: "STRING", description: "A clean, concise title for the card." },
          description: { type: "STRING", description: "A short sentence explaining what the site is." },
          tags: { type: "ARRAY", items: { type: "STRING" }, description: "1-3 single-word lowercase tags." }
        },
        required: ["url", "title", "description", "tags"]
      }
    }
  ]
};


export const generateAnswer = async (prompt) => {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "create a bookmark card for github website",
      config: {
        systemInstruction: "You are an automation tool for DevStash. Your only job is to turn text into bookmark layout properties using the createDevStashCard tool",
        temperature: 0.0,
        tools: [
          createDevStashCard,
        ],
        toolConfig: {
          functionCallingConfig: {
            mode: "ANY",
            allowedFunctionNames: ["createDevStashCard"]
          }
        }
      }
    })
    if (res.functionCalls && res.functionCalls.length > 0) {
      const call = res.functionCalls[0]; 
      
      if (call.name === "createDevStashCard") {
        return call.args; 
      }
    }
    return null
  } catch (error) {
    console.error(error
    );
    return "error"
  }

}

