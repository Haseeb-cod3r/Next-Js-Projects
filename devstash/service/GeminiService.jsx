import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!apiKey) console.warn('"api key" is missing')
const ai = new GoogleGenAI({ apiKey })


const devStashTools = {
  functionDeclarations: [
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

    {
      name: "deleteCard",
      description: "Use when user wants to delete or remove an existing card. Match the card from the user's cards list.",
      parameters: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", description: "The id of the card to delete, matched from the user's cards list" },
          isArchived: { type: "BOOLEAN", description: "The isArchive property from the user's card list to know which data to delete stash or archived" },
        },
        required: ["id", "isArchived"]
      }
    },
    {
      name: "archiveCard",
      description: "Use when user wants to archive card from an existing card. Match the card from the user's cards list.",
      parameters: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", description: "The id of the card to we wanna archive, matched from the user's cards list" },
        },
        required: ["id"]
      }
    },
    {
      name: "removeArchive",
      description: "Use when user wants to remove card from archived card. Match the card from the user's cards list.",
      parameters: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", description: "The id of the card to we wanna archive, matched from the user's cards list" },
        },
        required: ["id"]
      }
    },


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
          tags: { type: "ARRAY", items: { type: "STRING" }, description: "Updated tags, return original if not changed" },
          isArchived: { type: "BOOLEAN", description: "The isArchive property from the user's card list to know which data to edit stash or archived" }

        },
        required: ["id", "url", "title", "description", "tags", "isArchived"]
      }
    },


    {
      name: "openWebsite",
      description: "Use when user wants to open or visit a website from their cards",
      parameters: {
        type: "OBJECT",
        properties: {
          url: { type: "STRING", description: "The URL of the website to open, matched from the user's cards list" },
          id: { type: "STRING", description: "The id of the card to increment the views of the card" },
          isArchived: { type: "BOOLEAN", description: "The isArchive property from the user's card list to know which data to change stash or archived" },
        },
        required: ["url", "id", "isArchived"]
      }
    },
    {
      name: "handlePinCard",
      description: "Use when user wants to pinned or unpinned any card",
      parameters: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", description: "The id of the card to pin that card" },
          isArchived: { type: "BOOLEAN", description: "The isArchive property from the user's card list to know which data to pinned or unpinned, stash or archived" },
        },
        required: ["id", "isArchived"]
      }
    },
    {
      name: "sortData",
      description: "Use when user wants to sort data there are 4 ways user can sort Latest, Oldest, Most viewed, Least viewed",
      parameters: {
        type: "OBJECT",
        properties: {
          sortAction: { type: "STRING", description: "The sort action name user want to sort data with like Oldest, Latest, Most viewed, Least viewed" },
        },
        required: ["sortAction"]
      }
    },
    {
      name: "filterData",
      description: "Use this when user wants to filter cards by applying or removing different tags or user ask to apply or remove tags different tags or user ask to show specific tag data",
      parameters: {
        type: "OBJECT",
        properties: {
          tags: { type: "ARRAY", items: { type: "STRING" }, description: "The array of tags that user ask to apply or to filter data with and always return tag from the card data" },
          isApply: { type: "BOOLEAN", description: "This is the boolean value if user ask to add or apply tags then give true and if user ask to remove tag than give false and always give the tag from card data" }
        },
        required: ["tags", "isApply"]
      }
    },
    {
      name: "searchCard",
      description: "Use this when user wants to search for card or when user ask to search for any card and if user ask to remove or clear search",
      parameters: {
        type: "OBJECT",
        properties: {
          searchValue: { type: "STRING", description: "The search value that user provide to search the card or empty string if user want to remove or clear search" },
        },
        required: ["searchValue"]
      }
    },
    {
      name: "changeRoute",
      description: "Use this when user wants to go to archive or home or when user ask to change route like go to archive or go to home",
      parameters: {
        type: "OBJECT",
        properties: {
          route: { type: "STRING", description: "This value can be (home or archive) if user want to got to home or user ask to open home page than return 'home' but if user says go to archive or open archive then return 'archive' " },
        },
        required: ["route"]
      }
    },
  ]
}

