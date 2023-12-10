import bcrypt from "bcrypt";
import { addUser, hasLogin } from '../../db/dbFunctions'

export default async function registrate(req, res) {

    try {
        const saltRounds = 10;
        const { email, password, name } = req.body;
        if (await hasLogin(email)) throw 'пользователь уже существует';
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        await addUser(email, hash, name)

        res.status(200).json({})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}