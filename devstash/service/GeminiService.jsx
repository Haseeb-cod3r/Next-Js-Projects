import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!apiKey) console.warn('"api key" is missing')
const ai = new GoogleGenAI({ apiKey })


const devStashTools = {
  functionDeclarations: [
    // 1. CREATE
    {
      name: "createCard",
      description: "Use when user wants to add or save a new website bookmark card",
      parameters: {
        type: "OBJECT",
        properties: {
          url: { type: "STRING", description: "The full URL of the website" },
          title: { type: "STRING", description: "A short clean title for the website" },
          description: { type: "STRING", description: "A short sentence about what the website does" },
          tags: { type: "ARRAY", items: { type: "STRING" }, description: "1 to 3 single word lowercase tags" }
        },
        required: ["url", "title", "description", "tags"]
      }
    },

    // 2. DELETE
    {
      name: "deleteCard",
      description: "Use when user wants to delete or remove an existing card. Match the card from the user's cards list.",
      parameters: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", description: "The id of the card to delete, matched from the user's cards list" }
        },
        required: ["id"]
      }
    },

    // 3. EDIT
    {
      name: "editCard",
      description: "Use when user wants to update or change an existing card. Match the card from the user's cards list.",
      parameters: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", description: "The id of the card to edit, matched from the user's cards list" },
          url: { type: "STRING", description: "Updated URL, return original if not changed" },
          title: { type: "STRING", description: "Updated title, return original if not changed" },
          description: { type: "STRING", description: "Updated description, return original if not changed" },
          tags: { type: "ARRAY", items: { type: "STRING" }, description: "Updated tags, return original if not changed" }
        },
        required: ["id", "url", "title", "description", "tags"]
      }
    },

    // 4. OPEN
    {
      name: "openWebsite",
      description: "Use when user wants to open or visit a website from their cards",
      parameters: {
        type: "OBJECT",
        properties: {
          url: { type: "STRING", description: "The URL of the website to open, matched from the user's cards list" }
        },
        required: ["url"]
      }
    }
  ]
}

export const generateAnswer = async (data) => {
  const context = `
  User's saved cards: ${JSON.stringify(data)}
  User request: edit the title of flexbox froggy card to haseeb and delete ract documentatin card
`
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:context ,
      config: {
        systemInstruction: `
You are an action executor for DevStash, a personal websites manager app.
You perform ONE action at a time and always reply with a short natural message if user ask for multiple action just reply with one line message that you cannot perform multiple action.

Rules:
- Always call the correct function for the action user asking AND reply with a short 1 line natural message like you have done the work user ask for



-Always reply with a short natural text message alongside every function call, never call a function without a text reply


- If user asks for 2 or more actions at once, do NOT call any function, just reply with a short natural message saying you can only do one task at a time
- Keep replies very short, 1 sentence max
- Do not ask the user for any information, figure it out yourself
- For createCard, generate the url, title, description and tags yourself based on your knowledge of the website
- For editCard, find the card from user's cards list by matching the website name, then only change what the user asked to change, keep everything else the same from the original card and return the url, title, description, tags
- For deleteCard, find the card from user's cards list by matching the website name and return its id
- For openWebsite, find the card from user's cards list by matching the website name and return its url
- If user asks to edit or open a card that does not exist in their cards list, do NOT call any function, just reply naturally that the card was not found

Actions:
- createCard  — user wants to add/save/bookmark a website
- deleteCard  — user wants to remove/delete a card  
- editCard    — user wants to update/change/edit a card
- openWebsite — user wants to open/visit/launch a website

`,
        temperature: 0.0,
        tools: [
          devStashTools,
        ],
        toolConfig: {
          functionCallingConfig: {
            mode: "AUTO",
          }
        }
      }
    })

    return res
  } catch (error) {
    console.error(error
    );
    return "error"
  }

}

