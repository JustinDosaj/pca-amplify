'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardHeader from '../../components/DashboardHeader';
import TaskDetail from '../../components/TaskDetail';
import { mockSavedTemplates, mockWorkflowTemplates } from '../../data';

const SavedTemplateDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const templateId = params.id as string;

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');

    // Find the saved template
    const selectedSavedTemplate = mockSavedTemplates.find(t => t.id === templateId);
    
    if (!selectedSavedTemplate) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">Template Not Found</h2>
                    <p className="text-slate-600 mb-4">The saved template you&apos;re looking for doesn&apos;t exist.</p>
                    <button 
                        onClick={() => router.push('/dashboard/my-templates')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to My Templates
                    </button>
                </div>
            </div>
        );
    }

    // Get the original template
    const originalTemplate = mockWorkflowTemplates.find(t => t.id === selectedSavedTemplate.originalTemplateId);
    
    if (!originalTemplate) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">Original Template Not Found</h2>
                    <p className="text-slate-600 mb-4">The original template this was based on no longer exists.</p>
                    <button 
                        onClick={() => router.push('/dashboard/my-templates')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to My Templates
                    </button>
                </div>
            </div>
        );
    }

    // Set initial edited title
    if (editedTitle === '' && selectedSavedTemplate.title) {
        setEditedTitle(selectedSavedTemplate.title);
    }

    const handleRunWorkflow = () => {
        console.log('Running saved template:', selectedSavedTemplate.id);
        // Here you would initiate the workflow run
    };

    const handleSaveTitle = () => {
        if (selectedSavedTemplate) {
            // In a real app, you'd make an API call here
            console.log('Saving new title:', editedTitle);
            selectedSavedTemplate.title = editedTitle;
            setIsEditingTitle(false);
        }
    };

    return (
        <>
            <DashboardHeader 
                selectedSavedTemplate={selectedSavedTemplate}
                showBackButton={true}
                backPath="/dashboard/my-templates"
                onRunWorkflow={handleRunWorkflow}
                isEditingTitle={isEditingTitle}
                editedTitle={editedTitle}
                setIsEditingTitle={setIsEditingTitle}
                setEditedTitle={setEditedTitle}
                onSaveTitle={handleSaveTitle}
            />
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-6 p-6">
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <h3 className="text-lg font-medium text-slate-900 mb-4">Custom Inputs</h3>
                        <div className="space-y-4">
                            {Object.entries(selectedSavedTemplate.inputs).map(([key, value]) => (
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

                    {originalTemplate.tasks.map((task) => (
                        <TaskDetail key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SavedTemplateDetailPage; 