'use client';

import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import WorkflowCard from '../components/WorkflowCard';
import { mockWorkflowTemplates } from '../data';

const TemplatesPage = () => {
    return (
        <>
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
        </>
    );
};

export default TemplatesPage; 