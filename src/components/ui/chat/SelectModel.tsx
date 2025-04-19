import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useConversations } from "@/hooks/useConversations";
import { useEffect, useState, useRef } from "react";
import { LLM_MODELS } from "@/config/constants.config";

interface ISelectModel {
    className?: string,
}

export const SelectModel = ({className}: ISelectModel) => {

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
    

    return (
        <div className={`${className} flex justify-between items-center`}>
            <div className="flex justify-center w-full items-center space-x-1 text-slate-900 relative">
                <span>{model}</span>
                <ChevronDownIcon
                    onClick={toggleDropdown}
                    className="h-4 mt-0.5 hover:cursor-pointer hover:text-slate-700"
                />
                {showModelDropdown && (
                    <div ref={dropdownRef} className="absolute top-full z-50">
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
                    </div>
                )}
            </div>
        </div>
    )
}