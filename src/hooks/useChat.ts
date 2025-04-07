import { useState, useCallback } from "react";
import { PII_TYPE_OPTIONS } from "@/config/options.config";
import { sendMsg } from "@/services/api.service";
import { useAuth } from "./useAuth";

// TODO: Rethink how hooks are used with conversations and chats
// 1. Create useConversations hook that retrieves and displays conversations
// 2. Redesign useChat hook to take in conversationId and load out initialy history based on id
export const useChat = () => {
    
    const { user } = useAuth();

    // Chat and Message Variables
    const [ message, setMessage ] = useState<string>('');
    const [ messageHistory, setMessageHistory] = useState<string[]>(['Fake Input']);
    const [ resMessage, setResMessage ] = useState<string[]>(['Fake Response']);

    
    const sendMessage = async () => {
        if (!message.trim()) return;
    
        try {
            const response = await sendMsg({message, privacySettings, user: user})
            setResMessage(prev => [...prev, response]);
            setMessageHistory(prev => [...prev, message]);
            setMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    // Privacy 
    const [privacySettings, setPrivacySettings] = useState<Record<string, boolean>>(        
        PII_TYPE_OPTIONS.reduce((acc, type) => ({
            ...acc,
            [type.entity]: true
        }), {})
    )

    const handleTogglePrivacy = useCallback((entity: string) => {
        setPrivacySettings(prev => ({
            ...prev,
            [entity]: !prev[entity]
        }))
    },[])

    return {
        // Chat Messages
        message,
        messageHistory,
        resMessage,
        setMessage,
        sendMessage,

       // Privacy
        privacySettings,
        handleTogglePrivacy

    }
}