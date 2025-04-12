export interface IConversations {
    conversationId: string,
    createdAt: number,
    lastUpdated: number,
    type: string,
    userId: string,
    title: string,
}

export interface IEdit {
    title: string,
    conversationId: string,
}

export interface IMessage {
    sender: 'user' | 'bot',
    content: string,
}

export interface IResponse {
    content: string,
    conversationId: string,
}