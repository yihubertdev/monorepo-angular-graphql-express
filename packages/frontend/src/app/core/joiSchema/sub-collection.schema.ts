import * as Joi from "joi";

export const subCollectionBuilderSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    next: Joi.string().optional(),
    documentId: Joi.string().required(),
    collectionId: Joi.string().when(Joi.ref("next"), {
      is: Joi.string(),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    documentValue: Joi.string().when(Joi.ref("next"), {
      is: Joi.string(),
      then: Joi.forbidden(),
      otherwise: Joi.required(),
    }),
  });
};
