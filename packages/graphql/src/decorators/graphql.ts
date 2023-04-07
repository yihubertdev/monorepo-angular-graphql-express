import { merge } from "lodash";
import fs from "fs";
import path from "path";

export interface PropertyDescriptorRecord extends PropertyDescriptor {
  configurable: boolean;
  enumerable: boolean;
  get(): () => Record<string, PropertyDescriptorRecord>;
}

export type ResolverType = Record<string, PropertyDescriptorRecord>;

const SchemaTypeDefs = fs.readFileSync(
  path.join(__dirname, "../schema/schema.graphql"),
  "utf8"
);

export let totalResolver = {};
export const totalTypeDefs: string[] = [SchemaTypeDefs];
export const FieldResolver = (type: string) => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    totalResolver = merge(
      totalResolver,
      Object.defineProperty({}, type, {
        configurable: true,
        enumerable: true,
        get: () =>
          Object.defineProperty({}, memberName, {
            configurable: true,
            enumerable: true,
            value: propertyDescriptor.value,
          }),
      }) as ResolverType
    );
  };
};

export const Resolver = (typeDefs: string) => {
  return (target: Function) => {
    totalTypeDefs.push(typeDefs);
  };
};
