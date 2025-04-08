export interface IConversationsList {
    conversationId: string,
    createdAt: number,
    lastUpdated: number,
    type: string,
    userId: string,
    title: string,
}

export interface IMessage {
    sender: 'user' | 'bot',
    content: string,
}

export interface IResponse {
    content: string,
    conversationId: string,
}