const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    from: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
    },
    to: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
    },

    status: {
        type: String,
        required: true
    },
    estimatedDelivery: {
        type: Date,
        required: true
    },
    _procurement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        // required: true,
    },
    _inspection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        // required: true,
    },
    _client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    _createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    deliveredAt: Date,
}
)

module.exports = mongoose.model("order", orderSchema);