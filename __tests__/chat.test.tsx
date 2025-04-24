import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Input from '@/components/ui/chat/Input'

// Mock useChat hook
jest.mock('@/hooks/useChat', () => ({
  useChat: () => ({
    handleSendMessage: jest.fn(() => Promise.resolve()), // resolve immediately
  }),
}))

describe('Input component', () => {
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
