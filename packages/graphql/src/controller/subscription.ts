import { TypeResolver, RESOLVER_TYPE } from "../decorators/resolver";
import client from "../client";
import { TokenMessage } from "firebase-admin/messaging";
import { gql } from "apollo-server";

class SubscriptionResolver {
  @TypeResolver({
    schema: gql`
      type SendMessagingOutput {
        result: Boolean
      }

      input SendMessageInput {
        token: String
      }

      extend type Mutation {
        sendMessage(sendMessageInput: SendMessageInput!): SendMessagingOutput
      }
    `,
    type: RESOLVER_TYPE.MUTATION,
  })
  async sendMessage(source, args, context) {
    const { token } = args.sendMessageInput;

    const message: TokenMessage = {
      data: {
        score: "850",
        time: "2:45",
      },
      token,
    };

    const fireMessaging = client.firebase.fireMessagingInstance;

    const result = await fireMessaging.send(message);
    console.log(result);
    return {
      result: true,
    };
  }
}

export default new SubscriptionResolver();
