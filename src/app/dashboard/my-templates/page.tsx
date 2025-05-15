'use client';

import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SavedTemplateCard from '../components/SavedTemplateCard';
import DashboardLayout from '../components/DashboardLayout';
import { mockSavedTemplates, mockWorkflowHistory } from '../data';

const MyTemplatesPage = () => {
    return (
        <DashboardLayout workflowHistory={mockWorkflowHistory}>
            <DashboardHeader title="My Saved Templates" />
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {mockSavedTemplates.map((template) => (
                        <SavedTemplateCard 
                            key={template.id}
                            template={template}
                        />
                    ))}
                    {mockSavedTemplates.length === 0 && (
                        <div className="col-span-3 text-center py-12">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Saved Templates</h3>
                            <p className="text-slate-600">
                                You haven&apos;t saved any templates yet. Customize and save a workflow template to see it here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyTemplatesPage; 