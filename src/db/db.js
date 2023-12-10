const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'evnts',
    'root',
    '12345',
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

const User = sequelize.define("user", {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false
});

const Event = sequelize.define("event", {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false
});

const UserToEvent = sequelize.define('userToEvent', {
    userId:{
        type: Sequelize.BIGINT,
        references: {
            model: User,
            key: 'id'
        }
    },
    eventId:{
        type: Sequelize.BIGINT,
        references: {
            model: Event,
            key: 'id'
        }
    }
})

User.belongsToMany(Event, { through: UserToEvent }, {foreignKey: 'eventId'});
Event.belongsToMany(User, { through: UserToEvent }, {foreignKey: 'userId'});
User.hasMany(UserToEvent);
UserToEvent.belongsTo(User);
Event.hasMany(UserToEvent);
UserToEvent.belongsTo(Event);

module.exports = { User, Event, UserToEvent }
// sequelize.sync({ force: true })