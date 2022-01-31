import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as nodeLambda from "@aws-cdk/aws-lambda-nodejs";
import * as iam from "@aws-cdk/aws-iam";
import { AuthLambdaConstruct } from "./auth-lambda.construct";

export class GraphQlAPIConstruct extends cdk.Stack {
  readonly api: appsync.GraphqlApi;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const athLambdaConstruct = new AuthLambdaConstruct(
      this,
      `${id}-auth-lambda`,
      props
    );

    this.api = new appsync.GraphqlApi(this, "ChatsApi", {
      name: "chat-api",
      schema: appsync.Schema.fromAsset("src/graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.LAMBDA,
          lambdaAuthorizerConfig: {
            handler: athLambdaConstruct.lambda,
          },
          // // API Key Authentication
          // authorizationType: appsync.AuthorizationType.API_KEY,
          // apiKeyConfig: {
          //   expires: cdk.Expiration.after(cdk.Duration.days(365)),
          // },
        },
      },
    });
  }
}
