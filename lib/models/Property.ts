import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  area: { type: Number, required: true },
  type: { type: String, enum: ['sale', 'rent'], required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  description: { type: String },
  amenities: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
