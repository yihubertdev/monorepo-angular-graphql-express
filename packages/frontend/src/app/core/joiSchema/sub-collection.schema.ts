import * as Joi from "joi";
import { SUBCOLLECTION_HANDLER } from "type-sources";

export const updateSubCollectionSchema: Joi.ObjectSchema = Joi.object({
  next: Joi.object().optional(),
  documentId: Joi.when(Joi.ref("next"), {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.string().required(),
  }),
  collectionId: Joi.string().required(),
  documentValue: Joi.when(Joi.ref("next"), {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.object().required(),
  }),
});

export const createSubCollectionSchema: Joi.ObjectSchema = Joi.object({
  next: Joi.object().optional(),
  collectionId: Joi.string().required(),
  documentValue: Joi.when(Joi.ref("next"), {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.object().required(),
  }),
});

export const readSubCollectionSchema: Joi.ObjectSchema = Joi.object({
  next: Joi.object().optional(),
  documentId: Joi.when(Joi.ref("next"), {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.string().required(),
  }),
  collectionId: Joi.string().required(),
});

export const deleteCollectionBuilderSchema: Joi.ObjectSchema = Joi.object({
  next: Joi.object().optional(),
  documentId: Joi.when(Joi.ref("next"), {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.string().required(),
  }),
  collectionId: Joi.string().required(),
  documentValue: Joi.string().optional(),
});

export const subCollectionHandlerSchema: Joi.ObjectSchema = Joi.object({
  queries: Joi.any().required(),
  action: Joi.string().required(),
  value: Joi.when(Joi.ref("action"), {
    is: Joi.string().valid(
      SUBCOLLECTION_HANDLER.CREATE,
      SUBCOLLECTION_HANDLER.UPDATE
    ),
    then: Joi.object().required(),
    otherwise: Joi.forbidden(),
  }),
});
