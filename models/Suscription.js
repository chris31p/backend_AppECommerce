const mongoose = require('mongoose');

const suscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        plan: {
            type: String,
            enum: ["semanal", "quincenal", "mensual"],
            required: true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        status: {
            type: String,
            enum: ["activa", "cancelada"],
            default: "activa"
        },
        totalPrice: {
            type: Number, 
            required: true
        }
    },
    {timestamps: true}
);

const Suscription = mongoose.model("Suscription", suscriptionSchema);
module.exports = Suscription;