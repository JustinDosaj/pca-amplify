import axios from "axios";
// import { Schema } from "../../amplify/data/resource";
// import { generateClient } from "aws-amplify/api";

interface ChatProps {
    message: string,
    privacySettings: Record<string, boolean>
    id: string,
}

//const client = generateClient<Schema>({ authMode: 'userPool' })

export async function sendMsg({message, privacySettings, id = ''}: ChatProps) {
    
    console.log(privacySettings)
    console.log(id)

    try {

        // const response = await client.queries.removePersonalInfo({
        //     message: message,
        //     settings: JSON.stringify(privacySettings)
        // })

        // const response = await client.queries.chatCompletion({
        //     message: message
        // })

        const response = await axios.post('https://htrpz2m50c.execute-api.us-west-1.amazonaws.com/dev/chat-completion', { 
              message: message 
            },  // This is your request body
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${id}`
              }
            }
          );

        return response.data?.content || ''

    } catch (error) {
        console.log(error)
        throw new Error
    }
}