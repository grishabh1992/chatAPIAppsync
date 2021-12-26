const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import { Message, Conversation, User } from '../model';

export class Hadler {

    constructor() {}

    createConversation = async (conversation: Conversation) => {
        const params = {
            TableName: process.env.CONVERSATIONS_TABLE,
            Item: conversation
        }
        try {
            await docClient.put(params).promise();
            return conversation;
        } catch (err) {
            console.log('DynamoDB error: ', err);
            return null;
        }
    }

    createUser = async (user: User) => {
        const params = {
            TableName: process.env.USERS_TABLE,
            Item: user
        }
        try {
            await docClient.put(params).promise();
            return user;
        } catch (err) {
            console.log('DynamoDB error: ', err);
            return null;
        }
    }

    createMessage = async (message: Message) => {
        const params = {
            TableName: process.env.MESSAGES_TABLE,
            Item: message
        }
        try {
            await docClient.put(params).promise();
            return message;
        } catch (err) {
            console.log('DynamoDB error: ', err);
            return null;
        }
    }

    getConversation = async (conversationId: string) => {
        const params = {
            TableName: process.env.CONVERSATIONS_TABLE,
            Key: { id: conversationId }
        }
        try {
            const { Item } = await docClient.get(params).promise()
            return Item
        } catch (err) {
            console.log('DynamoDB error: ', err)
        }
    }

    getConversations = async () => {
        const params = {
            TableName: process.env.CONVERSATIONS_TABLE,
        }
        try {
            const data = await docClient.scan(params).promise()
            return data.Items
        } catch (err) {
            console.log('DynamoDB error: ', err)
            return null
        }
    }
}

