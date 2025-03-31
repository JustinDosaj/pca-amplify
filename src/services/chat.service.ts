// import { generateClient } from "aws-amplify/api"
// import { Schema } from "../../amplify/data/resource";
import OpenAI from "openai";

interface ChatProps {
    message: string,
    privacySettings: Record<string, boolean>
}

const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_API_KEY, dangerouslyAllowBrowser: true});
//const client = generateClient<Schema>({ authMode: 'userPool' })

export async function* sendMsg({message, privacySettings}: ChatProps) {
    console.log(privacySettings)

    try {
        
        // const response = await client.queries.removePersonalInfo({
        //     message: message,
        //     settings: JSON.stringify(privacySettings)
        // })

        // const response = await client.queries.chatCompletion({
        //     message: message
        // })

        const stream = await openai.chat.completions.create({
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
            stream: true,
            model: "gpt-3.5-turbo",
        });

        for await (const chunk of stream) {
            console.log(`Chunk: ${chunk}`)
            const word = chunk.choices[0].delta.content
            if (word) { yield word }
        }
    } catch (error) {
        console.log(error)
        throw new Error
    }
}

export const sendChatMessage = async ({message, privacySettings}: ChatProps) => {

    console.log(privacySettings)

    try {
        
        // const response = await client.queries.removePersonalInfo({
        //     message: message,
        //     settings: JSON.stringify(privacySettings)
        // })

        // const response = await client.queries.chatCompletion({
        //     message: message
        // })

        let response = ''

        const stream = await openai.chat.completions.create({
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
            stream: true,
            model: "gpt-3.5-turbo",
        });

        for await (const chunk of stream) {
            console.log(`Chunk: ${chunk}`)
            const word = chunk.choices[0].delta.content
            if (word) { response += word }
        }

        return response
    } catch (error) {
        console.log(error)
        throw new Error
    }

}