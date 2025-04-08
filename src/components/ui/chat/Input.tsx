import { IAppView } from "@/types/settings"
import React, { SetStateAction } from "react"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

interface IInput extends IAppView {
    input: string,
    setMessage: React.Dispatch<SetStateAction<string>>;
    sendMessage: () => Promise<void>
}

export default function Input({input, setMessage, sendMessage, className}: IInput) {
    
    return (
        <div className={`${className} p-4 border-t border-slate-300/40`}>
            <div className="flex items-center space-x-4">
                <div className="flex-1">
                <textarea
                    value={input}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={1}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
                />
                </div>
                <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <PaperAirplaneIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}