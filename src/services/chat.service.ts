//import OpenAI from "openai";
import axios from "axios";

interface ChatProps {
    message: string,
    privacySettings: Record<string, boolean>
    id: string,
}

//const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_API_KEY, dangerouslyAllowBrowser: true});

export async function* sendMsg({message, privacySettings, id}: ChatProps) {
    
    console.log(privacySettings)

    try {

        const res = await axios.post(
            'https://lr92oquqll.execute-api.us-west-1.amazonaws.com/dev/chat-completion', 
            { message: message },  // This is your request body
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${id}`
              }
            }
          );

        const content = res?.data.content

        // const stream = await openai.chat.completions.create({
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
        //     stream: true,
        //     model: "gpt-3.5-turbo",
        // });

        // for await (const chunk of stream) {
        //     const word = chunk.choices[0].delta.content
        //     if (word) { yield word }
        // }

        yield content

    } catch (error) {
        console.log(error)
        throw new Error
    }
}