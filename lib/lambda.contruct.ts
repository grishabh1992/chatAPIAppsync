import * as cdk from "@aws-cdk/core";
import * as nodeLambda from "@aws-cdk/aws-lambda-nodejs";

export class LambdaConstruct extends cdk.Stack {
  readonly lambda: nodeLambda.NodejsFunction;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.lambda = new nodeLambda.NodejsFunction(
      this,
      "AppSyncChatRouteHandler",
      {
        functionName: `chat-routing`,
        description: `This Lambda is excuted from graphql to trigger lambda.`,
        retryAttempts: 0,
        entry: "src/routes.ts",
        handler: "handler",
      }
    );
  }
}
