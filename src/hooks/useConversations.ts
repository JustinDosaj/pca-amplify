import { useState } from "react";
import { useAuth } from "./useAuth";
import { getConversations } from "@/services/conversation.service";

export const useConversations = () => {

    const { user } = useAuth();
    const [ conversations, setConversations ] = useState(null)

    const fetchConversations = async () => {
        if (user && conversations === null) {
            const data = await getConversations({user})
            setConversations(data)
        }
    }

    return {
        conversations,
        fetchConversations
    }
}