import { IAppView } from "@/types/settings";
import React, { useEffect, useRef, useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import remarkGfm from 'remark-gfm';
import Input from "./Input";
import { IMessage } from "@/types/chat";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ModelDropDown } from "./DropDown";
import { useConversations } from "@/hooks/useConversations";

interface IMain extends IAppView {
    messages: IMessage[],
    sendMessage: (input: string) => Promise<void>
}

export default function Main({className, messages, sendMessage}: IMain) {

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const { model, setModel } = useConversations()


    // Toggle dropdown open/close
    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowModelDropdown(prev => !prev);
    };

    const selectModel = (e: React.MouseEvent, newModel: string) => {
        e.stopPropagation();
        setModel(newModel)
        toggleDropdown(e);
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowModelDropdown(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);
    
    // Auto-scroll to bottom when messages update
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    return (
        <div className={`${className} flex flex-col flex-1 bg-white`}>
            {/* Header */}
            <div className="flex border-b border-slate-300/40 p-4 justify-between items-center">
                <div className="flex justify-center w-full items-center space-x-1 text-slate-900 relative">
                    <span>{model}</span>
                    <ChevronDownIcon
                        onClick={toggleDropdown}
                        className="h-4 mt-0.5 hover:cursor-pointer hover:text-slate-700"
                    />
                    {showModelDropdown && (
                        <div ref={dropdownRef} className="absolute top-full z-50">
                            <ModelDropDown selectModel={selectModel}/>
                        </div>
                    )}
                </div>
            </div>

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

            <Input sendMessage={sendMessage}/>

        </div>
    )
}