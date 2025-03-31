import { useState, useCallback } from "react";
import { PII_TYPE_OPTIONS } from "@/config/options.config";
import { sendMsg } from "@/services/chat.service";

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
            setMessageHistory((prev) => [...prev, message]); // Store user message
            setMessage(""); // Clear input field
    
            //let responseText = "";
            setResMessage((prev) => [...prev, ""]); // Start with an empty response slot
    
            for await (const word of sendMsg({ message, privacySettings })) {
                if (word) {
                    //responseText += word;
                    setResMessage((prev) => {
                        const updatedMessages = [...prev];
                        updatedMessages[updatedMessages.length - 1] += word; // Append words to last message
                        return updatedMessages;
                    });
                }
            }
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