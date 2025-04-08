import axios from "axios";
import { IUser } from "@/types/user";

interface ConversationProps {
    user: IUser,
    conversationId?: string | null,
    input?: string,
    privacySettings?: Record<string, boolean>
    title?: string,
}

export async function sendMessage({input, conversationId, privacySettings, user, title}: ConversationProps) {
    
    console.log(privacySettings)
    const { idToken } = user

    const response = await axios.post('https://orxamov415.execute-api.us-west-1.amazonaws.com/dev/chat-completion', {
            title: title, 
            conversationId: conversationId,
            message: input 
        },  // This is your request body
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            }
        }
    );

    return response.data || ''
}

export async function getConversations({user}: ConversationProps) {
    
    const { idToken } = user

    const response = await axios.get('https://orxamov415.execute-api.us-west-1.amazonaws.com/dev/get-conversations', { 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`
        }
    });

    return response.data?.conversations || ''

}
  
export async function getMessages({user, conversationId}: ConversationProps) {
    
    const { idToken } = user


    const response = await axios.get('https://orxamov415.execute-api.us-west-1.amazonaws.com/dev/get-messages', { 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`
        },
        params: {
            conversationId: conversationId
        }
    });

    return response.data?.messages || ''

}