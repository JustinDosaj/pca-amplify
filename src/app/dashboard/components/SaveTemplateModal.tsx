import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface SaveTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string, description: string) => void;
    templateName: string;
    templateDescription: string;
    setTemplateName: (name: string) => void;
    setTemplateDescription: (description: string) => void;
}

const SaveTemplateModal = ({
    isOpen,
    onClose,
    onSave,
    templateName,
    templateDescription,
    setTemplateName,
    setTemplateDescription
}: SaveTemplateModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with blur */}
            <div 
                className="fixed inset-0 backdrop-blur-sm bg-white/30 transition-opacity" 
                onClick={onClose} 
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-2xl border border-slate-200 transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="absolute right-0 top-0 pr-4 pt-4">
                        <button
                            type="button"
                            className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none"
                            onClick={onClose}
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                            <h3 className="text-lg font-semibold leading-6 text-slate-900 mb-2">
                                Save Template Settings
                            </h3>
                            <p className="text-sm text-slate-500 mb-6">
                                Save this workflow as a custom template with your preferred settings. 
                                You can reuse this template later with the same configuration.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="template-name" className="block text-sm font-medium text-slate-700 mb-1">
                                        Template Name
                                    </label>
                                    <input
                                        type="text"
                                        id="template-name"
                                        value={templateName}
                                        onChange={(e) => setTemplateName(e.target.value)}
                                        placeholder="Enter a name for your template"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="template-description" className="block text-sm font-medium text-slate-700 mb-1">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        id="template-description"
                                        value={templateDescription}
                                        onChange={(e) => setTemplateDescription(e.target.value)}
                                        placeholder="Add a description to help identify this template"
                                        rows={3}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8 flex justify-end gap-3">
                        <Button
                            onClick={onClose}
                            variant="outline"
                            color="slate"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => onSave(templateName, templateDescription)}
                            color="blue"
                        >
                            Save Template
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveTemplateModal; 