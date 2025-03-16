import dotenv from "dotenv";
import { Schema } from "../../data/resource";

// TODO: ATTACH BILLING TO CHATGPT OPEN AI API TO SEE IF THAT FIXES REQUEST ERROR

export const handler: Schema["chatCompletion"]["functionHandler"] = async (event, context) => {

    dotenv.config()
    console.log("Event: ", event)
    console.log("Context: ", context)
    console.log("Process.nev:", process.env.OPENAI_API_KEY)
    

    try {


        const completion = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: "Write a one-sentence bedtime story about a unicorn.",
                    }
                ]
            })
        });
        
        console.log("Completion: ", completion)
        //const response = completion.choices[0].message.content

        return 'chat';

    } catch (error) {
        console.error("Error: ", error)
        return "Bad Chat";
    }


};