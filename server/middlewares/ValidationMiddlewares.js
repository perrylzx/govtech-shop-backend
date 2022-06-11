import Joi from 'joi';
import { ItemTitleMaxLength, ItemPriceMax, UUID4CharLength } from '../constants';

export const validatePostItems = (req, res, next) => {
  const PostItemSchema = Joi.object({
    name: Joi.string().max(ItemTitleMaxLength).required(),
    price: Joi.number().max(ItemPriceMax).required(),
  });

  const validationResult = PostItemSchema.validate(req.body);
  if (validationResult.error) {
    res.status(400).send(validationResult.error);
    return;
  }
  next();
};

export const validatePutItems = (req, res, next) => {
  const PutItemSchema = Joi.object({
    name: Joi.string().max(ItemTitleMaxLength),
    price: Joi.number().max(ItemPriceMax),
    id: Joi.string().required().length(36),
  }).min(2).message('Please provide an update to your item');

  const validationResult = PutItemSchema.validate(req.body);
  if (validationResult.error) {
    res.status(400).send(validationResult.error);
    return;
  }
  next();
};

export const validateDeleteItems = (req, res, next) => {
  const DeleteItemSchema = Joi.object({
    id: Joi.string().required().length(UUID4CharLength),
  });

  const validationResult = DeleteItemSchema.validate(req.body);
  if (validationResult.error) {
    res.status(400).send(validationResult.error);
    return;
  }
  next();
};
