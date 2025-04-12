import { IAppView } from "@/types/settings"
import { IConversations, IEdit } from "@/types/chat"
import React from "react"
import { useRouter } from "next/navigation"
import { PlusIcon } from "@heroicons/react/24/solid"
import { Button } from "../Button"
import { EllipsisHorizontalIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { ConversationDropdown } from "./DropDown"
import { useState, useEffect } from "react"

interface IMenu extends IAppView {
    conversations: IConversations[] | null
    handleDeleteConversation: (conversationId: string) => Promise<void>
    handleEditConversation: ({title, conversationId}: IEdit) => Promise<void>
}

export default function Menu({className, conversations, handleDeleteConversation, handleEditConversation}: IMenu) {

    const router = useRouter()
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [newTitle, setNewTitle] = useState<string>('')

    const toggleDropdown = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        setOpenDropdownId(prev => (prev === id ? null : id))
    }

    const handleEdit = (e: React.MouseEvent, id: string, currentTitle: string) => {
        e.stopPropagation()
        console.log("Edit:", id)
        setNewTitle(currentTitle)
        setEditingId(id)
        setOpenDropdownId(null)
        // Add edit logic
    }

    const confirmEdit = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (editingId && newTitle.trim()) {
            await handleEditConversation({
                title: newTitle,
                conversationId: editingId,
            })
            setEditingId(null)
            setNewTitle("")
        }
    }

    const cancelEdit = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setEditingId(null)
        setNewTitle("")
    }

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        console.log("Delete:", id)
        await handleDeleteConversation(id)
        setOpenDropdownId(null)

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
                        {editingId === item.conversationId ? (
                            <div className="flex items-center gap-2">
                                <input
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm w-[75%]"
                                    autoFocus
                                />
                                <button
                                    onClick={cancelEdit}
                                    className="text-red-600 hover:text-red-800"
                                    title="Save"
                                >
                                    <XMarkIcon className="h-5"/>
                                </button>
                                <button
                                    onClick={confirmEdit}
                                    className="text-green-600 hover:text-green-800"
                                    title="Save"
                                >
                                    <CheckIcon className="h-5"/>
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="truncate">{item.title}</span>
                                <div className="relative">
                                    <EllipsisHorizontalIcon 
                                        className="h-5 w-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" 
                                        onClick={(e) => toggleDropdown(e, item.conversationId)}
                                    />
                                    {openDropdownId === item.conversationId && (
                                        <div className="absolute top-3 left-0">
                                            <ConversationDropdown
                                                onEdit={(e) => handleEdit(e, item.conversationId, item.title)}
                                                onDelete={(e) => handleDelete(e, item.conversationId)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}