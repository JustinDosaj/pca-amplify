"use client"

import React, { createContext, useState, ReactNode } from "react";
import { getConversations, deleteConversation, editConversation } from "@/services/api.service";
import { IConversations, IEdit } from "@/types/chat";
import { useAuth } from "@/hooks/useAuth";

interface IConversationContext {
    fetchConversations: () => void,
    handleDeleteConversation: (conversationId: string) => Promise<void>,
    handleEditConversation: ({title, conversationId}: IEdit) => Promise<void>,
    conversations: IConversations[],
    conversationIdList: string[],
}

export const ConversationsContext = createContext<IConversationContext | undefined>(undefined);

export const ConversationsProvider: React.FC<{children: ReactNode}> = ({children}) => {

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
            setConversations((prev) => prev.filter(con => con.conversationId !== conversationId));
            setConversationIdList((prev) => prev.filter(id => id !== conversationId));    

        } catch (error) {
            console.log(error)
        }

    }

    const handleEditConversation = async ({title, conversationId}: IEdit) => {
        try {
            await editConversation({user, conversationId, title})
            setConversations((prev) =>
                prev.map((con) =>
                  con.conversationId === conversationId ? { ...con, title } : con
                )
            );
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <ConversationsContext.Provider value={{fetchConversations, handleDeleteConversation, handleEditConversation, conversations, conversationIdList}}>
        {children}
    </ConversationsContext.Provider>
    )
}