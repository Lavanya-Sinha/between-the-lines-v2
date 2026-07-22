//This file has one responsibility that is talking to LLM 

import Groq from "groq-sdk";
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function generateResponse(messages){
    try {
       console.log("MESSAGES FOR AI: ", messages);
       
        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages
        })
        return completion.choices[0].message.content
        
    } catch (error) {
         console.error("Groq Error:", error);
        throw new Error("Failed to generate AI response.");
    }
}