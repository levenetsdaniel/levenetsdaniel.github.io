import { getEvents as ge, getLikedEvents } from "../../db/dbFunctions"

export default async function getEvents(req, res) {
    try {
        let events = await ge()
        const id = req.query.userId
        if (id !== undefined) {
            const liked = await getLikedEvents(id)
            events = events.map(e => ({
                ...e,
                liked: liked.includes(e.id)
            }))
        }
            res.status(200).json({ events })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}