import { Hadler } from "./lambdas/handler";
import { Conversation, Message, Notification, User } from "./model";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    id: string;
    user: User;
    message: Message;
    conversation: Conversation;
    notification: Notification;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("Event ====>>", event);
  const handler = new Hadler();
  switch (event.info.fieldName) {
    case "conversations":
      return await handler.getConversations();
    case "conversation":
      return await handler.getConversation(event.arguments.id);
    case "notifications":
      return await handler.getNotifications();
    case "users":
      return await handler.getUsers();
    case "createConversation":
      return await handler.createConversation(event.arguments.conversation);
    case "addMessage":
      return await handler.createMessage(event.arguments.message);
    case "addNotification":
      return await handler.addNotification(event.arguments.notification);
    case "createUser":
      return await handler.createUser(event.arguments.user);
    default:
      return null;
  }
};
