"use client"

import React, { createContext, useState, ReactNode } from "react";
import { getConversations, deleteConversation, editConversation } from "@/services/api.service";
import { IConversations, IEdit } from "@/types/chat";
import { useAuth } from "@/hooks/useAuth";
import { Notify } from "@/hooks/useNotify";

interface IConversationContext {
    fetchConversations: () => void,
    handleDeleteConversation: (conversationId: string) => Promise<void>,
    handleEditConversation: ({title, conversationId}: IEdit) => Promise<void>,
    setModel: React.Dispatch<React.SetStateAction<string>>,
    model: string,
    conversations: IConversations[],
    conversationIdList: string[],
}

export const ConversationsContext = createContext<IConversationContext | undefined>(undefined);

export const ConversationsProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const { user } = useAuth();
    const [ conversations, setConversations ] = useState<IConversations[]>([])
    const [ conversationIdList, setConversationIdList] = useState<string[]>([])
    const [ model, setModel ] = useState<string>("GPT-3.5 Turbo")

    const fetchConversations = async () => {
        if (user) {
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
            await deleteConversation({user, conversationId}).then(() => Notify("Conversation deleted!"))
            setConversations((prev) => prev.filter(con => con.conversationId !== conversationId));
            setConversationIdList((prev) => prev.filter(id => id !== conversationId));    

        } catch (error) {
            console.log(error)
        }

    }

    const handleEditConversation = async ({title, conversationId}: IEdit) => {
        try {
            await editConversation({user, conversationId, title}).then(() => Notify("Conversation title successfully updated!"))
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
    <ConversationsContext.Provider value={{fetchConversations, handleDeleteConversation, handleEditConversation, setModel, model, conversations, conversationIdList}}>
        {children}
    </ConversationsContext.Provider>
    )
}