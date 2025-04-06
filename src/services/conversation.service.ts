import axios from "axios";
import { IUser } from "@/types/user";

interface ConversationProps {
    user: IUser
}

export async function getConversations({user}: ConversationProps) {
    
    const { idToken } = user

    try {

        const response = await axios.get('https://orxamov415.execute-api.us-west-1.amazonaws.com/dev/get-conversations', { 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            }
        });

        return response.data?.conversations || ''

    } catch (error) {
        console.log(error)
        throw new Error
    }
}