import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Input from '@/components/ui/chat/Input'
import { useConversations } from '@/hooks/useConversations'
import Menu from '@/components/ui/chat/Menu'

jest.mock('@/hooks/useChat', () => {

    const mockMessages = [
        { sender: 'user', content: 'Mock LLM Message' },
        { sender: 'bot', content: 'This is a mock bot response.' }
    ]

    return {
        useChat: () => ({
            handleSendMessage: jest.fn(() => Promise.resolve()), // resolve immediately
            messages: mockMessages,
        })
    }
})

describe('Input Button', () => {
    it('clears the textarea after submitting a message', async () => {
        render(<Input conversationId="123" />)

        const textarea = screen.getByPlaceholderText('Type a message...')
        const sendButton = screen.getByRole('button')

        fireEvent.change(textarea, { target: { value: 'Mock LLM Message' } })
        expect(textarea).toHaveValue('Mock LLM Message')

        fireEvent.click(sendButton)

        await waitFor(() => {
            expect(textarea).toHaveValue('') // cleared after submit
        })
    })
})

// Mock Next.js router because Menu uses useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
      replace: jest.fn(),
    }),
}));

// Mock useConversations
jest.mock('@/hooks/useConversations', () => ({
    useConversations: jest.fn(),
  }));
  
    describe('Menu', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('renders conversations when conversations exist', () => {
            (useConversations as jest.Mock).mockReturnValue({
                conversations: [
                    { conversationId: '1', title: 'Conversation 1' },
                    { conversationId: '2', title: 'Conversation 2' },
                ],
                    handleDeleteConversation: jest.fn(),
                    handleEditConversation: jest.fn(),
            });
        
            render(<Menu className="" />);
        
            // Check if conversation titles are rendered
            expect(screen.getByText('Conversation 1')).toBeInTheDocument();
            expect(screen.getByText('Conversation 2')).toBeInTheDocument();
        });
    
        it('renders no conversations when conversations is empty', () => {
        (useConversations as jest.Mock).mockReturnValue({
            conversations: [],
            handleDeleteConversation: jest.fn(),
            handleEditConversation: jest.fn(),
        });
    
        render(<Menu className="" />);
    
        // Check that no conversation titles are rendered
        expect(screen.queryByText('Conversation 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Conversation 2')).not.toBeInTheDocument();
        });
    });
