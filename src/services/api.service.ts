import axios from "axios";
import { IUser } from "@/types/user";

interface ConversationProps {
    user: IUser,
    conversationId?: string | null,
    input?: string,
    privacySettings?: Record<string, boolean>
    title?: string,
}

export async function sendMessage({input, conversationId, privacySettings, user}: ConversationProps) {
    
    console.log(privacySettings)
    const { idToken } = user

    const response = await axios.post(`${process.env.NEXT_PUBLIC_CHAT_API_ROUTE}/chat`, {
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

  
export async function getMessages({user, conversationId}: ConversationProps) {
    
    const { idToken } = user


    const response = await axios.get(`${process.env.NEXT_PUBLIC_CHAT_API_ROUTE}/messages`, { 
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

export async function getConversations({user}: ConversationProps) {
    
    const { idToken } = user

    const response = await axios.get(`${process.env.NEXT_PUBLIC_CHAT_API_ROUTE}/conversations`, { 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`
        }
    });

    return response.data?.conversations || ''

}

export async function deleteConversation({user, conversationId}: ConversationProps) {

    const { idToken } = user
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_CHAT_API_ROUTE}/conversations/${conversationId}`, { 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`
        }
    });

    return response.data?.success || ''
    
}

export async function editConversation({user, conversationId, title}: ConversationProps) {

    const { idToken } = user
    const response = await axios.put(`${process.env.NEXT_PUBLIC_CHAT_API_ROUTE}/conversations/${conversationId}`, {
            title: title,
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            }
        },
    )

    return response.data?.success || ''
    
}