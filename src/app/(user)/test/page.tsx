'use client';

import React, { useState } from 'react';
import { 
    Bars3Icon, 
    UserCircleIcon, 
    MagnifyingGlassIcon, 
    PlusIcon, 
    HomeIcon,
    ClockIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    XCircleIcon,
    PlayIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface TaskSettings {
    inputType: string;
    instructions: string;
}

interface Task {
    id: string;
    name: string;
    type: string;
    model: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    settings: TaskSettings;
    output?: string;
}

interface WorkflowTemplate {
    id: string;
    title: string;
    description: string;
    totalTasks: number;
    status: 'inactive' | 'running' | 'completed' | 'failed';
    tasks: Task[];
}

interface WorkflowHistory {
    id: string;
    templateId: string;
    title: string;
    status: 'completed' | 'failed';
    startedAt: string;
    completedAt: string;
    inputs: Record<string, string>;
    tasks: Task[];
}

// Mock data for workflow templates
const mockWorkflowTemplates: WorkflowTemplate[] = [
    {
        id: '1',
        title: 'Web Scraping & Social Media',
        description: 'Scrape webpage content, summarize data, and create social media posts',
        totalTasks: 3,
        status: 'inactive',
        tasks: [
            {
                id: '1-1',
                name: 'Web Scraping',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'url',
                    instructions: 'Extract main content and key points'
                }
            },
            {
                id: '1-2',
                name: 'Content Summarization',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'text',
                    instructions: 'Create a concise summary'
                }
            },
            {
                id: '1-3',
                name: 'Social Media Post Creation',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'text',
                    instructions: 'Generate engaging social media content'
                }
            }
        ]
    },
    {
        id: '2',
        title: 'PII Removal & Processing',
        description: 'Remove personal identifiable information and process data safely',
        totalTasks: 2,
        status: 'inactive',
        tasks: [
            {
                id: '2-1',
                name: 'PII Detection & Removal',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'text',
                    instructions: 'Identify and remove all PII'
                }
            },
            {
                id: '2-2',
                name: 'Data Processing',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'text',
                    instructions: 'Process the sanitized data'
                }
            }
        ]
    }
];

// Mock data for workflow history
const mockWorkflowHistory: WorkflowHistory[] = [
    {
        id: 'RUN-2024-03-20-001',
        templateId: '1',
        title: 'Web Scraping & Social Media',
        status: 'completed',
        startedAt: '2024-03-20T10:00:00Z',
        completedAt: '2024-03-20T10:05:00Z',
        inputs: {
            url: 'https://example.com/article',
            instructions: 'Create social media posts for Twitter and LinkedIn'
        },
        tasks: [
            {
                id: '1-1',
                name: 'Web Scraping',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'url',
                    instructions: 'Extract main content and key points'
                },
                output: 'Successfully scraped content from example.com'
            },
            {
                id: '1-2',
                name: 'Content Summarization',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'text',
                    instructions: 'Create a concise summary'
                },
                output: 'Generated a 200-word summary of the content'
            },
            {
                id: '1-3',
                name: 'Social Media Post Creation',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'text',
                    instructions: 'Generate engaging social media content'
                },
                output: 'Created 3 social media posts for different platforms'
            }
        ]
    },
    {
        id: 'RUN-2024-03-20-002',
        templateId: '2',
        title: 'PII Removal & Processing',
        status: 'completed',
        startedAt: '2024-03-20T11:30:00Z',
        completedAt: '2024-03-20T11:35:00Z',
        inputs: {
            text: 'Sample text containing PII: John Doe, 123 Main St, john@email.com',
            instructions: 'Remove all PII and analyze the remaining content'
        },
        tasks: [
            {
                id: '2-1',
                name: 'PII Detection & Removal',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'text',
                    instructions: 'Identify and remove all PII'
                },
                output: 'Removed 5 instances of PII from the document'
            },
            {
                id: '2-2',
                name: 'Data Processing',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'text',
                    instructions: 'Process the sanitized data'
                },
                output: 'Processed data and generated analysis report'
            }
        ]
    }
];

type ViewMode = 'templates' | 'workflow' | 'history' | 'all-history';

