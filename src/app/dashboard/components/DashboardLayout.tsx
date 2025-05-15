'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { WorkflowHistory } from '../types';

interface DashboardLayoutProps {
    children: React.ReactNode;
    workflowHistory: WorkflowHistory[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, workflowHistory }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="h-screen flex flex-col md:flex-row bg-white font-sans overflow-hidden">
            {/* Mobile Header */}
            <div className="flex md:hidden justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                <button onClick={() => setShowMenu(true)} aria-label="Open menu">
                    <Bars3Icon className="h-6 w-6 text-slate-700" />
                </button>
            </div>

            {/* Sidebar Menu */}
            <div className={`fixed md:static z-40 bg-slate-50 h-full transition-transform duration-300 md:translate-x-0 ${showMenu ? 'translate-x-0' : '-translate-x-full'} md:w-[15vw] w-64`}>
                <Sidebar workflowHistory={workflowHistory} />
            </div>

            {/* Backdrop for Menu */}
            {showMenu && (
                <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setShowMenu(false)} />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout; 