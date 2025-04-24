import { IAppView } from "@/types/settings"
import React, { useEffect, useRef, useState } from "react"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useChat } from "@/hooks/useChat";
import { useParams } from "next/navigation";

export default function Input({className }: IAppView) {
    
    const { conversationId } = useParams() as { conversationId: string };
    const { handleSendMessage } = useChat(conversationId)
    const [input, setInput] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async () => {
        try {
            const tempInput = input;
            setInput('');
            await handleSendMessage(tempInput);
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto"; // Reset height after sending
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                await handleSubmit();
            }
        }
    }

    // Adjust height dynamically
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset first
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <div className={`${className} p-4 border border-slate-300/40 shadow-xl`}>
            <div className="flex items-end space-x-4">
                <div className="flex-1">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        rows={1}
                        className="w-full px-4 py-2 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500 overflow-hidden leading-relaxed"
                        style={{ minHeight: "40px", maxHeight: "200px" }} // control growth limits
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
