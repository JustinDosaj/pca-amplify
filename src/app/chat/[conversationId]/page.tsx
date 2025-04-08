'use client';

import React, { useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import Settings from '@/components/ui/chat/Settings';
import Menu from '@/components/ui/chat/Menu';
import Main from '@/components/ui/chat/Main';
import { useConversations } from '@/hooks/useConversations';

const ChatPage = () => {
  
  const { message, messageHistory, resMessage, setMessage, sendMessage, privacySettings, handleTogglePrivacy } = useChat();
  const { fetchConversations, conversations, setActiveConversation } = useConversations()

  // Load initial conversations
  useEffect(() => {
    fetchConversations();
  })

  return (
    <div className="h-screen flex bg-white font-sans">
        {/* Left Sidebar */}
        <Menu 
          conversations={conversations}
          setActiveConversation={setActiveConversation}
          className="w-[15vw]"  
        />
      
        {/* Main Chat Section */}
        <Main
          message={message}
          messageHistory={messageHistory}
          resMessage={resMessage}
          setMessage={setMessage}
          sendMessage={sendMessage}
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