import mongoose, { Schema, Document, model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  inventory: number;
  featured: boolean;
  slug: string;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: [{ type: String }],
  category: { type: String, required: true },
  inventory: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// FIX: Remove the models check and always create the model
const Product = model<IProduct>('Product', ProductSchema);
export default Product;