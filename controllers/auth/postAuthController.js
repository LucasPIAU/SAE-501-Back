import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const postAuthController = {
    login: async (req, res) => {
        const users = [{
            id: 1,
            username: process.env.AUTH_USERNAME,
            password: process.env.AUTH_PASSWORD,
        }];

        try {
            var username = req.body.username;
            var password = req.body.password;
        } catch (error) {
            console.log("Vous devez spécifier un request body pour vous connecter");
        }

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "Incorrect username"
            });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).send({
                ok: false,
                message: "Incorrect password"
            });
        }

        try {
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_PRIVATE_KEY || "jwtPrivateKey",
                { expiresIn: "2h" }
            );
            res.send({
                ok: true,
                token: token
            });
        } catch (error) {
            res.status(500).send({
                ok: false,
                message: "Failed to generate token"
            });
        }
    },
    reAuth: async (req, res) => {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).send({
            ok: false,
            error: "Access denied. No token provided"
        });

        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY || "jwtPrivateKey");

            const newToken = jwt.sign(
                { id: decoded.id },
                process.env.JWT_PRIVATE_KEY || "jwtPrivateKey",
                { expiresIn: '2h' }
            );
            res.status(200).json({token : newToken});
        } catch (error) {
            return res.status(401).send({
                ok: false,
                error: "Le Token est expiré, veuillez vous reconnecter."
            });
        }
    }
}

export default postAuthController;