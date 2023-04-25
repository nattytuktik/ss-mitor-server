import { model, Schema } from 'mongoose';

export const AdminConfig = model(
  'adminConfig',
  new Schema(
    {
      CAL_MITOR: {
        type: Number,
        required: true,
      },

      CAL_INTERNET: {
        type: Number,
        required: true,
      },

      USERNAME: {
        type: String,
        required: true,
      },

      PASSWORD: {
        type: String,
        required: true,
      },

      token: {
        type: String,
      },
    },
    { timestamps: true },
  ),
);
