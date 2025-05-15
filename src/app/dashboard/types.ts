export interface TaskSettings {
    inputType: string;
    instructions: string;
}

export interface Task {
    id: string;
    name: string;
    type: string;
    model: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    settings: TaskSettings;
    output?: string;
}

export interface WorkflowTemplate {
    id: string;
    title: string;
    description: string;
    totalTasks: number;
    status: 'inactive' | 'running' | 'completed' | 'failed';
    tasks: Task[];
}

export interface WorkflowHistory {
    id: string;
    templateId: string;
    title: string;
    status: 'completed' | 'failed';
    startedAt: string;
    completedAt: string;
    inputs: Record<string, string>;
    tasks: Task[];
}

export interface SavedTemplate {
    id: string;
    title: string;
    description: string;
    totalTasks: number;
    status: 'inactive' | 'running' | 'completed' | 'failed';
    originalTemplateId: string;
    savedAt: string;
    inputs: Record<string, string>;
}

export interface PricingPlan {
    name: string;
    price: number;
    tokens: number;
    features: string[];
}

export type AccountTab = 'general' | 'billing' | 'usage' | 'earn'; 