'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardHeader from '../../components/DashboardHeader';
import TaskDetail from '../../components/TaskDetail';
import SaveTemplateModal from '../../components/SaveTemplateModal';
import { mockSingleTasks } from '../../data';

const TaskDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const taskId = params.id as string;

    const [showSaveModal, setShowSaveModal] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [newTemplateDescription, setNewTemplateDescription] = useState('');

    // Find the task
    const selectedTask = mockSingleTasks.find(t => t.id === taskId);

    if (!selectedTask) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">Task Not Found</h2>
                    <p className="text-slate-600 mb-4">The task you&apos;re looking for doesn&apos;t exist.</p>
                    <button 
                        onClick={() => router.push('/dashboard/tasks')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to Tasks
                    </button>
                </div>
            </div>
        );
    }

    const handleRunWorkflow = () => {
        console.log('Running task:', selectedTask.id);
        // Here you would initiate the task
    };

    const handleSaveTemplate = (name: string, description: string) => {
        console.log('Saving task as template:', {
            name,
            description,
            task: selectedTask
        });
        setShowSaveModal(false);
        setNewTemplateName('');
        setNewTemplateDescription('');
    };

    return (
        <>
            <DashboardHeader 
                selectedWorkflow={selectedTask}
                showBackButton={true}
                backPath="/dashboard/tasks"
                onRunWorkflow={handleRunWorkflow}
                onSaveTemplate={() => setShowSaveModal(true)}
            />
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-6 p-6">
                    {selectedTask.tasks.map((task) => (
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

export default TaskDetailPage; 