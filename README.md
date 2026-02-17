# BeFinLit Website

A comprehensive tax planning and financial literacy website for India, featuring an advanced Salary Tax Calculator updated for Budget 2026.

## Run Locally

**Prerequisites:** Node.js

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Setup Environment Variables:**
    Create a file named `.env.local` in the root directory and add your Google Gemini API key. This is required for the "Ask AI Advisor" feature.
    
    ```properties
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Run the app:**
    ```bash
    npm run dev
    ```

4.  **Build for production (optional):**
    ```bash
    npm run build
    ```

---

## Website Editing Workflow Guide (Draft Mode)

This website uses a **Draft Mode** to allow you to work on new content safely without it showing up on the live site immediately.

### How to Hide or Show a Page:
1. Open the file [components/data.ts](file:///c:/Users/shrad/Downloads/bft_website_1.0/components/data.ts).
2. Look for the article or tool you are working on.
3. Set `isDraft: true` to **hide** it from the public.
4. Set `isDraft: false` when it is **ready** to go live.

### Local Development (Draft Preview):
On your computer, you will **always** see the draft pages (as long as `VITE_DRAFT_MODE=true` is set in your `.env.local` file). This allows you and your partner to preview your work before the rest of the world sees it.

### Pushing Changes:
Whenever you change `isDraft` to `false` and "Push" your code to GitHub, the live website will update automatically to show that new content.

### Working with Two Systems:
- **Always "Pull"** the latest code before you start working on a new computer.
- One person should edit a specific file at a time to avoid "Merge Conflicts".
