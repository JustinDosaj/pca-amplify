import axios from "axios";
// import { Schema } from "../../amplify/data/resource";
// import { generateClient } from "aws-amplify/api";
import { IUser } from "@/types/user";

interface ChatProps {
    message: string,
    privacySettings: Record<string, boolean>
    user: IUser
}

//const client = generateClient<Schema>({ authMode: 'userPool' })

export async function sendMsg({message, privacySettings, user}: ChatProps) {
    
    console.log(privacySettings)
    const { idToken } = user


    try {

        // const response = await client.queries.removePersonalInfo({
        //     message: message,
        //     settings: JSON.stringify(privacySettings)
        // })

        // const response = await client.queries.chatCompletion({
        //     message: message
        // })

        const response = await axios.post('https://orxamov415.execute-api.us-west-1.amazonaws.com/dev/chat-completion', { 
              conversationId: '<REPLACE_WITH_ID>',
              message: message 
            },  // This is your request body
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
              }
            }
          );

        return response.data?.content || ''

    } catch (error) {
        console.log(error)
        throw new Error
    }
}