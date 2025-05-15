'use client';

import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import HistoryItem from '../components/HistoryItem';
import { mockWorkflowHistory } from '../data';

const HistoryPage = () => {
    const [historySearch, setHistorySearch] = useState('');
    const [historyFilter, setHistoryFilter] = useState<'all' | 'completed' | 'failed'>('all');

    const filteredHistory = mockWorkflowHistory.filter(workflow => {
        const matchesSearch = workflow.title.toLowerCase().includes(historySearch.toLowerCase());
        const matchesFilter = historyFilter === 'all' || workflow.status === historyFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <DashboardHeader 
                title="Workflow History"
                historySearch={historySearch}
                setHistorySearch={setHistorySearch}
                historyFilter={historyFilter}
                setHistoryFilter={setHistoryFilter}
            />
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-4 p-6">
                    {filteredHistory.map((workflow) => (
                        <HistoryItem key={workflow.id} workflow={workflow} />
                    ))}
                    {filteredHistory.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            No history items found matching your filters.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HistoryPage; 