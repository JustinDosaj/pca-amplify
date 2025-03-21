import dotenv from "dotenv";
import { Schema } from "../../data/resource";
import OpenAI from "openai"

export const handler: Schema["chatCompletion"]["functionHandler"] = async (event) => {

    dotenv.config()

    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

    const message: string = event.arguments.message || ''
    
    try {

        const completion = await openai.chat.completions.create({
            messages: [{ 
                role: "developer", 
                content: message 
            }],
            model: "gpt-3.5-turbo",
        });
        
        const content = completion.choices[0].message.content

        const response = {
            content: content,
        }

        return response;

    } catch (error) {
        console.error("Error: ", error)
    }
};