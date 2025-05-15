import { WorkflowTemplate, WorkflowHistory, SavedTemplate, PricingPlan } from './types';

// Mock data for workflow templates
export const mockWorkflowTemplates: WorkflowTemplate[] = [
    {
        id: '1',
        title: 'Web Scraping & Social Media',
        description: 'Scrape webpage content, summarize data, and create social media posts',
        totalTasks: 3,
        status: 'inactive',
        tasks: [
            {
                id: '1-1',
                name: 'Web Scraping',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'url',
                    instructions: 'Extract main content and key points'
                }
            },
            {
                id: '1-2',
                name: 'Content Summarization',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'text',
                    instructions: 'Create a concise summary'
                }
            },
            {
                id: '1-3',
                name: 'Social Media Post Creation',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'text',
                    instructions: 'Generate engaging social media content'
                }
            }
        ]
    },
    {
        id: '2',
        title: 'PII Removal & Processing',
        description: 'Remove personal identifiable information and process data safely',
        totalTasks: 2,
        status: 'inactive',
        tasks: [
            {
                id: '2-1',
                name: 'PII Detection & Removal',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'text',
                    instructions: 'Identify and remove all PII'
                }
            },
            {
                id: '2-2',
                name: 'Data Processing',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'text',
                    instructions: 'Process the sanitized data'
                }
            }
        ]
    }
];

// Mock data for workflow templates
export const mockSingleTasks: WorkflowTemplate[] = [
    {
        id: '1',
        title: 'PII Removal',
        description: 'Remove PII from input',
        totalTasks: 1,
        status: 'inactive',
        tasks: [
            {
                id: '1-1',
                name: 'PII Removal',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'url',
                    instructions: 'Extract main content and key points'
                }
            },
        ]
    },
    {
        id: '2',
        title: 'Content Summarization',
        description: 'Summarize content for text input',
        totalTasks: 1,
        status: 'inactive',
        tasks: [
            {
                id: '2-1',
                name: 'Content Summarization',
                type: 'llm',
                model: 'GPT-4',
                status: 'pending',
                settings: {
                    inputType: 'text',
                    instructions: 'Identify and remove all PII'
                }
            },
        ]
    }
];

// Mock data for workflow history
export const mockWorkflowHistory: WorkflowHistory[] = [
    {
        id: 'RUN-2024-03-20-001',
        templateId: '1',
        title: 'Web Scraping & Social Media',
        status: 'completed',
        startedAt: '2024-03-20T10:00:00Z',
        completedAt: '2024-03-20T10:05:00Z',
        inputs: {
            url: 'https://example.com/article',
            instructions: 'Create social media posts for Twitter and LinkedIn'
        },
        tasks: [
            {
                id: '1-1',
                name: 'Web Scraping',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'url',
                    instructions: 'Extract main content and key points'
                },
                output: 'Successfully scraped content from example.com'
            },
            {
                id: '1-2',
                name: 'Content Summarization',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'text',
                    instructions: 'Create a concise summary'
                },
                output: 'Generated a 200-word summary of the content'
            },
            {
                id: '1-3',
                name: 'Social Media Post Creation',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'text',
                    instructions: 'Generate engaging social media content'
                },
                output: 'Created 3 social media posts for different platforms'
            }
        ]
    },
    {
        id: 'RUN-2024-03-20-002',
        templateId: '2',
        title: 'PII Removal & Processing',
        status: 'completed',
        startedAt: '2024-03-20T11:30:00Z',
        completedAt: '2024-03-20T11:35:00Z',
        inputs: {
            text: 'Sample text containing PII: John Doe, 123 Main St, john@email.com',
            instructions: 'Remove all PII and analyze the remaining content'
        },
        tasks: [
            {
                id: '2-1',
                name: 'PII Detection & Removal',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'text',
                    instructions: 'Identify and remove all PII'
                },
                output: 'Removed 5 instances of PII from the document'
            },
            {
                id: '2-2',
                name: 'Data Processing',
                type: 'llm',
                model: 'GPT-4',
                status: 'completed',
                settings: {
                    inputType: 'text',
                    instructions: 'Process the sanitized data'
                },
                output: 'Processed data and generated analysis report'
            }
        ]
    }
];

// Mock data for pricing plans
export const pricingPlans: PricingPlan[] = [
    {
        name: 'Free',
        price: 0,
        tokens: 100,
        features: ['Basic workflow templates', 'Limited storage', 'Community support']
    },
    {
        name: 'Pro',
        price: 19,
        tokens: 1000,
        features: ['All workflow templates', '5GB storage', 'Priority support', 'Advanced analytics']
    },
    {
        name: 'Enterprise',
        price: 49,
        tokens: 5000,
        features: ['Custom workflows', 'Unlimited storage', '24/7 support', 'Team collaboration', 'API access']
    }
];

// Mock data for saved templates
export const mockSavedTemplates: SavedTemplate[] = [
    {
        id: 'SAVED-001',
        title: 'My Social Media Post Generator',
        description: 'Customized workflow for creating engaging LinkedIn posts from blog content',
        totalTasks: 3,
        status: 'inactive',
        originalTemplateId: '1',
        savedAt: '2024-03-20T15:30:00Z',
        inputs: {
            url: 'https://myblog.com/articles',
            instructions: 'Create professional LinkedIn posts with industry insights'
        }
    },
    {
        id: 'SAVED-002',
        title: 'Customer Data Cleaner',
        description: 'Optimized PII removal workflow for customer feedback analysis',
        totalTasks: 2,
        status: 'inactive',
        originalTemplateId: '2',
        savedAt: '2024-03-21T09:15:00Z',
        inputs: {
            text: 'Customer feedback data',
            instructions: 'Remove PII and analyze sentiment'
        }
    }
]; 