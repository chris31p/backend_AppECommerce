//IMPORTACIONES
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');

//MIDDLEWARES
require('dotenv').config();

connectDB();

//CORS
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);

//SERVIDOR
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) =>{
    res.send("API de Suscripción de Alimentos funcionando")
});

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto: ", PORT);
});