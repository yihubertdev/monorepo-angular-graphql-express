import path from "path";
import fs from "fs";
import {
  FieldResolver,
  RESOLVER_TYPE,
  Resolver,
} from "../../decorators/resolver";
import client from "../../client";
import { TokenMessage } from "firebase-admin/messaging";

@Resolver(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
class SubscriptionResolver {
  @FieldResolver({
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
