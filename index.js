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

const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")
const { YtDlpPlugin } = require("@distube/yt-dlp")

client.distube = new DisTube(client, {
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true,
		}),
		new SoundCloudPlugin(),
		new YtDlpPlugin(),
	],
	emitNewSongOnly: true,
	leaveOnEmpty: false,
	leaveOnStop: false,
	customFilters: {
		"8d": "apulsator=hz=0.09",
		earrape: "channelsplit,sidechaingate=level_in=64",
		normalizer: "dynaudnorm=f=200",
		treble: "treble=g=5",
		vibrato: "vibrato=f=6.5",
	},

	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
	},
})

require("./slash-register")(true)

const fs = require("fs")
const eventFiles = fs
	.readdirSync("./events/")
	.filter((file) => file.endsWith(".js"))

for (const file of eventFiles) {
	const event = require(`./events/${file}`)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args))
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args))
	}
}

const musicEventFiles = fs
	.readdirSync("./music_events/")
	.filter((file) => file.endsWith(".js"))

for (const file of musicEventFiles) {
	const event = require(`./music_events/${file}`)
	client.distube.on(event.name, (...args) => event.execute(client, ...args))
}

const config = require("./config.json")
client.login(config.token)
