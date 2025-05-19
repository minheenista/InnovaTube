const User = require("./../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Usuario ya existe" });
        } else {
            if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }
            if (!/^[a-zA-Z0-9]+$/.test(username)) {
                return res.status(400).json({ message: "El nombre de usuario solo puede contener letras y números" });
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                return res.status(400).json({ message: "El correo electrónico no es válido" });
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
                return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número" });
            }
            if (password != confirmPassword) {
                return res.status(400).json({ message: "Las contraseñas no coinciden" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ firstName, lastName, username, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: "Usuario registrado exitosamente" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error en el registro", error });
        console.error(error);
    }
};

exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};
