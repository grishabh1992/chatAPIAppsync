const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Message, Conversation, User, Notification } from "../model";

export class Hadler {
  constructor() {}

  createConversation = async (conversation: Conversation) => {
    const params = {
      TableName: process.env.CONVERSATIONS_TABLE,
      Item: conversation,
    };
    try {
      await docClient.put(params).promise();
      return conversation;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  };

  createUser = async (user: User) => {
    const params = {
      TableName: process.env.USERS_TABLE,
      Item: user,
    };
    try {
      await docClient.put(params).promise();
      return user;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  };

  addNotification = async (notification: Notification) => {
    notification = {
      ...notification,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    console.log("New Notification===>", notification);
    const params = {
      TableName: process.env.NOTIFICATIONS_TABLE,
      Item: notification,
    };
    try {
      await docClient.put(params).promise();
      return notification;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  };

  createMessage = async (message: Message) => {
    message = { ...message, id: uuidv4(), createdAt: new Date().toISOString() };
    console.log("New Message===>", message);
    const params = {
      TableName: process.env.MESSAGES_TABLE,
      Item: message,
    };
    try {
      await docClient.put(params).promise();
      return message;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  };

  getConversation = async (conversationId: string) => {
    const params = {
      TableName: process.env.MESSAGES_TABLE,
      KeyConditionExpression: "conversationId = :conversationId",
      ExpressionAttributeValues: {
        ":conversationId": conversationId,
      },
    };
    try {
      const result = await docClient.query(params).promise();
      console.log("result", result);
      return {
        name: conversationId,
        id: conversationId,
        messages: result.Items || [],
      };
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  };

  getNotifications = async () => {
    const params = {
      TableName: process.env.NOTIFICATIONS_TABLE,
    };
    try {
      const data = await docClient.scan(params).promise();
      return data.Items;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  };

  getConversations = async () => {
    const params = {
      TableName: process.env.CONVERSATIONS_TABLE,
    };
    try {
      const data = await docClient.scan(params).promise();
      return data.Items;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  };

  getUsers = async () => {
    const params = {
      TableName: process.env.USERS_TABLE,
    };
    try {
      const data = await docClient.scan(params).promise();
      return data.Items;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  };
}
