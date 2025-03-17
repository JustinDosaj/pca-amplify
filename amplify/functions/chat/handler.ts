import dotenv from "dotenv";
import { Schema } from "../../data/resource";

export const handler: Schema["chatCompletion"]["functionHandler"] = async (event, context) => {

    dotenv.config()
    console.log("Event: ", event)
    console.log("Context: ", context)
    
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
                        content: "Write a one-sentence bedtime story about a unicorn.",
                    }
                ]
            })
        });
        
        
        const data = await completion.json()
        const content: string = data.choices[0].message.content

        return content;

    } catch (error) {
        console.error("Error: ", error)
        return "Bad Chat";
    }


};