import { useState, useCallback } from "react";
import { PII_TYPE_OPTIONS } from "@/config/options.config";
import { sendChatMessage } from "@/services/chat.service";

export const useChat = () => {
    const [ message, setMessage ] = useState<string>('');
    const [ messageHistory, setMessageHistory] = useState<string[]>(['Fake Input']);
    const [ resMessage, setResMessage ] = useState<string[]>(['Fake Response']);

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


    const sendMessage = async () => {

        if (!message.trim()) return;

        try {
            const response = await sendChatMessage({message, privacySettings})
            setResMessage(prev => [...prev, response]);
            setMessageHistory(prev => [...prev, message]);
            setMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    return {
        message,
        messageHistory,
        resMessage,
        privacySettings,
        setMessage,
        handleTogglePrivacy,
        sendMessage
    }
}