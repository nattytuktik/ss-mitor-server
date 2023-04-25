import mongoose, { Schema } from 'mongoose';

export const Suwan = mongoose.model(
  'suwan',
  new mongoose.Schema(
    {
      CUSTOMER: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
      },

      ROOM: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'room'
      },
    },
    { timestamps: true },
  ),
);
