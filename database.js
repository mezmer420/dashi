const Sequelize = require("sequelize")

const database = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: false,
	storage: "database.sqlite",
	define: {
		freezeTableName: true,
	},
})

module.exports.basicxp = database.define("basicxp", {
	memberid: Sequelize.STRING,
	xp: Sequelize.INTEGER,
	level: Sequelize.INTEGER,
})

module.exports.Dialects = database.define("dialects", {
	dialectid: Sequelize.STRING,
	dialectname: Sequelize.STRING,
	phrase: Sequelize.STRING,
	count: Sequelize.INTEGER,
})

module.exports.Tickets = database.define("tickets", {
	memberid: Sequelize.STRING,
	ticketid: Sequelize.STRING,
	channelid: Sequelize.STRING,
	closed: Sequelize.BOOLEAN,
	locked: Sequelize.BOOLEAN,
	type: Sequelize.STRING,
})

module.exports.Infractions = database.define("infractions", {
	memberid: Sequelize.STRING,
	infractionid: Sequelize.STRING,
	time: Sequelize.BIGINT,
	nature: Sequelize.STRING,
})

module.exports.Economy = database.define("economy", {
	id: {
		primaryKey: true,
		type: Sequelize.STRING,
		unique: true,
	},
	wallet: Sequelize.INTEGER,
	bank: Sequelize.INTEGER,
})

module.exports.Items = database.define("items", {
	memberid: Sequelize.STRING,
	itemid: Sequelize.STRING,
	item: Sequelize.STRING,
})

module.exports.dailyCooldown = database.define("dailycooldown", {
	id: {
		primaryKey: true,
		type: Sequelize.STRING,
		unique: true,
	},
	expiry: Sequelize.BIGINT,
})

module.exports.workCooldown = database.define("workcooldown", {
	id: {
		primaryKey: true,
		type: Sequelize.STRING,
		unique: true,
	},
	expiry: Sequelize.BIGINT,
})

module.exports.begCooldown = database.define("begcooldown", {
	id: {
		primaryKey: true,
		type: Sequelize.STRING,
		unique: true,
	},
	expiry: Sequelize.BIGINT,
})

module.exports.robCooldown = database.define("robcooldown", {
	id: {
		primaryKey: true,
		type: Sequelize.STRING,
		unique: true,
	},
	expiry: Sequelize.BIGINT,
})

module.exports.Waifus = database.define("waifus", {
	id: {
		primaryKey: true,
		type: Sequelize.STRING,
		unique: true,
	},
	waifu: Sequelize.STRING,
})

module.exports.Birthday = database.define("birthday", {
	Guild: Sequelize.STRING,
	User: Sequelize.STRING,
	Day: Sequelize.NUMBER,
	Month: Sequelize.NUMBER,
	Year: Sequelize.NUMBER,
})

module.exports.Spam = database.define("spam", {
	starterid: {
		primaryKey: true,
		type: Sequelize.STRING,
		unique: true,
	},
	active: Sequelize.BOOLEAN,
})
