import dotenv from "dotenv";
import { Schema } from "../../data/resource";

export const handler: Schema["chatCompletion"]["functionHandler"] = async (event, context) => {

    dotenv.config()
    console.log("Context: ", context)

    const message: string = event.arguments.message || ''
    
    try {

        const completion = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: message,
                    }
                ]
            })
        });
        
        
        const data = await completion.json()
        const content: string = data.choices[0].message.content
        const response = {
            content: content,
        }

        return response;

    } catch (error) {
        console.error("Error: ", error)
    }


};