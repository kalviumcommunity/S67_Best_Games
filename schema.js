const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["admin", "user"], default: "user" },
    createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    createdAt: { type: Date, default: Date.now }
});

const CategorySchema = new mongoose.Schema({
    name: String,
    description: String
});

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    totalPrice: Number,
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

const OrderItemSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number
});

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    paymentMethod: String
});

const ReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const AddressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
});

const AdminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" }
});

const CouponSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    discount: Number,
    expiryDate: Date,
    isActive: { type: Boolean, default: true }
});

const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);
const Category = mongoose.model("Category", CategorySchema);
const Order = mongoose.model("Order", OrderSchema);
const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
const Payment = mongoose.model("Payment", PaymentSchema);
const Review = mongoose.model("Review", ReviewSchema);
const Address = mongoose.model("Address", AddressSchema);
const Admin = mongoose.model("Admin", AdminSchema);
const Coupon = mongoose.model("Coupon", CouponSchema);

module.exports = {
    User,
    Product,
    Category,
    Order,
    OrderItem,
    Payment,
    Review,
    Address,
    Admin,
    Coupon
};