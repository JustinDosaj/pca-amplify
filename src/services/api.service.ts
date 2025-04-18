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

    const response = await axios.post('https://2qa1s3ihb1.execute-api.us-west-1.amazonaws.com/dev/chat', {
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


    const response = await axios.get('https://2qa1s3ihb1.execute-api.us-west-1.amazonaws.com/dev/messages', { 
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

    const response = await axios.get('https://2qa1s3ihb1.execute-api.us-west-1.amazonaws.com/dev/conversations', { 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`
        }
    });

    return response.data?.conversations || ''

}

export async function deleteConversation({user, conversationId}: ConversationProps) {

    const { idToken } = user
    const response = await axios.delete(`https://2qa1s3ihb1.execute-api.us-west-1.amazonaws.com/dev/conversations/${conversationId}`, { 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`
        }
    });

    return response.data?.success || ''
    
}

export async function editConversation({user, conversationId, title}: ConversationProps) {

    const { idToken } = user
    const response = await axios.put(`https://2qa1s3ihb1.execute-api.us-west-1.amazonaws.com/dev/conversations/${conversationId}`, {
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