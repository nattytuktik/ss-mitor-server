import { model, Schema } from 'mongoose';

export const Mitor = model(
  'mitor',
  new Schema(
    {
      MITOR: [
        {
          _id: false,
          NUM: {
            type: Number,
            required: true,
          },
          TIME_EDIT: {
            type: Date,
            default: new Date(),
            required: true,
          },
        },
      ],
    },
    { timestamps: true },
  ),
);
