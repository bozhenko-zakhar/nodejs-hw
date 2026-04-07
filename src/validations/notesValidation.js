import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(5).max(5).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().default("")
  })
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required()
  })
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string(),
    tag: Joi.string().valid(...TAGS)
  }),
};

export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string(),
    tag: Joi.string().valid(...TAGS)
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required()
  })
};
