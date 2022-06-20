// npm i reconlx@version1

const current = new Date()
console.log(current.toLocaleString())

const Discord = require("discord.js")
const client = new Discord.Client({
    presence: {
        status: "online",
        afk: false,
        activities: [{
            name: "everything you say",
            type: "LISTENING"
        }],
    },
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "GUILD_SCHEDULED_EVENTS"],
    // intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILD_SCHEDULED_EVENTS"],
    partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "GUILD_SCHEDULED_EVENT"]
    // partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "GUILD_SCHEDULED_EVENT"]
})

const {Player} = require("discord-player")
client.player = new Player(client, {
    leaveOnEnd: false,
    leaveOnStop: false,
    leaveOnEmpty: false,
    leaveOnEmptyCooldown: 300000,
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

require("./slash-register")(true)

const fs = require("fs")
const eventFiles = fs.readdirSync("./events/").filter(file => file.endsWith(".js"))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once){
        client.once(event.name, (...args) => event.execute(client, ...args))
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args))
    }
}

const config = require("./config.json")
client.login(config.token)