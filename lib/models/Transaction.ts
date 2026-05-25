import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyTitle: { type: String, required: true },
  amount: { type: Number, required: true },
  action: { type: String, enum: ['buy', 'rent'], required: true },
  paymentMethod: { type: String, enum: ['card', 'upi', 'netbanking'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  transactionId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
