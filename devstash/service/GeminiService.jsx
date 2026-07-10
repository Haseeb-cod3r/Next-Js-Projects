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
      description: "Use this when user wants to search for card or when user ask to search for any card",
      parameters: {
        type: "OBJECT",
        properties: {
          searchValue: { type: "STRING", description: "The search value that user provide to search the card" },
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
You are an action executor for DevStash and your name id Fiction, a personal websites manager app.
You perform ONE action at a time and always reply with a short natural message if user ask for multiple action just reply with one line message that you cannot perform multiple action.

Rules:
- Always call the correct function for the action user asking AND reply with a short 1 line natural message like you have done the work user ask for



-Always reply with a short natural text message alongside every function call, never call a function without a text reply


- If user asks for 2 or more actions at once, do NOT call any function, just reply with a short natural message saying you can only do one task at a time
- Keep replies very short, 1 sentence max
- Do not ask the user for any information, figure it out yourself
- For createCard, generate the url, title, description and tags yourself based on your knowledge of the website
- For editCard, find the card from user's cards list by matching the website name, then only change what the user asked to change, keep everything else the same from the original card and return the url, title, description, tags, id, isArchived
- For deleteCard, find the card from user's cards list by matching the website name and return its id and isArchived
- For archiveCard, find the card from user's cards list by matching the website name and return its id
- For removeArchive, find the card from user's cards list by matching the website name and return its id
- For openWebsite, find the card from user's cards list by matching the website name and return its url, id and iaArchived
- For sortData return the name of the sort action user want to sort data with there are only 4 action (Latest, Oldest, Most viewed, Least viewed) if user ask for any other option reply naturally that you cant sort data according to that action
- For handlePinCard if user ask to pin any card return that card id and isArchived property of that card
- For searchCard if user ask to search any card return the value user provide to search the card
- For filterData Use this when user wants to filter cards by applying different tags or user ask to apply different tags or user ask to show specific tag data and return the tags array
- For changeRoute return the home or archive value based on what user asked



- If user asks to edit or open a card that does not exist in their cards list, do NOT call any function, just reply naturally that the card was not found

Actions:
- createCard  — user wants to add/save/bookmark a website
- deleteCard  — user wants to remove/delete a card  
- editCard    — user wants to update/change/edit a card
- openWebsite — user wants to open/visit/launch a website
- archiveCard — user wants to add a card to archive
- removeArchive — user wants to remove a card from archive
- sortData — user wants to sort data like (Latest, Oldest, Most viewed, Least Viewed)
- handlePinCard — user wants to pin, mark, card
- searchCard — user wants to search card
- filterData — user wants to apply tags and filter data
- changeRoute — user wants to shift page like home or archive

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

