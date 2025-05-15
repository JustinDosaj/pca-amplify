import React from 'react';
import { 
    PlusIcon, 
    HomeIcon,
    ClockIcon,
    UserCircleIcon,
    BookmarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WorkflowHistory } from '../types';

interface SidebarProps {
    workflowHistory: WorkflowHistory[];
}

const Sidebar = ({ workflowHistory }: SidebarProps) => {
    const pathname = usePathname();
    
    const getStatusIcon = (status: 'running' | 'completed' | 'failed') => {
        switch (status) {
            case 'running':
                return <div className="h-5 w-5 text-blue-500 animate-spin" />;
            case 'completed':
                return <div className="h-5 w-5 text-green-500" />;
            case 'failed':
                return <div className="h-5 w-5 text-red-500" />;
            default:
                return null;
        }
    };

    return (
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
                <Link href="/dashboard/templates" passHref>
                    <Button 
                        variant="outline"
                        color="slate"
                        className={`w-full justify-start rounded-md mb-2 ${pathname === '/dashboard/templates' ? 'bg-slate-100' : ''}`}
                    >
                        <PlusIcon className="h-5 w-5 mr-2 text-slate-900"/>
                        View Workflow Templates
                    </Button>
                </Link>
                <Link href="/dashboard/my-templates" passHref>
                    <Button 
                        variant="outline"
                        color="slate"
                        className={`w-full justify-start rounded-md ${pathname === '/dashboard/my-templates' ? 'bg-slate-100' : ''}`}
                    >
                        <BookmarkIcon className="h-5 w-5 mr-2 text-slate-900"/>
                        My Templates
                    </Button>
                </Link>
                <Link href="/dashboard/tasks" passHref>
                    <Button 
                        variant="outline"
                        color="slate"
                        className={`w-full justify-start rounded-md mt-2 ${pathname === '/dashboard/tasks' ? 'bg-slate-100' : ''}`}
                    >
                        <BookmarkIcon className="h-5 w-5 mr-2 text-slate-900"/>
                        Tasks
                    </Button>
                </Link>
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
                    {workflowHistory.slice(0, 5).map((workflow) => (
                        <Link href={`/dashboard/history/${workflow.id}`} key={workflow.id}>
                            <div className="w-full text-left p-2 rounded-md hover:bg-slate-100 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 truncate">{workflow.id}</span>
                                    {getStatusIcon(workflow.status)}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link href="/dashboard/history" passHref>
                    <Button
                        variant="outline"
                        color="slate"
                        className="w-full text-sm rounded-md"
                    >
                        View All
                    </Button>
                </Link>
            </div>

            {/* My Account Button */}
            <div className="pt-8 border-t border-slate-200">
                <Link href="/dashboard/account" passHref>
                    <Button 
                        color="slate" 
                        variant="outline"
                        className={`w-full justify-start rounded-md ${pathname === '/dashboard/account' ? 'bg-slate-100' : ''}`}
                    >
                        <UserCircleIcon className="h-5 w-5 mr-2 text-slate-900"/>
                        My Account
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar; 