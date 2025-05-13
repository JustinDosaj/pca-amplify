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
    FunnelIcon,
    TrashIcon,
    ArrowUpIcon,
    XMarkIcon,
    EnvelopeIcon,
    UserGroupIcon,
    CreditCardIcon,
    ChartBarIcon,
    InformationCircleIcon,
    BookmarkIcon
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

// Mock data for pricing plans
const pricingPlans = [
    {
        name: 'Free',
        price: 0,
        tokens: 100,
        features: ['Basic workflow templates', 'Limited storage', 'Community support']
    },
    {
        name: 'Pro',
        price: 19,
        tokens: 1000,
        features: ['All workflow templates', '5GB storage', 'Priority support', 'Advanced analytics']
    },
    {
        name: 'Enterprise',
        price: 49,
        tokens: 5000,
        features: ['Custom workflows', 'Unlimited storage', '24/7 support', 'Team collaboration', 'API access']
    }
];

// Mock data for usage history
const usageHistory = [
    { date: '2024-03-01', tokens: 20 },
    { date: '2024-03-08', tokens: 35 },
    { date: '2024-03-15', tokens: 25 },
    { date: '2024-03-22', tokens: 40 }
];

// Mock data for saved templates
const mockSavedTemplates = [
    {
        id: 'SAVED-001',
        title: 'My Social Media Post Generator',
        description: 'Customized workflow for creating engaging LinkedIn posts from blog content',
        totalTasks: 3,
        status: 'inactive',
        originalTemplateId: '1',
        savedAt: '2024-03-20T15:30:00Z',
        inputs: {
            url: 'https://myblog.com/articles',
            instructions: 'Create professional LinkedIn posts with industry insights'
        }
    },
    {
        id: 'SAVED-002',
        title: 'Customer Data Cleaner',
        description: 'Optimized PII removal workflow for customer feedback analysis',
        totalTasks: 2,
        status: 'inactive',
        originalTemplateId: '2',
        savedAt: '2024-03-21T09:15:00Z',
        inputs: {
            text: 'Customer feedback data',
            instructions: 'Remove PII and analyze sentiment'
        }
    }
];

type ViewMode = 
    | 'templates'
    | 'workflow'
    | 'history'
    | 'all-history'
    | 'account'
    | 'my-templates';

type AccountTab = 'general' | 'billing' | 'usage' | 'earn';

