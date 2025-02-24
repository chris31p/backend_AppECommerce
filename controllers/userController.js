const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists)
            return res.status(400).json({msg: "El usuario ya existe"});

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const payload = {user: {id: createdUser.id}};
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 600000
            },
            (error, token) => {
                if(error) throw error;
                res.json({token})
            }
        )
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}

exports.loginUser = async(req, res) => {
    const {email, password} = req.body

    try {
        let foundUser = await User.findOne({email})
        if(!foundUser){
            return res.status(400).json({msg: "Usuario no existe"})
        }
        const pswCorrect = await bcryptjs.compare(password, foundUser.password)
        if(!pswCorrect){
            return res.status(400).json({msg: "Credenciales inválidas"})
        }

        const payload = {user: {id: foundUser.id, role: foundUser.role}}
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            },
            (error, token) => {
                if(error) throw error;
                res.json({token})
            }
        )
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
}

exports.verifyUser = async(req, res) =>{
	try {
		// confirmamos que el usuario exista y retorna sus datos, excluyendo de password
		const user = await User.findById(req.user.id).select('-password')
		res.json({ user })
	} catch (error) {
		res.status(500).json({
			msg: "Error, no se pudo verificar el usuario",
			error
		})
	}
}