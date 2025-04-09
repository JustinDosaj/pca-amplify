import { IAppView } from "@/types/settings"
import { IConversationsList } from "@/types/chat"
import React from "react"
import { useRouter } from "next/navigation"
import { PlusIcon } from "@heroicons/react/24/solid"
import { Button } from "../Button"

interface IMenu extends IAppView {
    conversations: IConversationsList[] | null
}

export default function Menu({className, conversations}: IMenu) {

    const router = useRouter()

    return (
        <div className={`${className} border-r border-slate-300/40 p-6 bg-slate-50`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Menu</h2>
                <Button onClick={() => router.replace('/chat/new')} color="white" variant="outline">
                    <PlusIcon className="text-slate-900 h-5 w-5"/>
                </Button>
            </div>
            <div className="space-y-2">
                {conversations?.map((item, index) => (
                <div 
                    key={index} 
                    className="p-3 bg-white rounded-lg text-slate-900 shadow-sm hover:bg-slate-100 transition-colors cursor-pointer text-base"
                    onClick={() => router.replace(`/chat/${item.conversationId}`)}
                >
                    {item.title}
                </div>
                ))}
            </div>
        </div>
    )
}