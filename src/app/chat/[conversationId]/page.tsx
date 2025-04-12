'use client';

import React, { useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import Settings from '@/components/ui/chat/Settings';
import Menu from '@/components/ui/chat/Menu';
import Main from '@/components/ui/chat/Main';
import { useConversations } from '@/hooks/useConversations';
import { useParams } from 'next/navigation';

const ChatPage = () => {
  
    const { conversationId } = useParams() as { conversationId: string };
    const { messages, handleSendMessage, privacySettings, handleTogglePrivacy } = useChat(conversationId);
    const { fetchConversations, handleDeleteConversation, handleEditConversation, conversations } = useConversations();

    // Load initial conversations
    useEffect(() => {
        fetchConversations(); 
    })

  return (
    <div className="h-screen flex bg-white font-sans">
        {/* Left Sidebar */}

            <Menu 
                conversations={conversations}
                className="w-[15vw]"
                handleDeleteConversation={handleDeleteConversation}  
                handleEditConversation={handleEditConversation}
            />
            
            {/* Main Chat Section */}
            <Main
                messages={messages}
                sendMessage={handleSendMessage}
            />
        
            {/* Right Sidebar */}
            <Settings 
                privacySettings={privacySettings} 
                onTogglePrivacy={handleTogglePrivacy}
                className="w-[30vw]"
            />
    </div>
  );
};

export default ChatPage;