'use client';

import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import WorkflowCard from '../components/WorkflowCard';
import { mockSingleTasks } from '../data';

const TasksPage = () => {
    return (
        <>
            <DashboardHeader title="Single Tasks" />
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {mockSingleTasks.map((task) => (
                        <WorkflowCard 
                            key={task.id}
                            workflow={task}
                            linkPath={`/dashboard/tasks/${task.id}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default TasksPage; 