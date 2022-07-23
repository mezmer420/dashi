const current = new Date()
console.log(current.toLocaleString())

const EventEmitter = require("events")
EventEmitter.setMaxListeners(0)

const { Client, Partials, ActivityType } = require("discord.js")
const client = new Client({
	presence: {
		status: "online",
		afk: false,
		activities: [
			{
				name: "everything you say",
				type: ActivityType.Listening,
			},
		],
	},
	intents: 131071,
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User,
	],
})

require("./slash-register")(true)

require("./client.distube")(client)

const config = require("./config.json")

const defaultColor = config.defaultColor

const fs = require("fs")

const eventHandlers = fs
	.readdirSync("./Event_handlers")
	.filter((file) => file.endsWith(".js"))

for (file of eventHandlers) {
	require(`./Event_handlers/${file}`)(client, defaultColor)
}

client.login(config.token)
