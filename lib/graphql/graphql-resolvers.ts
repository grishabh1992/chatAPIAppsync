import * as appsync from "@aws-cdk/aws-appsync";
import * as nodeLambda from "@aws-cdk/aws-lambda-nodejs";

export const bindResolvers = (
  api: appsync.GraphqlApi,
  lambda: nodeLambda.NodejsFunction
) => {
  // Set the new Lambda function as a data source for the AppSync API
  const lambdaDs = api.addLambdaDataSource("lambdaDatasource", lambda);

  lambdaDs.createResolver({
    typeName: "Query",
    fieldName: "conversations",
  });

  lambdaDs.createResolver({
    typeName: "Query",
    fieldName: "users",
  });

  lambdaDs.createResolver({
    typeName: "Query",
    fieldName: "conversation",
  });

  lambdaDs.createResolver({
    typeName: "Query",
    fieldName: "notifications",
  });

  lambdaDs.createResolver({
    typeName: "Mutation",
    fieldName: "createConversation",
  });

  lambdaDs.createResolver({
    typeName: "Mutation",
    fieldName: "addMessage",
  });

  lambdaDs.createResolver({
    typeName: "Mutation",
    fieldName: "createUser",
  });

  lambdaDs.createResolver({
    typeName: "Mutation",
    fieldName: "addNotification",
  });

  lambdaDs.createResolver({
    typeName: "Subscription",
    fieldName: "onCreateUser",
  });

  lambdaDs.createResolver({
    typeName: "Subscription",
    fieldName: "onCreateNotification",
  });
};
