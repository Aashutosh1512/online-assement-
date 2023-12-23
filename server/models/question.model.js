import mongoose from 'mongoose';
const { Schema } = mongoose;
/** question model */

const questionModel = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: Array,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Question', questionModel);
