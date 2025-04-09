import { IAppView } from "@/types/settings"
import { IConversationsList } from "@/types/chat"
import React from "react"
import { useRouter } from "next/navigation"
import { PlusIcon } from "@heroicons/react/24/solid"
import { Button } from "../Button"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid"
import { ConversationDropdown } from "./DropDown"
import { useState, useEffect } from "react"

interface IMenu extends IAppView {
    conversations: IConversationsList[] | null
}

export default function Menu({className, conversations}: IMenu) {

    const router = useRouter()
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

    const toggleDropdown = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        setOpenDropdownId(prev => (prev === id ? null : id))
    }

    const handleEdit = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        console.log("Edit:", id)
        setOpenDropdownId(null)
        // Add edit logic
    }

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        console.log("Delete:", id)
        setOpenDropdownId(null)
        // Add delete logic
    }

    // Setup global click handler
    useEffect(() => {
        // Function to close dropdown when clicking outside
        const closeDropdown = () => {
            if (openDropdownId) {
                setOpenDropdownId(null)
            }
        }
        
        // Add global click listener
        window.addEventListener('click', closeDropdown)
        
        // Cleanup function
        return () => {
            window.removeEventListener('click', closeDropdown)
        }
    }, [openDropdownId])

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
                        className="group flex justify-between items-center p-3 bg-white rounded-lg text-slate-900 shadow-sm hover:bg-slate-100 transition-colors cursor-pointer text-base"
                        onClick={() => router.replace(`/chat/${item.conversationId}`)}
                    >
                        <span className="truncate">{item.title}</span>
                        <div className="relative">
                            <EllipsisHorizontalIcon 
                                className="h-5 w-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" 
                                onClick={(e) => toggleDropdown(e, item.conversationId)}
                            />
                            {openDropdownId === item.conversationId && (
                                <div className="absolute top-3 left-0">
                                    <ConversationDropdown
                                        onEdit={(e) => handleEdit(e, item.conversationId)}
                                        onDelete={(e) => handleDelete(e, item.conversationId)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}