import { removeUserToEvent } from "../../db/dbFunctions";

export default async function favorite(req, res) {
    try {
        const { user, event } = req.body
        removeUserToEvent(user, event)
        res.status(200).json({})
    }
    catch {
        res.status(500).json({ message: err.message })
    }
}