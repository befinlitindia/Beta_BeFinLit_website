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