export const generateAnswer = async (data, prompt, setLoading) => {
  const context = `
  User's saved cards: ${JSON.stringify(data)}
  User request: ${prompt}
`
  try {
    setLoading(true)
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: context,
      config: {
        systemInstruction: `
═══════════════════════════════
ABSOLUTE RULE — READ FIRST
═══════════════════════════════
EVERY response you generate must include a short spoken text reply — even when you are also calling a function in the same turn. A function call without accompanying text is never allowed. Never leave your text response empty.

═══════════════════════════════
IDENTITY & SCOPE
═══════════════════════════════
- Your name is Fiction.
- You are the assistant inside DevStash — a personal website/link manager app.
- The person who built this site is named Haseeb-ur-Rehman.
- You have exactly two jobs: (1) execute actions on the user's stash, and (2) answer questions about DevStash itself. You do not do anything else.
- You can respond to greetings like "hello", "how are you", etc.
- If asked what you are, say you're Fiction, DevStash's built-in assistant — not a general-purpose AI.
- You ONLY discuss DevStash: what it does, how to use it, its features, its tech stack, and who built it.
- If asked a general knowledge question, a question unrelated to DevStash, or anything outside this app's scope, reply in 1 short sentence that you can only help with DevStash-related questions and actions. Do not answer the actual question.

═══════════════════════════════
APP KNOWLEDGE (for answering questions)
═══════════════════════════════
- DevStash lets users save, tag, search, sort, pin, and archive website links.
- Sorting options: Latest, Oldest, Most Viewed, Least Viewed.
- Tags can be combined to filter the stash from the sidebar.
- Archive is a separate space for inactive links; archiving/restoring requires sign-in (via Clerk).
- Pinning keeps a card at the top regardless of sort order.
- Search matches titles instantly as the user types.
- Fiction (you) can perform any of the actions below through natural conversation instead of manual clicks.
- Tech stack: Next.js (React), Tailwind CSS, Clerk for auth, Gemini 2.5 Flash for you.
- Keep these answers short and conversational — 1–3 sentences, not a bullet-point essay.

═══════════════════════════════
GENERAL ACTION RULES
═══════════════════════════════
1. Perform exactly ONE action per turn.
2. Every action call must be paired with a short, natural 1-sentence reply confirming what you did. Never call a function silently.
3. If the user asks for 2+ actions in one message, call NO function — just reply in 1 sentence that you can only handle one task at a time.
4. Never ask the user for more information — infer or generate what's missing yourself.
5. If the target card (by website/name match) isn't found in the user's list, call no function and say naturally that you couldn't find it.

═══════════════════════════════
PER-ACTION BEHAVIOR
═══════════════════════════════
- createCard: user wants to add/save/bookmark a site. Generate the url, title, description, and tags yourself from your own knowledge of the site. Check if the card already exists first — if it does, do not add a duplicate; instead tell the user it already exists.
- editCard: match the card by website name; change only what the user asked, keep the rest identical; return url, title, description, tags, id, isArchived.
- deleteCard: match by website name; return id, isArchived.
- archiveCard: match by website name; return id.
- removeArchive: match by website name; return id.
- openWebsite: match by website name; return url, id, isArchived.
- sortData: return one of Latest / Oldest / Most viewed / Least viewed. If the user requests any other sort, say naturally you can't sort by that.
- handlePinCard: match by website name; return id, isArchived.
- searchCard: return the exact search value the user gave if user said remove or clear search than give empty string as value.
- filterData: return the tags array the user wants applied.
- changeRoute: return "home" or "archive" based on what the user asked.

═══════════════════════════════
AVAILABLE ACTIONS
═══════════════════════════════
createCard, deleteCard, editCard, openWebsite, archiveCard, removeArchive, sortData, handlePinCard, searchCard, filterData, changeRoute

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
    console.log(res);
    const obj = {}
    setLoading(false)
    if (!(res?.functionCalls && Array.isArray(res?.functionCalls))) {
      if (res?.text) {
        obj.text = res.text
        obj.args = null
        obj.name = null
        return obj
      } else {
        obj.text = null
        obj.args = null
        obj.name = null
        return obj
      }
    }

    if (res.functionCalls[0]?.args) {
      obj.args = res.functionCalls[0]?.args
    } else {
      obj.args = null
    }
    if (res.functionCalls[0]?.name) {
      obj.name = res.functionCalls[0]?.name
    } else {
      obj.name = null
    }
    if (res?.text) {
      obj.text = res.text
    } else {
      obj.text = "Something went wrong pleas try again!"
    }
    obj.error = false

    return obj

  } catch (error) {
    setLoading(false)
    console.error(error);
    return { args: null, name: null, text: null, error: true }
  }

}

