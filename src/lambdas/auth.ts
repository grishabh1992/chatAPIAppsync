const fs = require("fs");
const path = require("path");
// const jwt = require("jsonwebtoken");

type AppSyncEvent = {
  authorizationToken: string;
  requestContext: {
    apiId: string;
    accountId: string;
    requestId: string;
    queryString: string;
    operationName: string;
    variables: {};
  };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log(`event >`, JSON.stringify(event, null, 2));
  //   console.log(path.resolve("./keys/public.pub"));
  //   const publicKey = fs.readFileSync(__dirname + "/keys/public.pub");

  const {
    authorizationToken,
    requestContext: { apiId, accountId },
  } = event;

  //   const result = await jwt.verify(authorizationToken, publicKey);

  //   console.log("token result", result);
  const response = {
    isAuthorized: true, //result && result.foo && result.foo === "bar",
    resolverContext: {
      userid: "test-user-id",
      info: "contextual information A",
      more_info: "contextual information B",
    },
    deniedFields: [
      `arn:aws:appsync:ap-south-1:${accountId}:apis/${apiId}/types/Event/fields/comments`,
      `Mutation.createEvent`,
    ],
    ttlOverride: 10,
  };
  console.log(`response >`, JSON.stringify(response, null, 2));
  return response;
};
