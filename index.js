//IMPORTACIONES
const express = require('express');
const app = express();
const cors = require('cors');


//MIDDLEWARES
require('dotenv').config();

connectDB();

//CORS
app.use(cors());
app.use(express.json());

//SERVIDOR
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) =>{
    res.send("API de Suscripción de Alimentos funcionando")
});

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto: ", PORT);
});