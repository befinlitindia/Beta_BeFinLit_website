import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ComparisonResult, UserInput } from '../types';

// Initialize AI globally with safety
const apiKey = import.meta.env.VITE_API_KEY || '';
let genAI: any = null;

try {
    if (apiKey) {
        genAI = new GoogleGenAI({ apiKey });
    }
} catch (e) {
    console.error("AI Initialization failed:", e);
}

let chatSession: any = null;

const SYSTEM_INSTRUCTION = `
You are the BeFinLit India Tax Advisor, a helpful and knowledgeable financial assistant.
Your goal is to help Indian taxpayers understand their income tax liability for AY 2026-27 (FY 2025-26).
You represent the brand "BeFinLit India" (Tagline: #BecomeFinanciallyLiterate).
Tone: Professional, Encouraging, Educational, and Clear.
Formatting: Use Markdown. Use headings, bullet points, and bold text to make answers readable.

Guidelines:
1. Explain the difference between Old and New Regime simply.
2. Suggest tax-saving sections (80C, 80D, NPS) if the user is paying more tax in the Old Regime but hasn't utilized deductions.
3. Be strictly accurate about Indian Tax Laws for FY 2025-26.
    - New Regime Standard Deduction: ₹75,000.
    - Old Regime Standard Deduction: ₹50,000.
    - 80C Limit: ₹1.5 Lakh.
4. If asked about "Crypto" or "Capital Gains", provide general rules but advise professional consultation for complex cases.
`;

export const initializeChat = async () => {
    if (!genAI) return;
    try {
        chatSession = genAI.chats.create({
            model: 'gemini-1.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });
    } catch (e) {
        console.error("Failed to start AI chat:", e);
    }
};

export const sendMessageToGemini = async (
    userMessage: string,
    context?: any
): Promise<string> => {
    if (!chatSession) {
        await initializeChat();
    }

    if (!chatSession) {
        throw new Error("Failed to initialize AI session.");
    }

    let fullMessage = userMessage;

    // Prepend context if it's the first query or context has changed heavily
    if (context) {
        const contextStr = `
[CURRENT USER CONTEXT]
Regime Recommended: ${context.result?.recommendation}
Savings: ${context.result?.savings}
Income: ${context.details?.basicSalary}
--
[END CONTEXT]

User Question: ${userMessage}
    `;
        fullMessage = contextStr;
    }

    try {
        const response: GenerateContentResponse = await chatSession.sendMessage({
            message: fullMessage
        });
        return response.text || "I'm sorry, I couldn't generate a response at this time.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I apologize, but I'm having trouble connecting to the tax knowledge base right now. Please try again later.";
    }
};

export const getTaxSuggestions = async (input: UserInput, result: ComparisonResult): Promise<string> => {
    // Corrected property 'totalIncome' to 'grossTotalIncome' to match TaxResult interface
    const prompt = `
    Analyze this Indian Taxpayer Profile for FY 2025-26 (AY 2026-27).
    
    Profile:
    - Age: ${input.userAge}
    - Gross Salary: ₹${result.oldRegime.grossTotalIncome.toFixed(0)}
    - Metro City: ${input.isMetro ? 'Yes' : 'No'}
    - HRA Received: ${input.hraReceived}, Rent Paid: ${input.actualRentPaid}
    - 80C Invested: ${input.section80C} (Limit 1.5L)
    - 80D Health (Self): ${input.section80D_Self}
    - NPS (80CCD2): ${input.section80CCD2}
    - Parents: Father (${input.fatherAge || 'NA'}), Mother (${input.motherAge || 'NA'})
    
    Result:
    - Recommended: ${result.recommendation} Regime
    - Tax Old: ₹${result.oldRegime.totalTax.toFixed(0)}
    - Tax New: ₹${result.newRegime.totalTax.toFixed(0)}
    - Savings: ₹${result.savings.toFixed(0)}

    Provide 3-5 concise, high-impact tax saving tips. 
    If Old Regime is better, explain why. If New Regime is better, check if they can save more in Old by increasing investments.
    Focus on 80C gap, NPS, Health Insurance, and HRA optimization.
    Format as a simple list. Do not use conversational filler. Be brief and direct.
    `;

    if (!genAI) return "AI service not initialized.";

    try {
        const response: GenerateContentResponse = await genAI.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
        });
        return response.text || "No suggestions available.";
    } catch (error) {
        console.error("AI Tips Error:", error);
        return "Could not generate tips at this moment.";
    }
};
