import React from 'react';
import { WorkflowTemplate } from '../types';
import Link from 'next/link';

interface WorkflowCardProps {
    workflow: WorkflowTemplate;
    linkPath: string;
}

const WorkflowCard = ({ workflow, linkPath }: WorkflowCardProps) => {
    return (
        <Link href={linkPath} key={workflow.id}>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{workflow.title}</h3>
                <p className="text-slate-600 mb-4">{workflow.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                        {workflow.totalTasks} task{workflow.totalTasks !== 1 ? 's' : ''}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${workflow.status === 'running' ? 'bg-blue-100 text-blue-800' :
                        workflow.status === 'completed' ? 'bg-green-100 text-green-800' :
                        workflow.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-slate-100 text-slate-800'}`}
                    >
                        {workflow.status}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default WorkflowCard; 