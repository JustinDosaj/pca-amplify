import { IAppView } from "@/types/settings";
import React, { SetStateAction, useEffect, useRef } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import MarkdownEditor from '@uiw/react-markdown-editor';
import remarkGfm from 'remark-gfm';
import Input from "./Input";
import { IMessage } from "@/types/chat";

interface IMain extends IAppView {
    input: string,
    messages: IMessage[],
    setMessage: React.Dispatch<SetStateAction<string>>,
    sendMessage: () => Promise<void>
}

export default function Main({className, input, messages, setMessage, sendMessage}: IMain) {

    const chatContainerRef = useRef<HTMLDivElement>(null);
    
    // Auto-scroll to bottom when messages update
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    return (
        <div className={`${className} flex flex-col flex-1 bg-white`}>
            {/* Header */}
            <div className="border-b border-slate-300/40 p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <UserCircleIcon className="h-8 w-auto mr-4" />
                    <h1 className="text-xl font-semibold text-slate-900">Chat</h1>
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

            <Input 
                input={input}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />

        </div>
    )
}