const TestPage = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTemplate | null>(null);
    const [selectedHistory, setSelectedHistory] = useState<WorkflowHistory | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('templates');
    const [historySearch, setHistorySearch] = useState('');
    const [historyFilter, setHistoryFilter] = useState<'all' | 'completed' | 'failed'>('all');
    const [accountTab, setAccountTab] = useState<AccountTab>('general');

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
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold text-slate-900">Workflow Templates</h1>
                            <div className="w-[400px]"></div> {/* Spacer to maintain consistent header height */}
                        </div>
                    </div>
                );

            case 'workflow':
                return (
                    <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900">{selectedWorkflow?.title}</h1>
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
                                    onClick={() => {
                                        // Mock saving the workflow
                                        console.log('Saving workflow:', selectedWorkflow?.id);
                                    }}
                                    variant="outline"
                                    color="slate"
                                    className="flex items-center gap-2"
                                >
                                    <ArrowUpIcon className="h-5 w-5" />
                                    Save Template
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
                                <h1 className="text-xl font-semibold text-slate-900">Workflow Run: {selectedHistory?.id}</h1>
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
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold text-slate-900">Workflow History</h1>
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
                    </div>
                );

            case 'account':
                return (
                    <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <UserCircleIcon className="h-10 w-10 text-slate-700" />
                                    <div>
                                        <h1 className="text-xl font-semibold text-slate-900">John Doe</h1>
                                        <p className="text-sm text-slate-500">Free Plan</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setAccountTab('general')}
                                    variant="outline"
                                    color="slate"
                                    className={`flex items-center gap-2 ${accountTab === 'general' ? 'bg-slate-100' : ''}`}
                                >
                                    General
                                </Button>
                                <Button
                                    onClick={() => setAccountTab('billing')}
                                    variant="outline"
                                    color="slate"
                                    className={`flex items-center gap-2 ${accountTab === 'billing' ? 'bg-slate-100' : ''}`}
                                >
                                    Billing
                                </Button>
                                <Button
                                    onClick={() => setAccountTab('usage')}
                                    variant="outline"
                                    color="slate"
                                    className={`flex items-center gap-2 ${accountTab === 'usage' ? 'bg-slate-100' : ''}`}
                                >
                                    Usage
                                </Button>
                                <Button
                                    onClick={() => setAccountTab('earn')}
                                    variant="outline"
                                    color="slate"
                                    className={`flex items-center gap-2 ${accountTab === 'earn' ? 'bg-slate-100' : ''}`}
                                >
                                    Earn Credits
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            case 'my-templates':
                return (
                    <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold text-slate-900">My Saved Templates</h1>
                            <div className="w-[400px]"></div> {/* Spacer to maintain consistent header height */}
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

            case 'account':
                return (
                    <div className="p-6">
                        {accountTab === 'general' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg border border-slate-200 p-6">
                                    <h2 className="text-lg font-medium text-slate-900 mb-4">Account Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    defaultValue="John Doe" 
                                                    className="flex-1 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                />
                                                <Button color="blue">Save</Button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                            <input type="email" value="john.doe@example.com" className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50" readOnly />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
                                            <input type="text" value="Free Plan" className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50" readOnly />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-slate-200 p-6">
                                    <h2 className="text-lg font-medium text-slate-900 mb-4 text-red-600">Danger Zone</h2>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-slate-900">Delete Account</h3>
                                            <p className="text-sm text-slate-500">Permanently delete your account and all associated data</p>
                                        </div>
                                        <Button color="slate" variant="outline" className="flex items-center gap-2">
                                            <TrashIcon className="h-5 w-5" />
                                            Delete Account
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {accountTab === 'billing' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg border border-slate-200 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-lg font-medium text-slate-900">Current Plan</h2>
                                            <p className="text-sm text-slate-500 mt-1">Free Plan - 100 tokens/month</p>
                                        </div>
                                        <Button color="blue" className="flex items-center gap-2">
                                            <ArrowUpIcon className="h-5 w-5" />
                                            Upgrade Plan
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                        {pricingPlans.map((plan) => (
                                            <div key={plan.name} className="border border-slate-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
                                                <h3 className="text-lg font-medium text-slate-900">{plan.name}</h3>
                                                <div className="mt-2">
                                                    <span className="text-3xl font-bold">${plan.price}</span>
                                                    <span className="text-slate-500">/month</span>
                                                </div>
                                                <p className="text-sm text-slate-500 mt-2">{plan.tokens} tokens/month</p>
                                                <ul className="mt-4 space-y-2">
                                                    {plan.features.map((feature) => (
                                                        <li key={feature} className="flex items-center text-sm text-slate-600">
                                                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Button 
                                                    color={'slate'} 
                                                    variant="outline"
                                                    className="w-full mt-6"
                                                >
                                                    {plan.name === 'Free' ? 'Current Plan' : 'Select Plan'}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium text-slate-900">Cancel Subscription</h3>
                                                <p className="text-sm text-slate-500 mt-1">Cancel your current subscription plan</p>
                                            </div>
                                            <Button color="slate" variant="outline" className="flex items-center gap-2">
                                                <XMarkIcon className="h-5 w-5" />
                                                Cancel Subscription
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {accountTab === 'usage' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <ChartBarIcon className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-slate-500">Total Credits</h3>
                                                <p className="text-2xl font-semibold text-slate-900">88</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <ClockIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-slate-500">Workflows Run</h3>
                                                <p className="text-2xl font-semibold text-slate-900">12</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <CreditCardIcon className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-slate-500">Storage Used</h3>
                                                <p className="text-2xl font-semibold text-slate-900">0 / 0.5 GB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-slate-200 p-6">
                                    <h2 className="text-lg font-medium text-slate-900 mb-4">Usage History</h2>
                                    <div className="h-64">
                                        {/* Placeholder for chart - you can integrate a charting library here */}
                                        <div className="h-full flex items-center justify-center text-slate-500">
                                            Usage trend chart will be displayed here
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {accountTab === 'earn' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                                        <h2 className="text-lg font-medium text-slate-900 mb-4">Your Referral Link</h2>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text" 
                                                value="https://yourapp.com/ref/JOHN123" 
                                                className="flex-1 px-3 py-2 border border-slate-200 rounded-md bg-slate-50" 
                                                readOnly 
                                            />
                                            <Button color="slate" variant="outline">Copy</Button>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                                        <h2 className="text-lg font-medium text-slate-900 mb-4">Referral Stats</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-slate-500">Total Credits Earned</p>
                                                <p className="text-2xl font-semibold text-slate-900">50</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-500">Friends Recruited</p>
                                                <p className="text-2xl font-semibold text-slate-900">3</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-slate-200 p-6">
                                    <h2 className="text-lg font-medium text-slate-900 mb-4">Invite Friends</h2>
                                    <div className="flex gap-2">
                                        <input 
                                            type="email" 
                                            placeholder="Enter friend's email" 
                                            className="flex-1 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        />
                                        <Button color="blue" className="flex items-center gap-2">
                                            <EnvelopeIcon className="h-5 w-5" />
                                            Send Invite
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-slate-200 p-6">
                                    <h2 className="text-lg font-medium text-slate-900 mb-4">Program Details</h2>
                                    <div className="prose prose-sm text-slate-600">
                                        <p>Earn credits by inviting friends to join our platform. For each friend who signs up using your referral link:</p>
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>You'll receive 10 credits when they sign up</li>
                                            <li>You'll receive 5 credits for each workflow they run</li>
                                            <li>Your friend will receive 5 bonus credits on signup</li>
                                        </ul>
                                        <div className="mt-4 p-4 bg-slate-50 rounded-md">
                                            <p className="text-sm text-slate-500">
                                                <InformationCircleIcon className="h-5 w-5 inline-block mr-1" />
                                                Credits earned through referrals never expire and can be used for any workflow.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'my-templates':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {mockSavedTemplates.map((template) => (
                            <div 
                                key={template.id}
                                onClick={() => {
                                    // Find the original template and set it as selected
                                    const originalTemplate = mockWorkflowTemplates.find(t => t.id === template.originalTemplateId);
                                    if (originalTemplate) {
                                        setSelectedWorkflow(originalTemplate);
                                        setViewMode('workflow');
                                    }
                                }}
                                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{template.title}</h3>
                                <p className="text-slate-600 mb-4">{template.description}</p>
                                <div className="space-y-2 mb-4">
                                    <div className="text-sm text-slate-500">
                                        Saved on: {new Date(template.savedAt).toLocaleDateString()}
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        Based on: {mockWorkflowTemplates.find(t => t.id === template.originalTemplateId)?.title}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">
                                        {template.totalTasks} tasks
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
                    {/* Title and Home Button */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">Workflow</h2>
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

                    {/* Workflow Templates Button */}
                    <div className="mb-8">
                        <Button 
                            onClick={() => setViewMode('templates')}
                            variant="outline"
                            color="slate"
                            className="w-full justify-start rounded-md mb-2"
                        >
                            <PlusIcon className="h-5 w-5 mr-2 text-slate-900"/>
                            View Workflow Templates
                        </Button>
                        <Button 
                            onClick={() => setViewMode('my-templates')}
                            variant="outline"
                            color="slate"
                            className="w-full justify-start rounded-md"
                        >
                            <BookmarkIcon className="h-5 w-5 mr-2 text-slate-900"/>
                            My Templates
                        </Button>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* History Section */}
                    <div className="pt-8 border-t border-slate-200 mb-8">
                        <h3 className="text-sm font-medium text-slate-700 mb-4 flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            History
                        </h3>
                        <div className="space-y-2 mb-4">
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
                            className="w-full text-sm rounded-md"
                        >
                            View All
                        </Button>
                    </div>

                    {/* My Account Button */}
                    <div className="pt-8 border-t border-slate-200">
                        <Button 
                            onClick={() => setViewMode('account')} 
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
