import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
    MagnifyingGlassIcon, 
    PlayIcon, 
    ArrowUpIcon, 
    XMarkIcon,
    PencilIcon,
    CheckIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { WorkflowTemplate, WorkflowHistory, SavedTemplate, AccountTab } from '../types';

interface HeaderProps {
    title?: string;
    subtitle?: string;
    showBackButton?: boolean;
    backPath?: string;
    extraButtons?: React.ReactNode;
    historySearch?: string;
    setHistorySearch?: (value: string) => void;
    historyFilter?: 'all' | 'completed' | 'failed';
    setHistoryFilter?: (value: 'all' | 'completed' | 'failed') => void;
    accountTab?: AccountTab;
    setAccountTab?: (tab: AccountTab) => void;
    selectedWorkflow?: WorkflowTemplate | null;
    selectedHistory?: WorkflowHistory | null;
    selectedSavedTemplate?: SavedTemplate | null;
    isEditingTitle?: boolean;
    editedTitle?: string; 
    setIsEditingTitle?: (value: boolean) => void;
    setEditedTitle?: (value: string) => void;
    onSaveTitle?: () => void;
    onSaveTemplate?: () => void;
    onRunWorkflow?: () => void;
}

const DashboardHeader: React.FC<HeaderProps> = ({
    title,
    subtitle,
    showBackButton = false,
    backPath,
    extraButtons,
    historySearch,
    setHistorySearch,
    historyFilter,
    setHistoryFilter,
    accountTab,
    setAccountTab,
    selectedWorkflow,
    selectedHistory,
    selectedSavedTemplate,
    isEditingTitle,
    editedTitle,
    setIsEditingTitle,
    setEditedTitle,
    onSaveTitle,
    onSaveTemplate,
    onRunWorkflow
}) => {
    const pathname = usePathname();
    const router = useRouter();

    const renderBackButton = () => {
        if (!showBackButton) return null;
        
        return (
            <Button
                onClick={() => backPath ? router.push(backPath) : router.back()}
                variant="outline"
                color="slate"
            >
                Back
            </Button>
        );
    };

    // Header for Templates page
    if (pathname === '/dashboard/templates') {
        return (
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-slate-900">Workflow Templates</h1>
                    <div className="w-[400px]"></div> {/* Spacer to maintain consistent header height */}
                </div>
            </div>
        );
    }

    // Header for Tasks page
    if (pathname === '/dashboard/tasks') {
        return (
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-slate-900">Single Tasks</h1>
                    <div className="w-[400px]"></div> {/* Spacer to maintain consistent header height */}
                </div>
            </div>
        );
    }

    // Header for specific workflow template or task
    if (pathname.startsWith('/dashboard/templates/') || pathname.startsWith('/dashboard/tasks/')) {
        return (
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">{selectedWorkflow?.title || title}</h1>
                        <p className="text-sm text-slate-500 mt-1">Template ID: {selectedWorkflow?.id || subtitle}</p>
                    </div>
                    <div className="flex gap-4">
                        {onRunWorkflow && (
                            <Button
                                onClick={onRunWorkflow}
                                color="blue"
                                className="flex items-center gap-2"
                            >
                                <PlayIcon className="h-5 w-5" />
                                Run Workflow
                            </Button>
                        )}
                        {onSaveTemplate && (
                            <Button
                                onClick={onSaveTemplate}
                                variant="outline"
                                color="slate"
                                className="flex items-center gap-2"
                            >
                                <ArrowUpIcon className="h-5 w-5" />
                                Save Template
                            </Button>
                        )}
                        {renderBackButton()}
                    </div>
                </div>
            </div>
        );
    }

    // Header for History page
    if (pathname === '/dashboard/history') {
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
                                onChange={(e) => setHistorySearch && setHistorySearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                        <select
                            value={historyFilter}
                            onChange={(e) => setHistoryFilter && setHistoryFilter(e.target.value as 'all' | 'completed' | 'failed')}
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
    }

    // Header for specific history item
    if (pathname.startsWith('/dashboard/history/')) {
        return (
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">Workflow Run: {selectedHistory?.id || title}</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Template: {selectedHistory?.title || subtitle} 
                            {selectedHistory?.templateId ? `(ID: ${selectedHistory.templateId})` : ''}
                        </p>
                    </div>
                    <Button
                        onClick={() => router.push('/dashboard/history')}
                        variant="outline"
                        color="slate"
                    >
                        Back to History
                    </Button>
                </div>
            </div>
        );
    }

    // Header for Account page
    if (pathname === '/dashboard/account') {
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
                            onClick={() => setAccountTab && setAccountTab('general')}
                            variant="outline"
                            color="slate"
                            className={`flex items-center gap-2 ${accountTab === 'general' ? 'bg-slate-100' : ''}`}
                        >
                            General
                        </Button>
                        <Button
                            onClick={() => setAccountTab && setAccountTab('billing')}
                            variant="outline"
                            color="slate"
                            className={`flex items-center gap-2 ${accountTab === 'billing' ? 'bg-slate-100' : ''}`}
                        >
                            Billing
                        </Button>
                        <Button
                            onClick={() => setAccountTab && setAccountTab('usage')}
                            variant="outline"
                            color="slate"
                            className={`flex items-center gap-2 ${accountTab === 'usage' ? 'bg-slate-100' : ''}`}
                        >
                            Usage
                        </Button>
                        <Button
                            onClick={() => setAccountTab && setAccountTab('earn')}
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
    }

    // Header for My Templates page
    if (pathname === '/dashboard/my-templates') {
        return (
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-slate-900">My Saved Templates</h1>
                    <div className="w-[400px]"></div> {/* Spacer to maintain consistent header height */}
                </div>
            </div>
        );
    }

    // Header for specific saved template
    if (pathname.startsWith('/dashboard/my-templates/')) {
        return (
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {isEditingTitle ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle && setEditedTitle(e.target.value)}
                                    className="text-xl font-semibold text-slate-900 border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoFocus
                                />
                                <Button
                                    onClick={onSaveTitle}
                                    color="slate"
                                    variant="outline"
                                    className="p-1"
                                >
                                    <CheckIcon className="h-5 w-5" />
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (setIsEditingTitle) setIsEditingTitle(false);
                                        if (setEditedTitle) setEditedTitle(selectedSavedTemplate?.title || '');
                                    }}
                                    color="slate"
                                    variant="outline"
                                    className="p-1"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-xl font-semibold text-slate-900">{selectedSavedTemplate?.title || title}</h1>
                                <Button
                                    onClick={() => {
                                        if (setIsEditingTitle) setIsEditingTitle(true);
                                        if (setEditedTitle) setEditedTitle(selectedSavedTemplate?.title || '');
                                    }}
                                    color="slate"
                                    variant="outline"
                                    className="p-1"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </Button>
                            </>
                        )}
                    </div>
                    <div className="flex gap-4">
                        {onRunWorkflow && (
                            <Button
                                onClick={onRunWorkflow}
                                color="blue"
                                className="flex items-center gap-2"
                            >
                                <PlayIcon className="h-5 w-5" />
                                Run Workflow
                            </Button>
                        )}
                        <Button
                            onClick={() => router.push('/dashboard/my-templates')}
                            variant="outline"
                            color="slate"
                        >
                            Back to My Templates
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Default header for other pages
    return (
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-slate-900">{title || 'Dashboard'}</h1>
                <div className="flex gap-4">
                    {extraButtons}
                    {renderBackButton()}
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader; 