const TestPage = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTemplate | null>(null);
    const [selectedHistory, setSelectedHistory] = useState<WorkflowHistory | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('templates');
    const [historySearch, setHistorySearch] = useState('');
    const [historyFilter, setHistoryFilter] = useState<'all' | 'completed' | 'failed'>('all');

    const getStatusIcon = (status: 'running' | 'completed' | 'failed') => {
        switch (status) {
            case 'running':
                return <ArrowPathIcon className="h-5 w-5 text-blue-500 animate-spin" />;
            case 'completed':
                return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            case 'failed':
                return <XCircleIcon className="h-5 w-5 text-red-500" />;
            default:
                return null;
        }
    };

    const filteredHistory = mockWorkflowHistory.filter(workflow => {
        const matchesSearch = workflow.title.toLowerCase().includes(historySearch.toLowerCase());
        const matchesFilter = historyFilter === 'all' || workflow.status === historyFilter;
        return matchesSearch && matchesFilter;
    });

    const renderHeader = () => {
        switch (viewMode) {
            case 'templates':
                return (
                    <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                        <h1 className="text-2xl font-semibold text-slate-900">Workflow Templates</h1>
                    </div>
                );

            case 'workflow':
                return (
                    <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold text-slate-900">{selectedWorkflow?.title}</h1>
                                <p className="text-sm text-slate-500 mt-1">Template ID: {selectedWorkflow?.id}</p>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    onClick={() => {
                                        // Mock running the workflow
                                        console.log('Running workflow:', selectedWorkflow?.id);
                                    }}
                                    color="blue"
                                    className="flex items-center gap-2"
                                >
                                    <PlayIcon className="h-5 w-5" />
                                    Run Workflow
                                </Button>
                                <Button
                                    onClick={() => setViewMode('templates')}
                                    variant="outline"
                                    color="slate"
                                >
                                    Back to Templates
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            case 'history':
                return (
                    <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold text-slate-900">Workflow Run: {selectedHistory?.id}</h1>
                                <p className="text-sm text-slate-500 mt-1">
                                    Template: {selectedHistory?.title} (ID: {selectedHistory?.templateId})
                                </p>
                            </div>
                            <Button
                                onClick={() => setViewMode('all-history')}
                                variant="outline"
                                color="slate"
                            >
                                Back to History
                            </Button>
                        </div>
                    </div>
                );

            case 'all-history':
                return (
                    <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-semibold text-slate-900">Workflow History</h1>
                        </div>
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search history..."
                                    value={historySearch}
                                    onChange={(e) => setHistorySearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            </div>
                            <select
                                value={historyFilter}
                                onChange={(e) => setHistoryFilter(e.target.value as 'all' | 'completed' | 'failed')}
                                className="px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                    </div>
                );
        }
    };

    const renderMainContent = () => {
        switch (viewMode) {
            case 'templates':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {mockWorkflowTemplates.map((workflow) => (
                            <div 
                                key={workflow.id}
                                onClick={() => {
                                    setSelectedWorkflow(workflow);
                                    setViewMode('workflow');
                                }}
                                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{workflow.title}</h3>
                                <p className="text-slate-600 mb-4">{workflow.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">
                                        {workflow.totalTasks} tasks
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
                        ))}
                    </div>
                );

            case 'workflow':
                return (
                    <div className="space-y-6 p-6">
                        {selectedWorkflow?.tasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-lg border border-slate-200 p-6">
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
                        ))}
                    </div>
                );

            case 'history':
                return (
                    <div className="space-y-6 p-6">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <h3 className="text-lg font-medium text-slate-900 mb-4">Inputs</h3>
                            <div className="space-y-4">
                                {Object.entries(selectedHistory?.inputs || {}).map(([key, value]) => (
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

                        {selectedHistory?.tasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-slate-900">{task.name}</h3>
                                        <p className="text-sm text-slate-500">Using {task.model}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                        ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'}`}
                                    >
                                        {task.status}
                                    </span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Output
                                        </label>
                                        <div className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 min-h-[100px]">
                                            {task.output}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'all-history':
                return (
                    <div className="space-y-4 p-6">
                        {filteredHistory.map((workflow) => (
                            <div
                                key={workflow.id}
                                onClick={() => {
                                    setSelectedHistory(workflow);
                                    setViewMode('history');
                                }}
                                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                            >
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
                        ))}
                    </div>
                );
        }
    };

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
                <div className="h-full border-r border-slate-300/40 p-6 bg-slate-50 flex flex-col">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-900">Workflows</h2>
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
                    </div>

                    {/* History Section */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            History
                        </h3>
                        <div className="space-y-2">
                            {mockWorkflowHistory.slice(0, 5).map((workflow) => (
                                <button
                                    key={workflow.id}
                                    onClick={() => {
                                        setSelectedHistory(workflow);
                                        setViewMode('history');
                                    }}
                                    className="w-full text-left p-2 rounded-md hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600 truncate">{workflow.id}</span>
                                        {getStatusIcon(workflow.status)}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <Button
                            onClick={() => setViewMode('all-history')}
                            variant="outline"
                            color="slate"
                            className="w-full mt-2 text-sm"
                        >
                            View All History
                        </Button>
                    </div>

                    <div className="flex-1">
                        <Button 
                            onClick={() => setViewMode('templates')}
                            variant="outline"
                            color="slate"
                            className="w-full justify-start mb-2 rounded-md"
                        >
                            <PlusIcon className="h-5 w-5 mr-2 text-slate-900"/>
                            View Workflow Templates
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
            <div className="flex-1 flex flex-col overflow-hidden">
                {renderHeader()}
                <div className="flex-1 overflow-y-auto">
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );
};

export default TestPage;
