import { findLogin } from "../../db/dbFunctions"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export default async function logIn(req, res) {
    try {
        const { email, password } = req.body

        const user = await findLogin(email)
        if (!user) {
            throw 'user not found'
        }
        const result = bcrypt.compareSync(password, user.password)

        if (!result) {
            throw 'incorrect password'
        }

        const token = jwt.sign({ id: user.id }, 'gen')

        res.status(200).json({ token, id: user.id, name: user.name })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}