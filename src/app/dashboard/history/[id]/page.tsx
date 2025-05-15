'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardHeader from '../../components/DashboardHeader';
import TaskDetail from '../../components/TaskDetail';
import { mockWorkflowHistory } from '../../data';

const HistoryDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const historyId = params.id as string;

    // Find the history item
    const selectedHistory = mockWorkflowHistory.find(h => h.id === historyId);

    if (!selectedHistory) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">History Record Not Found</h2>
                    <p className="text-slate-600 mb-4">The history record you&apos;re looking for doesn&apos;t exist.</p>
                    <button 
                        onClick={() => router.push('/dashboard/history')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to History
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <DashboardHeader 
                selectedHistory={selectedHistory}
                showBackButton={true}
                backPath="/dashboard/history"
            />
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-6 p-6">
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <h3 className="text-lg font-medium text-slate-900 mb-4">Inputs</h3>
                        <div className="space-y-4">
                            {Object.entries(selectedHistory.inputs).map(([key, value]) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    <div className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50">
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedHistory.tasks.map((task) => (
                        <TaskDetail key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default HistoryDetailPage; 