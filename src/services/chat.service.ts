import { generateClient } from "aws-amplify/api"
import { Schema } from "../../amplify/data/resource";
//import OpenAI from "openai";

interface ChatProps {
    message: string,
    privacySettings: Record<string, boolean>
}

//const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_API_KEY, dangerouslyAllowBrowser: true});

export const sendChatMessage = async ({message, privacySettings}: ChatProps) => {

    console.log(privacySettings)

    const client = generateClient<Schema>({ authMode: 'userPool' })

    try {
        
        // const response = await client.queries.removePersonalInfo({
        //     message: message,
        //     settings: JSON.stringify(privacySettings)
        // })

        const response = await client.queries.chatCompletion({
            message: message
        })

        // const completion = await openai.chat.completions.create({
        //     messages: [
        //         {
        //             role: "system",
        //             content: "Respond in Markdown format recongizable by React Markdown with remarkGfm"
        //         },
        //         { 
        //             role: "user", 
        //             content: message 
        //         }
        //     ],
        //     model: "gpt-3.5-turbo",
        // });

        // const content = completion.choices[0].message.content

        // const response = { data: { content: content } }

        // console.log(response)

        return response.data?.content || ''

    } catch (error) {
        console.log(error)
        throw new Error
    }

}