//IMPORTACIONES
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const suscriptionRouter = require('./routes/suscriptionRoutes');

//MIDDLEWARES
require('dotenv').config();

connectDB();

//CORS
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/suscription', suscriptionRouter);

//SERVIDOR
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) =>{
    res.send("API de Suscripción de Alimentos funcionando")
});

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto: ", PORT);
});