import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
    food: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    }
}, { _id: false });

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

const Order = model('Order', orderSchema);

export default Order;