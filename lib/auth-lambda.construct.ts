import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as nodeLambda from "@aws-cdk/aws-lambda-nodejs";

export class AuthLambdaConstruct extends cdk.Stack {
  readonly lambda: nodeLambda.NodejsFunction;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.lambda = new nodeLambda.NodejsFunction(this, "AppSyncAuthHandler", {
      functionName: `custom-authoriser`,
      description: `This Lambda is excuted fauthenticate the user.`,
      retryAttempts: 0,
      entry: "src/lambdas/auth.ts",
      handler: "handler",
    });

    this.lambda.grantInvoke(new iam.ServicePrincipal("appsync.amazonaws.com"));
  }
}
