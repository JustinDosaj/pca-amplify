import { useState } from "react";
import { useAuth } from "./useAuth";
import { getConversations } from "@/services/api.service";
import { IConversationsList } from "@/types/chat";

export const useConversations = () => {

    const { user } = useAuth();
    const [ conversations, setConversations ] = useState<IConversationsList[]>([])
    const [ conversationIdList, setConversationIdList] = useState<string[]>([])

    const fetchConversations = async () => {
        if (user && conversations.length === 0) {
            const data = await getConversations({user})

            // Extract and set all conversation ids to validate url param
            const allIds = data.map((con: IConversationsList) => con.conversationId)
            setConversationIdList([...conversationIdList, ...allIds])

            setConversations(data)
        }
    }

    return {
        conversations,
        conversationIdList,
        fetchConversations
    }
}