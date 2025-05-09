import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  question: String,
  expiresAt: Date,
  responses: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
  },
  voters: [String] // IPs or session IDs
});

export default mongoose.model('Poll', pollSchema);