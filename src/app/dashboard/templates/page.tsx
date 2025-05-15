'use client';

import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import WorkflowCard from '../components/WorkflowCard';
import DashboardLayout from '../components/DashboardLayout';
import { mockWorkflowTemplates, mockWorkflowHistory } from '../data';

const TemplatesPage = () => {
    return (
        <DashboardLayout workflowHistory={mockWorkflowHistory}>
            <DashboardHeader title="Workflow Templates" />
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {mockWorkflowTemplates.map((workflow) => (
                        <WorkflowCard 
                            key={workflow.id}
                            workflow={workflow}
                            linkPath={`/dashboard/templates/${workflow.id}`}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TemplatesPage; 