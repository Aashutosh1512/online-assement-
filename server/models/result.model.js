import mongoose from 'mongoose';
const { Schema } = mongoose;

/**result model  */
const resultModel = new Schema(
  {
    user: { type: Object, required: true },
    questionsAttempted: { type: Number, default: 0, required: true },
    points: { type: Number, default: 0, required: true },
    totalPoints: { type: Number, default: 0, required: true },
    achived: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('result', resultModel);
