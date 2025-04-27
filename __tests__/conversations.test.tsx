import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useConversations } from '@/hooks/useConversations'
import Menu from '@/components/ui/chat/Menu'

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

interface ITestConversations {
    conversationId: string,
    title: string
}

const mockHandleDelete = jest.fn()

const setupMockConversations = (conversations: ITestConversations[]) => {
    (useConversations as jest.Mock).mockReturnValue({
        conversations,
        handleDeleteConversation: mockHandleDelete,
    })
}

describe('Menu', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.resetAllMocks()
    })
    

    it('renders conversations when conversations exist', () => {
        (useConversations as jest.Mock).mockReturnValue({
            conversations: [
                { conversationId: '1', title: 'Conversation 1' },
                { conversationId: '2', title: 'Conversation 2' },
            ],
        });
    
        render(<Menu/>);
    
        // Check if conversation titles are rendered
        expect(screen.getByText('Conversation 1')).toBeInTheDocument();
        expect(screen.getByText('Conversation 2')).toBeInTheDocument();
    });

    it('renders no conversations when conversations is empty', () => {

        setupMockConversations([])
    
        render(<Menu/>);
    
        // Check that no conversation titles are rendered
        expect(screen.queryByText('Conversation 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Conversation 2')).not.toBeInTheDocument();
    });

    it('calls handleDeleteConversation with correct ID when delete button is clicked', async () => {
        setupMockConversations([
            { conversationId: '1', title: 'Conversation 1' },
            { conversationId: '2', title: 'Conversation 2' },
        ])
    
        render(<Menu/>)
    
        // Open dropdown menu for the first conversation
        const ellipsisButtons = screen.getAllByLabelText('conversation-options')
        fireEvent.click(ellipsisButtons[0])
    
        // Click delete button
        const deleteButton = await screen.findByText('Delete')
        fireEvent.click(deleteButton)
    
        // Verify the delete handler was called with correct ID
        await waitFor(() => {
            expect(mockHandleDelete).toHaveBeenCalledWith('1')
        })
    })

    it('removes conversation from the UI after deletion', async () => {
        // First render with two conversations
        setupMockConversations([
          { conversationId: '1', title: 'Conversation 1' },
          { conversationId: '2', title: 'Conversation 2' },
        ])
    
        const { rerender } = render(<Menu/>)
        
        // Verify both conversations are initially rendered
        expect(screen.getByText('Conversation 1')).toBeInTheDocument()
        expect(screen.getByText('Conversation 2')).toBeInTheDocument()
    
        // Simulate deletion of first conversation by updating the mock
        setupMockConversations([
          { conversationId: '2', title: 'Conversation 2' },
        ])
    
        // Re-render with updated conversations list
        rerender(<Menu/>)
    
        // Verify first conversation is no longer in the document
        expect(screen.queryByText('Conversation 1')).not.toBeInTheDocument()
        expect(screen.getByText('Conversation 2')).toBeInTheDocument()
      })


});
