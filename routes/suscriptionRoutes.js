const express = require('express');
const suscriptionRouter = express.Router();
const suscriptionController = require('../controllers/suscriptionController');
const auth = require('../middleware/authMiddleware');

suscriptionRouter.post('/create', auth, suscriptionController.createSuscription);
suscriptionRouter.get('/my-suscriptions', auth, suscriptionController.getUserSuscription);
suscriptionRouter.put('/cancel/:id', auth, suscriptionController.cancelSuscription);

module.exports = suscriptionRouter;