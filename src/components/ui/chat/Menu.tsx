import { IAppView } from "@/types/settings"
import { IConversationsList } from "@/types/chat"
import React from "react"
import { useRouter } from "next/navigation"

interface IMenu extends IAppView {
    conversations: IConversationsList[] | null
}

export default function Menu({className, conversations}: IMenu) {

    const router = useRouter()

    return (
        <div className={`${className} border-r border-slate-300/40 p-6 bg-slate-50`}>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Menu</h2>
            <div className="space-y-2">
                {conversations?.map((item, index) => (
                <div 
                    key={index} 
                    className="p-3 bg-white rounded-lg text-slate-900 shadow-sm hover:bg-slate-100 transition-colors cursor-pointer text-base"
                    onClick={() => router.push(`/chat/${item.conversationId}`)}
                >
                    {item.title}
                </div>
                ))}
            </div>
        </div>
    )
}