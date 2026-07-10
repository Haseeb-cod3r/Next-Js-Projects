# DevStash

### A Developer's Web-Sites Manager 

---

## 📌 Project Overview
**DevStash** is a personal link and resource manager designed specifically for developers. It empowers users to efficiently save, tag, search, sort, and organize tools, articles, and references encountered during daily workflows. Featuring a built-in archive system for inactive links and an integrated **AI Assistant**, users can seamlessly execute management tasks through natural conversation.

The application breaks away from generic dashboard ethics by implementing a custom design system called **'Ledger & Brass'**. It pairs a dark, structural sidebar with warm, parchment-toned content surfaces, distinct brass accents, and serif display typography for a classic, carefully considered editorial atmosphere.

---

## ✨ Key Features
*   **Save & Organize:** Save links accompanied by titles, URLs, descriptions, and customizable tags—fully searchable and sortable.
*   **Smart Sorting:** Instantly sort your stash by *Latest*, *Oldest*, *Most Viewed*, or *Least Viewed*.
*   **Tag Filtering:** Effortlessly filter your complete resource repository by one or more tags directly from the sidebar.
*   **Pin Important Items:** Pin key resources to anchor them securely at the top of your list.
*   **Archive System:** Keep your workspace tidy by moving items to a dedicated Archive space, with full restoration rights at any time (requires authentication).
*   **Live Search:** Instant, highly responsive search-as-you-type functionality with match highlighting.
*   **Secure Authentication:** Powered by **Clerk** to safely gate sensitive actions such as archiving, modifying, or restoring assets.
*   **AI Assistant:** A built-in sidebar chat companion driven by **Google Gemini 2.5 Flash** that can autonomously add, edit, delete, archive, pin, sort, search, filter, and navigate the application via conversational commands.

---

## 🛠️ Tech Stack

| Layer / Integration | Technology |
| :--- | :--- |
| **Framework** | Next.js (React) |
| **Styling** | Tailwind CSS v4 |
| **Authentication** | Clerk |
| **AI Engine** | Google Gemini 2.5 Flash |
| **Notifications** | react-hot-toast |
| **Iconography** | lucide-react |

---

## 🎨 Design System — “Ledger & Brass”

### 🧱 Color Palette
*   **Ink:** Structural layouts and core sidebar background.
*   **Parchment:** Warm, glare-reducing content area surfaces.
*   **Wine:** Accent signaling destructive actions (e.g., delete).
*   **Brass:** Primary accent color utilized for key UI focal points.
*   **Emerald:** Secondary accent denoting success indicators.
*   **Ink Muted:** Secondary text styling for balanced visual hierarchy.

### ✍️ Typography
*   **Fraunces (Serif):** Employed for headings and major titles to instill a classic, premium, editorial vibe.
*   **Inter (Sans-Serif):** Applied to core body text and functional UI components for high readability.
*   **JetBrains Mono (Monospace):** Dedicated to technical metadata such as tags, URLs, and code snippets.

### 🎬 Motion & Microinteractions
*   **Dynamic Elevation:** Resource cards gently lift and project a soft, brass-tinted shadow on cursor hover.
*   **Fluid Transitions:** Modals, dialogs, and dropdowns smoothly fade and scale into position rather than instantly snapping.
*   **Active States:** Current application navigation states are clearly demarcated via a distinct brass left-border indicator.
*   **Atmospheric Accents:** Main page headers feature a subtle, slow-floating and shimmering gradient animation.

---

## 🤖 AI Assistant Capabilities
DevStash incorporates a deeply integrated conversational agent powered by the **Gemini 2.5 Flash** model. Moving far beyond a standard QA chatbot, this assistant has direct execution permissions within the application context. It can programmatically orchestrate state changes on your behalf, allowing you to:
*   Create, modify, or delete saved items.
*   Archive and restore records.
*   Pin/unpin elements and alter filter configurations.
*   Execute complex tag filters or multi-criteria sorts.
*   Navigate natively between primary views (e.g., *Home* vs *Archive*) entirely through conversational prompts.

---

## 🏁 Conclusion
DevStash bridges utility-focused link curation with an artistic, intentional interface architecture. By combining comprehensive organization tools, an AI-driven automation layer, and a tactile design system, it delivers an application experience that feels less like an everyday CRUD dashboard and more like a high-end, personalized workspace tailored for modern developers.