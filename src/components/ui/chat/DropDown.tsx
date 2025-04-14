import React from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { LLM_MODELS } from "@/config/constants.config"


interface ConversationDropdownProps {
    onEdit: (e: React.MouseEvent) => void
    onDelete: (e: React.MouseEvent) => void
}


export const ConversationDropdown = ({ onEdit, onDelete }: ConversationDropdownProps) => {

    const DropDownMenuItems = [
        {
            name: "Edit Title",
            icon: PencilSquareIcon,
            iconColor: "text-slate-900",
            handler: onEdit
        },
        {
            name: "Delete",
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
                    >
                        <item.icon className={`${item.iconColor} h-4 mr-2`}/>
                        {item.name}
                    </button>
                </div>
            ))}
        </div>
    )
}


interface IModelDropDown {
    selectModel: (e: React.MouseEvent, newModel: string) => void
}

export const ModelDropDown = ({selectModel}: IModelDropDown) => {

    return (
        <div
            className="mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-md py-1 z-50"
            onClick={(e) => e.stopPropagation()}
        >
            {LLM_MODELS.map((company) =>
                company.models.map((model, index) => (
                    <div
                        key={model.value || index}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-slate-100 cursor-pointer"
                        onClick={(e) => {selectModel(e, model.name)}}
                    >
                        <company.icon className="h-4 w-4" />
                        <span className="text-sm">{model.name}</span>
                    </div>
                ))
            )}
        </div>
    );
};
