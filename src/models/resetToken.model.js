import mongoose from 'mongoose';

const resetTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Expira en 1 hora (en segundos)
  },
});

export const ResetToken = mongoose.model('ResetToken', resetTokenSchema);
