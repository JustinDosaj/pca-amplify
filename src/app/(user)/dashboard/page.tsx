'use client';

import React, { useState } from 'react';
import { Bars3Icon, UserCircleIcon, MagnifyingGlassIcon, PlusIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Mock data for workflow cards
const mockWorkflows = [
    {
        id: '1',
        title: 'Data Processing Pipeline',
        description: 'Automated data processing and analysis workflow',
        totalTasks: 5,
        status: 'active'
    },
    {
        id: '2',
        title: 'Customer Onboarding',
        description: 'New customer data validation and setup',
        totalTasks: 3,
        status: 'completed'
    },
    {
        id: '3',
        title: 'Report Generation',
        description: 'Monthly analytics report generation',
        totalTasks: 4,
        status: 'pending'
    }
];

const DashboardPage = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="h-screen flex flex-col md:flex-row bg-white font-sans overflow-hidden">
            {/* Mobile Header */}
            <div className="flex md:hidden justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                <button onClick={() => setShowMenu(true)} aria-label="Open menu">
                    <Bars3Icon className="h-6 w-6 text-slate-700" />
                </button>
            </div>

            {/* Sidebar Menu (left) */}
            <div className={`fixed md:static z-40 bg-slate-50 h-full transition-transform duration-300 md:translate-x-0 ${showMenu ? 'translate-x-0' : '-translate-x-full'} md:w-[15vw] w-64`}>
                <div className="h-full border-r border-slate-300/40 p-6 bg-slate-50 flex flex-col">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
                            <Link href="/">
                                <Button 
                                    color="slate" 
                                    variant="outline"
                                    className="rounded-md"
                                >
                                    <HomeIcon className="h-5 w-5 text-slate-900"/>
                                </Button>
                            </Link>
                        </div>

                        {/* Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search workflows..."
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <Button 
                            onClick={() => {}} 
                            variant="outline"
                            color="slate"
                            className="w-full justify-start mb-2 rounded-md"
                        >
                            <PlusIcon className="h-5 w-5 mr-2 text-slate-900"/>
                            New Workflow
                        </Button>
                    </div>

                    <div className="mt-auto pt-4">
                        <Button 
                            onClick={() => {}} 
                            color="slate" 
                            variant="outline"
                            className="w-full justify-start rounded-md"
                        >
                            <UserCircleIcon className="h-5 w-5 mr-2 text-slate-900"/>
                            My Account
                        </Button>
                    </div>
                </div>
            </div>

            {/* Backdrop for Menu */}
            {showMenu && (
                <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setShowMenu(false)} />
            )}

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockWorkflows.map((workflow) => (
                        <div 
                            key={workflow.id}
                            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{workflow.title}</h3>
                            <p className="text-slate-600 mb-4">{workflow.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">
                                    {workflow.totalTasks} tasks
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium
                                    ${workflow.status === 'active' ? 'bg-green-100 text-green-800' :
                                    workflow.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'}`}
                                >
                                    {workflow.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage; 