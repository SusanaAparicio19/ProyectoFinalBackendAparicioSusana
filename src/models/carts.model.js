import mongoose from "mongoose";
import { Schema, model } from 'mongoose';

const cartsSchema = new Schema({
    products: [{
        product: {
        type: mongoose.Schema.Types.String,
        ref: 'products',
        required: true
    },
    quantity: {
       type: Number,
       default: 1
    }
 }],
    user: { type: String, required: true },
    totalAmount: { type: Number, default: 0 },  

}, { timestamps: true });

cartsSchema.pre('find', function (next) {
    this.populate('products.product');
    next();
  });

export const CartsModel = model('carts', cartsSchema);

