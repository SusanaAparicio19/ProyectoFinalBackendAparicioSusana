import mongoose from 'mongoose';
import { randomUUID } from "node:crypto";
import uuid4 from 'uuid4';


const { Schema, model } = mongoose;

const ticketSchema = new Schema({
    _id: { type: String, default: randomUUID },
    code: { type: String, default: uuid4},
    purchase_datetime: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export const TicketsModel = model('Ticket', ticketSchema);


