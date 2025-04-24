import { IAppView } from "@/types/settings";
import React, { useEffect, useRef } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import remarkGfm from 'remark-gfm';
import Input from "./Input";
import { SelectModel } from "./SelectModel";
import { useChat } from "@/hooks/useChat";

export default function Main({className, conversationId}: IAppView) {

    const { messages } = useChat(conversationId);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    return (
        <div className={`${className} h-screen overflow-hidden flex flex-col flex-1 bg-white`}>
            {/* Header */}
            <SelectModel className="hidden md:flex border-b border-slate-300/40 p-4"/>

            {/* Chat Messages Section */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => (
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
                                source={msg.content}
                            />
                        ) : (
                            msg.content // Render plain text for user messages
                        )}
                        </div>
                    </div>
                ))}
            </div>

            <Input/>

        </div>
    )
}