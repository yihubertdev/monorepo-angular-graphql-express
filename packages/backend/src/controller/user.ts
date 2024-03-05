import { TypeResolver, RESOLVER_TYPE } from "../utils/decorators";
import { IFaceGraphqlContext } from "../graphql";
import models from "../models";
import { PubSub } from "@google-cloud/pubsub";
import { gql } from "apollo-server";

// Creates a client; cache this for further use
const pubSubClient = new PubSub();
class UserResolver {
  @TypeResolver({
    schema: gql`
      extend type Query {
        posts: Boolean
      }
    `,
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

  @TypeResolver({
    schema: gql`
      input PublishMessageInput {
        data: String
      }

      extend type Mutation {
        publishMessage(publishMessageInput: PublishMessageInput): Boolean
      }
    `,
    type: RESOLVER_TYPE.MUTATION,
  })
  async publishMessage(source, args) {
    const { data } = args.publishMessageInput;

    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
    try {
      const messageId = await pubSubClient
        .topic("test-topic")
        .publishMessage({ data: dataBuffer });
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(
        `Received error while publishing: ${(error as Error).message}`
      );
      process.exitCode = 1;
    }
    return false;
  }

  @TypeResolver({
    schema: gql`
      input PostUserInput {
        "Create user Id"
        id: UUID

        email: EMAIL
      }

      extend type Mutation {
        postUser(postUserInput: PostUserInput): String
      }
    `,
    type: RESOLVER_TYPE.MUTATION,
  })
  postUser(source, args, context, info) {
    const i = 1;
    return "hello";
  }
}

export default new UserResolver();
