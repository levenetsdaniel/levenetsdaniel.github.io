const { User, Event, UserToEvent } = require('./db.js')

async function getEvents() {
    let res = await Event.findAll({
        raw: true,
    })
    return res
}

async function addUser(login, password, name) {
    User.create({
        login: login,
        password: password,
        name: name
    })
}

async function hasLogin(login) {
    const logins = await User.findAll({
        where: {
            login
        }
    })

    return logins.length != 0

}

async function findLogin(login) {
    const logins = await User.findOne({
        where: {
            login
        }
    })

    return logins
}

async function addUserToEvent(userId, eventId) {
    UserToEvent.create({
        userId: userId,
        eventId: eventId
    })
}

async function removeUserToEvent(userId, eventId) {
    UserToEvent.destroy({
        where: {
            userId,
            eventId
        }
    })
}

async function getLikedEvents(userId) {
    return await UserToEvent.findAll({
        where: {
            userId
        }
    }).then(res => res.map(e => e.eventId))
}

export { getEvents, addUser, hasLogin, findLogin, addUserToEvent, removeUserToEvent, getLikedEvents }