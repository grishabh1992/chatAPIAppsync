import * as cdk from "@aws-cdk/core";
import { GraphQlAPIConstruct } from "./graph-api.construct";
import { LambdaConstruct } from "./lambda.contruct";
import { DynamoDBConstruct } from "./dynamo-db.construct";

export class ChatApiAppSyncStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dynamoDBConstruct = new DynamoDBConstruct(
      this,
      `${id}-dynamo-db`,
      props
    );

    const lambdaConstruct = new LambdaConstruct(this, `${id}-lambda`, props);

    const graphAPIContruct = new GraphQlAPIConstruct(
      this,
      `${id}-graph-api`,
      props
    );

    // enable the Lambda function to access the DynamoDB table (using IAM)
    dynamoDBConstruct.messagesTable.grantFullAccess(lambdaConstruct.lambda);
    dynamoDBConstruct.notificationTable.grantFullAccess(lambdaConstruct.lambda);
    dynamoDBConstruct.conversationsTable.grantFullAccess(
      lambdaConstruct.lambda
    );
    dynamoDBConstruct.usersTable.grantFullAccess(lambdaConstruct.lambda);

    // Create an environment variable that we will use in the function code
    lambdaConstruct.lambda.addEnvironment(
      "MESSAGES_TABLE",
      dynamoDBConstruct.messagesTable.tableName
    );
    lambdaConstruct.lambda.addEnvironment(
      "CONVERSATIONS_TABLE",
      dynamoDBConstruct.conversationsTable.tableName
    );
    lambdaConstruct.lambda.addEnvironment(
      "USERS_TABLE",
      dynamoDBConstruct.usersTable.tableName
    );
    lambdaConstruct.lambda.addEnvironment(
      "NOTIFICATIONS_TABLE",
      dynamoDBConstruct.notificationTable.tableName
    );

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: graphAPIContruct.api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: graphAPIContruct.api.apiKey || "",
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}
