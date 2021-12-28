import * as cdk from "@aws-cdk/core";
import * as cdkCore from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as dynamoDb from "@aws-cdk/aws-dynamoDb";
import * as lambda from "@aws-cdk/aws-lambda";
// import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
// import * as sqs from '@aws-cdk/aws-sqs';

export class ChatApiAppSyncStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const MessagesTable = new dynamoDb.Table(this, "MessagesTable", {
      billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: dynamoDb.AttributeType.STRING },
      sortKey: { name: "conversationId", type: dynamoDb.AttributeType.STRING },
      removalPolicy: cdkCore.RemovalPolicy.DESTROY,
      tableName: "messages-table",
    });

    const ConversationsTable = new dynamoDb.Table(this, "ConversationsTable", {
      billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: dynamoDb.AttributeType.STRING },
      removalPolicy: cdkCore.RemovalPolicy.DESTROY,
      tableName: "conversations-table",
    });

    const UsersTable = new dynamoDb.Table(this, "UsersTable", {
      billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: dynamoDb.AttributeType.STRING },
      removalPolicy: cdkCore.RemovalPolicy.DESTROY,
      tableName: "users-table",
    });

    const api = new appsync.GraphqlApi(this, "ChatsApi", {
      name: "chat-api",
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ERROR,
      },
      schema: appsync.Schema.fromAsset("src/graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
      // xrayEnabled: true,
    });

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });

    // const chatsLambda = new lambda.Function(this, "AppSyncChatRouteHandler", {
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   handler: "routes.handler",
    //   code: lambda.Code.fromAsset("src"),
    //   memorySize: 1024,
    // });

    // // Set the new Lambda function as a data source for the AppSync API
    // const lambdaDs = api.addLambdaDataSource("lambdaDatasource", chatsLambda);

    // lambdaDs.createResolver({
    //   typeName: "Query",
    //   fieldName: "getConversations",
    // });

    // lambdaDs.createResolver({
    //   typeName: "Query",
    //   fieldName: "getConversation",
    // });

    // lambdaDs.createResolver({
    //   typeName: "Mutation",
    //   fieldName: "addConversation",
    // });

    // lambdaDs.createResolver({
    //   typeName: "Mutation",
    //   fieldName: "addMessage",
    // });

    // lambdaDs.createResolver({
    //   typeName: "Mutation",
    //   fieldName: "addUser",
    // });

    // enable the Lambda function to access the DynamoDB table (using IAM)
    // MessagesTable.grantFullAccess(chatsLambda);
    // ConversationsTable.grantFullAccess(chatsLambda);
    // UsersTable.grantFullAccess(chatsLambda);

    // // Create an environment variable that we will use in the function code
    // chatsLambda.addEnvironment("MESSAGES_TABLE", MessagesTable.tableName);
    // chatsLambda.addEnvironment(
    //   "CONVERSATIONS_TABLE",
    //   ConversationsTable.tableName
    // );
    // chatsLambda.addEnvironment("USERS_TABLE", UsersTable.tableName);
  }
}
