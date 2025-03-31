'use client';

import React from 'react';
import { useChat } from '@/hooks/useChat';
import Settings from '@/components/ui/chat/Settings';
import Menu from '@/components/ui/chat/Menu';
import Main from '@/components/ui/chat/Main';

const ChatPage = () => {
  
  const { message, messageHistory, resMessage, setMessage, sendMessage, privacySettings, handleTogglePrivacy } = useChat();

  return (
    <div className="h-screen flex bg-white font-sans">
        {/* Left Sidebar */}
        <Menu className="w-[15vw]"/>
      
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
            viewWidth={30}
        />
   
    </div>
  );
};

export default ChatPage;