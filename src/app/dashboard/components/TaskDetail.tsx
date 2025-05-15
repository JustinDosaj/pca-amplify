import React from 'react';
import { Task } from '../types';

interface TaskDetailProps {
    task: Task;
}

const TaskDetail = ({ task }: TaskDetailProps) => {
    return (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-medium text-slate-900">{task.name}</h3>
                    <p className="text-sm text-slate-500">Using {task.model}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${task.status === 'running' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-slate-100 text-slate-800'}`}
                >
                    {task.status}
                </span>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Input Type
                    </label>
                    <input
                        type="text"
                        value={task.settings.inputType}
                        className="w-full px-3 py-2 border border-slate-200 rounded-md"
                        readOnly
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Instructions
                    </label>
                    <textarea
                        value={task.settings.instructions}
                        className="w-full px-3 py-2 border border-slate-200 rounded-md"
                        rows={3}
                        readOnly
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Output
                    </label>
                    <div className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 min-h-[100px]">
                        {task.output || 'No output yet'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail; 