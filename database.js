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

module.exports.Infractions = database.define("infractions", {
    memberid: Sequelize.STRING,
    infractionid: Sequelize.STRING,
    time: Sequelize.BIGINT,
    nature: Sequelize.STRING
})

module.exports.Economy = database.define("economy", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    wallet: Sequelize.INTEGER,
    bank: Sequelize.INTEGER,
    // debitcard: Sequelize.BOOLEAN,
    // motorcycle: Sequelize.BOOLEAN,
    // superbike: Sequelize.BOOLEAN,
    // wife: Sequelize.BOOLEAN,
    // bailbonds: Sequelize.BOOLEAN
})

module.exports.Items = database.define("items", {
    memberid: Sequelize.STRING,
    item: Sequelize.STRING
})

module.exports.dailyCooldown = database.define("dailycooldown", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    expiry: Sequelize.BIGINT
})

module.exports.workCooldown = database.define("workcooldown", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    expiry: Sequelize.BIGINT
})

module.exports.begCooldown = database.define("begcooldown", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    expiry: Sequelize.BIGINT
})

module.exports.robCooldown = database.define("robcooldown", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    expiry: Sequelize.BIGINT
})

module.exports.Waifus = database.define("waifus", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    waifu: Sequelize.STRING
})

module.exports.Spams = database.define("spams", {
    starterid: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    active: Sequelize.BOOLEAN,
})