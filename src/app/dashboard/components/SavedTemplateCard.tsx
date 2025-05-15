import React from 'react';
import { SavedTemplate } from '../types';
import Link from 'next/link';

interface SavedTemplateCardProps {
    template: SavedTemplate;
}

const SavedTemplateCard = ({ template }: SavedTemplateCardProps) => {
    return (
        <Link href={`/dashboard/my-templates/${template.id}`} key={template.id}>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{template.title}</h3>
                <p className="text-slate-600 mb-4">{template.description}</p>
                <div className="space-y-2 mb-4">
                    <div className="text-sm text-slate-500">
                        Saved on: {new Date(template.savedAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-slate-500">
                        Based on template ID: {template.originalTemplateId}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                        {template.totalTasks} task{template.totalTasks !== 1 ? 's' : ''}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${template.status === 'running' ? 'bg-blue-100 text-blue-800' :
                        template.status === 'completed' ? 'bg-green-100 text-green-800' :
                        template.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-slate-100 text-slate-800'}`}
                    >
                        {template.status}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default SavedTemplateCard; 