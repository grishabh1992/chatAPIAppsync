import { Message, Conversation, User } from '../model';
export declare class Hadler {
    constructor();
    createConversation: (conversation: Conversation) => Promise<Conversation | null>;
    createUser: (user: User) => Promise<User | null>;
    createMessage: (message: Message) => Promise<Message | null>;
    getConversation: (conversationId: string) => Promise<any>;
    getConversations: () => Promise<any>;
}
