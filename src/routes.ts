import { Hadler } from "./lambdas/handler";
import { Conversation, Message, User } from "./model";


type AppSyncEvent = {
   info: {
     fieldName: string
  },
   arguments: {
     conversationId: string,
     user: User,
     message: Message,
     conversation: Conversation
  }
}

exports.handler = async (event:AppSyncEvent) => {
    console.log("Event ====>>", event);
    const handler = new Hadler();
    switch (event.info.fieldName) {
        case "getConversations":
            return await handler.getConversations();
        case "getConversation":
            return await handler.getConversation(event.arguments.conversationId);
        case "addConversation":
            return await handler.createConversation(event.arguments.conversation);
        case "addMessage":
            return await handler.createMessage(event.arguments.message);
        case "addUser":
            return await handler.createUser(event.arguments.user);
        default:
            return null;
    }
}