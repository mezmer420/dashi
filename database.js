const Sequelize = require("sequelize")

const database = new Sequelize("database", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite",
    define: {
        freezeTableName: true
    }
})

module.exports.Economy = database.define("economy", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    wallet: Sequelize.INTEGER,
    bank: Sequelize.INTEGER,
    debitcard: Sequelize.BOOLEAN,
    motorcycle: Sequelize.BOOLEAN,
    superbike: Sequelize.BOOLEAN,
    wife: Sequelize.BOOLEAN,
    bailbonds: Sequelize.BOOLEAN
})

module.exports.workCooldown = database.define("workcooldown", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    expiry: Sequelize.BIGINT,
    command: Sequelize.STRING
})

module.exports.begCooldown = database.define("begcooldown", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    expiry: Sequelize.BIGINT,
    command: Sequelize.STRING
})

module.exports.robCooldown = database.define("robcooldown", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    expiry: Sequelize.BIGINT,
    command: Sequelize.STRING
})

module.exports.Waifus = database.define("waifus", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    waifu: Sequelize.STRING,
    haswaifu: Sequelize.BOOLEAN
})