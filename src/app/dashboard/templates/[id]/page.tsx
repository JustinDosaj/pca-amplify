'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardHeader from '../../components/DashboardHeader';
import TaskDetail from '../../components/TaskDetail';
import SaveTemplateModal from '../../components/SaveTemplateModal';
import { mockWorkflowTemplates } from '../../data';

const TemplateDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const templateId = params.id as string;

    const [showSaveModal, setShowSaveModal] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [newTemplateDescription, setNewTemplateDescription] = useState('');

    // Find the workflow template
    const selectedWorkflow = mockWorkflowTemplates.find(w => w.id === templateId);

    if (!selectedWorkflow) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">Template Not Found</h2>
                    <p className="text-slate-600 mb-4">The template you&apos;re looking for doesn&apos;t exist.</p>
                    <button 
                        onClick={() => router.push('/dashboard/templates')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to Templates
                    </button>
                </div>
            </div>
        );
    }

    const handleRunWorkflow = () => {
        console.log('Running workflow:', selectedWorkflow.id);
        // Here you would initiate the workflow run
    };

    const handleSaveTemplate = (name: string, description: string) => {
        console.log('Saving template:', {
            name,
            description,
            workflow: selectedWorkflow
        });
        setShowSaveModal(false);
        setNewTemplateName('');
        setNewTemplateDescription('');
    };

    return (
        <>
            <DashboardHeader 
                selectedWorkflow={selectedWorkflow}
                showBackButton={true}
                backPath="/dashboard/templates"
                onRunWorkflow={handleRunWorkflow}
                onSaveTemplate={() => setShowSaveModal(true)}
            />
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-6 p-6">
                    {selectedWorkflow.tasks.map((task) => (
                        <TaskDetail key={task.id} task={task} />
                    ))}
                </div>
            </div>

            <SaveTemplateModal 
                isOpen={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                onSave={handleSaveTemplate}
                templateName={newTemplateName}
                templateDescription={newTemplateDescription}
                setTemplateName={setNewTemplateName}
                setTemplateDescription={setNewTemplateDescription}
            />
        </>
    );
};

export default TemplateDetailPage; 