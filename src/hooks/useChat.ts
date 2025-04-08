import { useState, useCallback, useEffect } from "react";
import { PII_TYPE_OPTIONS } from "@/config/options.config";
import { getMessages, sendMessage } from "@/services/api.service";
import { useAuth } from "./useAuth";
import { IMessage, IResponse } from "@/types/chat";
import { useRouter } from "next/navigation";

// TODO: Rethink how hooks are used with conversations and chats
// 1. Create useConversations hook that retrieves and displays conversations
// 2. Redesign useChat hook to take in conversationId and load out initialy history based on id
export const useChat = (conversationId: string | null) => {

    if (conversationId == 'new') {
        conversationId = null
    }
    
    const { user } = useAuth();

    const router = useRouter();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

      // 🧠 If there's a conversationId, load its messages
    useEffect(() => {
        if (!conversationId || !user ) return;

            const loadMessages = async () => {
            const response = await getMessages({user, conversationId})
            setMessages(response || []);
        };

        loadMessages();
    }, [user, conversationId]);

    const handleSendMessage = async () => {
        
        if (!input.trim()) return;
        setIsLoading(true);
    
        // Optimistic update
        setMessages(prev => [...prev, { sender: 'user', content: input }]);
        setInput('');
    
        try {
          let response: IResponse;
    
          // New chat
          if (!conversationId) {
            response = await sendMessage({input, privacySettings, user, conversationId})
            router.push(`/chat/${response.conversationId}`); // Move to new chat route
          } 
          
          // Existing chat
          else {
            response = await sendMessage({input, privacySettings, user, conversationId})
            setMessages(prev => [...prev, { sender: 'bot', content: response.content }]);
          }
        } catch (e) {
          console.error('Message send error:', e);
        }
    
        setIsLoading(false);
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
        input,
        setInput,
        messages,
        isLoading,
        handleSendMessage,
       // Privacy
        privacySettings,
        handleTogglePrivacy

    }
}