console.log(new Date().toLocaleString())

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

require("./client.distube")(client)
require("./commands-register")(client, true)

const {
	token,
	defaultColor,
	logChannel,
	announcementsChannel,
} = require("./config.json")

const fs = require("fs")

const eventHandlers = fs
	.readdirSync("./Event_handlers")
	.filter((file) => file.endsWith(".js"))
	.map((file) => require(`./Event_handlers/${file}`))

eventHandlers.forEach((handler) =>
	handler(client, defaultColor, logChannel, announcementsChannel)
)

client.login(token)
