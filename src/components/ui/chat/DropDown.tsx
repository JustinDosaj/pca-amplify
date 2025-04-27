import React from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"


interface ConversationDropdownProps {
    onEdit: (e: React.MouseEvent) => void
    onDelete: (e: React.MouseEvent) => void
}


export const ConversationDropdown = ({ onEdit, onDelete }: ConversationDropdownProps) => {

    const DropDownMenuItems = [
        {
            name: "Edit Title",
            ariaLabal: "edit-button",
            icon: PencilSquareIcon,
            iconColor: "text-slate-900",
            handler: onEdit
        },
        {
            name: "Delete",
            ariaLabel: "delete-button",
            icon: TrashIcon,
            iconColor: "text-red-500",
            handler: onDelete
        },
    ]
    
    return (
        <div
            className="mt-2 w-32 bg-white border border-slate-200 rounded-md shadow-md py-1 z-50"
            onClick={(e) => e.stopPropagation()}
        >
            {DropDownMenuItems.map((item, index) => (
                <div key={index}>
                    <button
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center hover:cursor-pointer"
                        onClick={item.handler}
                        aria-label={item.ariaLabal}
                    >
                        <item.icon className={`${item.iconColor} h-4 mr-2`}/>
                        {item.name}
                    </button>
                </div>
            ))}
        </div>
    )
}
