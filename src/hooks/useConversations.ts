"use client"

import { useState } from "react";
import { useAuth } from "./useAuth";
import { getConversations, deleteConversation } from "@/services/api.service";
import { IConversations } from "@/types/chat";

export const useConversations = () => {

    const { user } = useAuth();
    const [ conversations, setConversations ] = useState<IConversations[]>([])
    const [ conversationIdList, setConversationIdList] = useState<string[]>([])

    const fetchConversations = async () => {
        if (user && conversations.length === 0) {
            const data = await getConversations({user})

            // Extract and set all conversation ids to validate url param
            const allIds = data.map((con: IConversations) => con.conversationId)
            setConversationIdList([...conversationIdList, ...allIds])

            setConversations(data)
        }
    }

    const handleDeleteConversation = async (conversationId: string) => {

        try {
            // Delete conversation from DynamoDB
            await deleteConversation({user, conversationId})
        

        } catch (error) {
            console.log(error)
        }

    }

    return {
        conversations,
        conversationIdList,
        fetchConversations,
        handleDeleteConversation
    }
}