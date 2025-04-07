import { useState } from "react";
import { useAuth } from "./useAuth";
import { getConversations } from "@/services/api.service";

export const useConversations = () => {

    const { user } = useAuth();
    const [ conversations, setConversations ] = useState(null)
    const [ activeConversation, setActiveConversation ] = useState<string>('')

    const fetchConversations = async () => {
        if (user && conversations === null) {
            const data = await getConversations({user})
            setConversations(data)
        }
    }

    return {
        conversations,
        activeConversation,
        setActiveConversation,
        fetchConversations
    }
}