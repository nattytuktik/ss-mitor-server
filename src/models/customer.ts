import { model, Schema } from 'mongoose';

export const Customer = model(
  'customer',
  new Schema({
    FIRST_NAME: {
      type: String,
      required: true,
    },

    LAST_NAME: {
      type: String,
      required: true,
    },

    CHAJA: {
      type: String,
    },

    INTERNET: {
      type: Boolean,
      default: false,
    },

    PHONE: {
      type: String,
      maxlength: 10,
    },
  }),
);
