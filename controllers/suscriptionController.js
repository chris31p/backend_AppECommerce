const Suscription = require('../models/Suscription');
const User = require('../models/User');
const Product = require('../models/Product');

require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createSuscription = async(req, res) => {
    try {
        const {plan, products} = req.body;
        const userId = req.user.id;
        const costoEnvio = 2000;

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({msg: "Usuario no encontrado"});

        const foundProducts = await Product.find({_id: { $in: products }});
        if(foundProducts.length !== products.length){
            return res.status(400).json({msg: "Uno o más productos no existen"});
        }

        const totalProductPrice = foundProducts.reduce((sum, product) => sum + product.price, 0);
        const totalPrice = totalProductPrice + costoEnvio;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice * 100,
            currency: "clp",
            payment_method_types: ["card"],
        });

        const suscription = new Suscription({
            user: userId,
            plan,
            products,
            totalPrice
        });

        await suscription.save();

        res.status(201).json({
            msg: "Suscripción creada con éxito",
            suscription,
            clientSecret: paymentIntent.client_secret, //Usado dentro del frontend para completar el pago
        });
    } catch (error) {
        res.status(500).json({msg: "Error al crear la suscripción", error})
    }
}

exports.getUserSuscription = async(req, res) =>{
    try {
        const userId = req.user.id;
        const suscriptions = await Suscription.find({user: userId}).populate("products");

        if(!suscriptions.length){
            return res.status(404).json({msg: "No tienes suscripciones activas"});
        }
        res.status(200).json(suscriptions);
    } catch (error) {
        res.status(500).json({msg: "Error al obtener suscripciones", error})
    }
}

exports.cancelSuscription = async(req, res) =>{
    try {
        const {id} = req.params;
        const userId = req.user.id;

        const suscription = await Suscription.findOne({_id: id, user: userId});

        if(!suscription){
            return res.status(404).json({msg:"Suscripción no encontrada"})
        }

        suscription.status = "cancelada";
        await suscription.save();

        res.status(200).json({msg: "Suscripción cancelada con éxito", suscription})
    } catch (error) {
        res.status(500).json({msg: "Error al cancelar la suscripción", error});
    }
}