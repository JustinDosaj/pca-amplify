import dotenv from "dotenv";
import { Schema } from "../../data/resource";
import OpenAI from "openai"

export const handler: Schema["chatCompletion"]["functionHandler"] = async (event) => {

    console.log("Starting Chat Completion")

    dotenv.config()
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

    // Try chat completion
    try {

        const message: string = event.arguments.message || ''

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Respond in Markdown format recongizable by React Markdown with remarkGfm"
                },
                { 
                    role: "user", 
                    content: message 
                }
            ],
            model: "gpt-3.5-turbo",
        });
        
        const content = completion.choices[0].message.content

        const response = { content: content }

        return response;

    } catch (error) {
        console.error("Error: ", error)
    }
};