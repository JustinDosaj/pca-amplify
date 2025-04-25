import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Input from '@/components/ui/chat/Input'

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
