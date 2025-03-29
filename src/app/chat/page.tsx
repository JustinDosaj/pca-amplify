'use client';

import React, { useEffect, useRef } from 'react';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import Settings from '@/components/ui/chat/Settings';
import Menu from '@/components/ui/chat/Menu';
import MarkdownEditor from '@uiw/react-markdown-editor';
import remarkGfm from 'remark-gfm';

const ChatPage = () => {
  
	const { user } = useAuth();
    const { message, messageHistory, resMessage, privacySettings, setMessage, handleTogglePrivacy, sendMessage } = useChat();
    const mergedMessages = [];
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messageHistory, resMessage]);

  // Ensure there's a response available before adding it
  for (let i = 0; i < messageHistory.length; i++) {
        mergedMessages.push({ text: messageHistory[i], sender: 'user' });

        if (i < resMessage.length) {
            mergedMessages.push({ text: resMessage[i], sender: 'bot' });
        }
  }

  return (
    <div className="h-screen flex bg-white font-sans">
      {/* Left Sidebar */}
      <Menu viewWidth={20}/>
      
      {/* Main Chat Section */}
        <div className="flex flex-col flex-1 bg-white">
            {/* Header */}
            <div className="border-b border-slate-300/40 p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <UserCircleIcon className="h-8 w-auto mr-4" />
                    <h1 className="text-xl font-semibold text-slate-900">Chat</h1>
                </div>
                {user && (
                    <div className="text-slate-900">
                    Welcome, {'User'}
                    </div>
                )}
            </div>

            {/* Chat Messages Section */}
            <div 
            ref={chatContainerRef} 
            className="flex-1 overflow-y-auto p-6 space-y-4"
            >
                {mergedMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                            max-w-[100%] px-4 py-2 rounded-2xl
                            ${msg.sender === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-slate-900'}
                        `}
                        >
                        {msg.sender === 'bot' ? (
                            <MarkdownEditor.Markdown 
                                remarkPlugins={[remarkGfm]}
                                className="my-4"
                                source={msg.text}
                            />
                        ) : (
                            msg.text // Render plain text for user messages
                        )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-300/40">
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={1}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
                    />
                    </div>
                    <button
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
      
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