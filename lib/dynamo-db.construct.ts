import * as cdk from "@aws-cdk/core";
import * as dynamoDb from "@aws-cdk/aws-dynamoDb";

export class DynamoDBConstruct extends cdk.Stack {
  readonly messagesTable: dynamoDb.Table;
  readonly conversationsTable: dynamoDb.Table;
  readonly usersTable: dynamoDb.Table;
  readonly notificationTable: dynamoDb.Table;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.messagesTable = new dynamoDb.Table(this, "MessagesTable", {
      billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "conversationId", type: dynamoDb.AttributeType.STRING },
      sortKey: { name: "createdAt", type: dynamoDb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: "messages-table",
    });

    this.conversationsTable = new dynamoDb.Table(this, "ConversationsTable", {
      billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: dynamoDb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: "conversations-table",
    });

    this.usersTable = new dynamoDb.Table(this, "UsersTable", {
      billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: dynamoDb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: "users-table",
    });

    this.notificationTable = new dynamoDb.Table(this, "NotificationsTable", {
      billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: dynamoDb.AttributeType.STRING },
      sortKey: { name: "createdAt", type: dynamoDb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: "notifications-table",
    });
  }
}
