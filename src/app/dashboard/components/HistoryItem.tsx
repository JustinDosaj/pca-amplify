import React from 'react';
import { WorkflowHistory } from '../types';
import Link from 'next/link';

interface HistoryItemProps {
    workflow: WorkflowHistory;
}

const HistoryItem = ({ workflow }: HistoryItemProps) => {
    return (
        <Link href={`/dashboard/history/${workflow.id}`}>
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-slate-900">{workflow.id}</h3>
                        <p className="text-sm text-slate-500">
                            Template: {workflow.title} (ID: {workflow.templateId})
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                            Started: {new Date(workflow.startedAt).toLocaleString()}
                        </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${workflow.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}
                    >
                        {workflow.status}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default HistoryItem; 