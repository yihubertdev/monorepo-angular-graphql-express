import path from "path";
import fs from "fs";
import {
  FieldResolver,
  RESOLVER_TYPE,
  Resolver,
} from "../../decorators/resolver";
import { IFaceGraphqlContext } from "../../graphql";
import models from "../../models";
import { PubSub } from "@google-cloud/pubsub";

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class UserResolver {
  @FieldResolver({
    type: RESOLVER_TYPE.QUERY,
  })
  async posts(source, args, context: IFaceGraphqlContext, info) {
    console.log(context.remoteAddress);
    if (context.remoteAddress) {
      await models.firestore.checkin.addCheckInAddress(
        context.remoteAddress,
        context.fireStoreClient
      );
    }

    return false;
  }

  @FieldResolver({
    type: RESOLVER_TYPE.MUTATION,
  })
  async publishMessage(source, args) {
    const { data } = args.publishMessageInput;

    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
    try {
      const messageId = await pubSubClient
        .topic("test-topic")
        .publishMessage({data: dataBuffer});
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(
        `Received error while publishing: ${(error as Error).message}`
      );
      process.exitCode = 1;
    }
    return false;
  }

  @FieldResolver({
    type: RESOLVER_TYPE.MUTATION,
  })
  postUser(source, args, context, info) {
    console.log(args);
    const i = 1;
    return "hello";
  }
}

export default new UserResolver();
