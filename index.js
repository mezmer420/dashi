const Discord = require("discord.js")

const client = new Discord.Client({
    presence: {
        status: "online",
        afk: false,
        activities: [{
            name: "to everything you say",
            type: "LISTENING"
            // url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }],
    },
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES"],
    // intents: [
    //     "GUILDS",
    //     "GUILD_MEMBERS",
    //     "GUILD_BANS",
    //     "GUILD_EMOJIS_AND_STICKERS",
    //     "GUILD_INTEGRATIONS",
    //     "GUILD_WEBHOOKS",
    //     "GUILD_INVITES",
    //     "GUILD_VOICE_STATES",
    //     "GUILD_PRESENCES",
    //     "GUILD_MESSAGES",
    //     "GUILD_MESSAGE_REACTIONS",
    //     "GUILD_MESSAGE_TYPING",
    //     "DIRECT_MESSAGES",
    //     "DIRECT_MESSAGE_REACTIONS",
    //     "DIRECT_MESSAGE_TYPING",
    //     "GUILD_SCHEDULED_EVENTS",
    // ],
    partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
    // partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "GUILD_SCHEDULED_EVENT"]
})

const config = require("./config.json")

require("./slash-register")(true)

// welc, cons, anno, vot, self, cour, semi, gove, mee6, spec, imag, vide, argu, game, poli, role, funq, lear, fran, hydr, vtts, mtts, ctts
// const blacklistedchannel = [
//     "964361642668343376",
//     "939675214600605757",
//     "946442711936938034",
//     "939904807605514260",
//     "963930001303015495",
//     "939675256765939863",
//     "965054741480636496",
//     "950196454880866314",
//     "955948174894325782",
//     "980961535826473033",

//     "948675276466958336",
//     "950419717779238993",
//     "951655268884820068",
//     "940786577808969738",
//     "981347603167981609",
//     "949118223805210674",
//     "964714582402826280",
//     "981647726129319976",
//     "973334244178919504",
//     "955689401688682526",

//     "947301903186944020",
//     "951345913627021354",
//     "955599561869639710"
// ]

const welc = "964361642668343376"
const cons = "939675214600605757"
const anno = "946442711936938034"
const voti = "939904807605514260"
const self = "963930001303015495"
const cour = "939675256765939863"
const semi = "965054741480636496"
const gove = "950196454880866314"
const mee6 = "955948174894325782"
const spec = "980961535826473033"

const vtts = "947301903186944020"
const mtts = "951345913627021354"
const ctts = "955599561869639710"

const imag = "948675276466958336"
const vide = "950419717779238993"
const argu = "951655268884820068"
const game = "940786577808969738"
const poli = "981347603167981609"
const role = "949118223805210674"
const funq = "964714582402826280"
const lear = "981647726129319976"
const fran = "973334244178919504"
const hydr = "955689401688682526"

const fs = require("fs")

client.responses = new Discord.Collection()
const responseFiles = fs.readdirSync("./responses/general/").filter(file => file.endsWith(".js"))
for(const file of responseFiles){
    const response = require(`./responses/general/${file}`)

    client.responses.set(response.name, response)
}

// random picker function
function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

// wait
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.on("ready", async () => {
    let commandhandler = require("./command-handler")
    if (commandhandler.default) commandhandler = commandhandler.default
    commandhandler(client)

    let dialecthandler = require("./dialect-handler")
    if (dialecthandler.default) dialecthandler = dialecthandler.default
    dialecthandler(client)

    await Economy.sync()
    await workCooldown.sync()
    await begCooldown.sync()
    await robCooldown.sync().then(console.log("Database synced"))

    const dashiuser = await Economy.findOne({where: {id: "956345939130482750"}})
    if (!dashiuser){
        await Economy.create({id: "956345939130482750", bank: 10000000, debitcard: true, motorcycle: true, superbike: true, wife: true, bailbonds: true})
    }

    // await Economy.update({bank: 10000000, debitcard: true, motorcycle: true, superbike: true, wife: true, bailbonds: true}, {where: {id: "956345939130482750"}}).then(console.log("dashi stats set"))

    console.log("dashi is on~")

    // workCooldown.destroy({truncate: true}).then(console.log("workCooldown destroyed"))
    // begCooldown.destroy({truncate: true}).then(console.log("begCooldown destroyed"))
    // robCooldown.destroy({truncate: true}).then(console.log("robCooldown destroyed"))

    // console.log("I am unable.")
    // client.destroy()

    // await Economy.destroy({where: {id: "762133129209053244"}})
    // const getUser = await Economy.findOne({where: {id: "826841451945787412"}})
    // console.log(getUser)
})

const {Economy, workCooldown, begCooldown, robCooldown} = require("./database")

const {commands} = require("./slash-register")

// client.on("typingStart", async (channel, user) => {
//     if(channel.type == "DM") return
//     console.log(`${user?.username} is typing in ${channel?.name}`)
// })

client.on("messageCreate", async message =>{
    if(message.channel.type == "DM"){
        if(message.author.id == "956345939130482750") return

        const me = await client.users.fetch("527285622809952256").catch(console.error)
    
        me.send(`**${message.author.username}** DM'd me **${message.content}**`)
    }
})

client.on("guildMemberAdd", member =>{
    member.send(`${member.user.username}, welcome to Eoic Gamer Server!`)
})

client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if(reaction.partial){
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch()
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error)
			// Return as `reaction.message.author` may be undefined/null
			return
		}
	}
    else {
        if(user.bot) return
        if(reaction.message.channel.id == "964361642668343376"){
            if(reaction.emoji.name == "✅"){
                const eoicrole = reaction.message.guild.roles.cache.find(r => r.id == "957872601550716929")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.add(eoicrole)
                // console.log(`${user.username} verified`)
    
                // console.log(`${eoicrole.name}, ${member}, test`)
    
                // if(member.roles.has(eoicrole)){
                //     console.log("has eoic gamer")
                // }
                // else {
                //     console.log("doesn't have eoic gamer")
                // }
            }
        }

        else if(reaction.message.channel.id == "963930001303015495"){
            if(reaction.emoji.name == "1️⃣"){
                const weeb = reaction.message.guild.roles.cache.find(r => r.id == "956642101653827674")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.add(weeb)
                // console.log(`${user.username} got ${weeb.name}`)
            }

            else if(reaction.emoji.name == "2️⃣"){
                const procrastinator = reaction.message.guild.roles.cache.find(r => r.id == "953099131797270588")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.add(procrastinator)
                // console.log(`${user.username} got ${procrastinator.name}`)
            }

            else if(reaction.emoji.name == "3️⃣"){
                const gordon = reaction.message.guild.roles.cache.find(r => r.id == "952349639426854973")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.add(gordon)
                // console.log(`${user.username} got ${gordon.name}`)
            }

            else if(reaction.emoji.name == "4️⃣"){
                const funque = reaction.message.guild.roles.cache.find(r => r.id == "963928836356051025")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.add(funque)
                // console.log(`${user.username} got ${funque.name}`)
            }

            else if(reaction.emoji.name == "5️⃣"){
                const streams = reaction.message.guild.roles.cache.find(r => r.id == "963933396227219497")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.add(streams)
                // console.log(`${user.username} got ${streams.name}`)
            }

            else if(reaction.emoji.name == "6️⃣"){
                const innoc = reaction.message.guild.roles.cache.find(r => r.id == "964556786105475092")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.add(innoc)
                // console.log(`${user.username} got ${innoc.name}`)
            }

            else if(reaction.emoji.name == "7️⃣"){
                const nerd = reaction.message.guild.roles.cache.find(r => r.id == "969432438516375603")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.add(nerd)
                // console.log(`${user.username} got ${nerd.name}`)
            }
        }
    }

	// Now the message has been cached and is fully available
	// console.log(`${reaction.message.author.username}'s message "${reaction.message.content}" gained a reaction!`)
    // const member = reaction.message.guild.members.get(user.id)
	// The reaction is now also fully available and the properties will be reflected accurately:
	// console.log(`${reaction.count} user(s) have given the same reaction to this message!`)
})

client.on('messageReactionRemove', async (reaction, user) => {
    if(reaction.partial){
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch()
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error)
			// Return as `reaction.message.author` may be undefined/null
			return
		}
	}

    else {
        if(user.bot) return
        if(reaction.message.channel.id == "963930001303015495"){
            if(reaction.emoji.name == "1️⃣"){
                const weeb = reaction.message.guild.roles.cache.find(r => r.id == "956642101653827674")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.remove(weeb)
                // console.log(`${user.username} removed ${weeb.name}`)
            }
    
            else if(reaction.emoji.name == "2️⃣"){
                const procrastinator = reaction.message.guild.roles.cache.find(r => r.id == "953099131797270588")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.remove(procrastinator)
                // console.log(`${user.username} removed ${procrastinator.name}`)
            }
    
            else if(reaction.emoji.name == "3️⃣"){
                const gordon = reaction.message.guild.roles.cache.find(r => r.id == "952349639426854973")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.remove(gordon)
                // console.log(`${user.username} removed ${gordon.name}`)
            }
    
            else if(reaction.emoji.name == "4️⃣"){
                const funque = reaction.message.guild.roles.cache.find(r => r.id == "963928836356051025")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.remove(funque)
                // console.log(`${user.username} removed ${funque.name}`)
            }
    
            else if(reaction.emoji.name == "5️⃣"){
                const streams = reaction.message.guild.roles.cache.find(r => r.id == "963933396227219497")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.remove(streams)
                // console.log(`${user.username} removed ${streams.name}`)
            }
    
            else if(reaction.emoji.name == "6️⃣"){
                const innoc = reaction.message.guild.roles.cache.find(r => r.id == "964556786105475092")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.remove(innoc)
                // console.log(`${user.username} removed ${innoc.name}`)
            }
    
            else if(reaction.emoji.name == "7️⃣"){
                const nerd = reaction.message.guild.roles.cache.find(r => r.id == "969432438516375603")
                const {guild} = reaction.message
                const member = guild.members.cache.find(member => member.id == user.id)
    
                // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
    
                member.roles.remove(nerd)
                // console.log(`${user.username} removed ${nerd.name}`)
            }
        }
    }
})

// slash commands
client.on("interactionCreate", async interaction => {
    await interaction.deferReply()
    if(interaction.isCommand()){

        const name = interaction.commandName
        const options = interaction.options
    
        const commandMethod = commands.get(name)
        if(!commandMethod) return

        // const message = require("discord.js")
        
        commandMethod(client, interaction, options, Economy, workCooldown, begCooldown, robCooldown)
    }
    else if(interaction.isButton()){
        const button_id = interaction.customId
        // button_id = ban-826841451945787412
        // ["ban", "826841451945787412"]
        const [command, id] = button_id.split("-")
        const guild = interaction.guild
        const member = guild.members.cache.get(id)

        if(command == "ban"){
            member.ban()
            return interaction.editReply({
                content: "Successfully banned the user",
                ephemeral: true
            })
        } else if(command == "kick"){
            member.kick()
            return interaction.editReply({
                content: "Successfully kicked the user",
                ephemeral: true
            })
        }
    }
})

// general responses for everyone
client.on("messageCreate", async message =>{
    if(message.channel.type == "DM" || message.author.bot || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == spec || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == poli || message.channel.id == role || message.channel.id == funq || message.channel.id == lear || message.channel.id == fran || message.channel.id == hydr) return

    const args = message.content.split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "rainbow dash"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("best pony")
    }

    if(command == "ding"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("dong")
    }
        
    if(message.content == "dad"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("is gone")
    }

    if(message.content == "mom"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("?? what's that")
    }
        
    if(command == "why"){
        if(message.author.id == "527285622809952256") return
        if(!message.content.startsWith("why not")){
            client.responses.get("saywhynot").execute(message, sleep)
        }
        else {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("because why")
        }
    }

    if(command == "igues"){
        client.responses.get("sayuncertaintydetected").execute(message, sleep)
    }

    if(command == "iges"){
        client.responses.get("sayuncertaintydetected").execute(message, sleep)
    }

    if(command == "igs"){
        client.responses.get("sayuncertaintydetected").execute(message, sleep)
    }

    if(command == "rick"){
        message.channel.send("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    }
    
    if(message.content == "bruh"){
        client.responses.get("saymoment").execute(message, sleep)
    }

    if(command == "bruh"){
        if(message.content == "bruh") return
        client.responses.get("saybruhmoment").execute(message, sleep)
    }

    if(message.content == "mug"){
        client.responses.get("saymoment").execute(message, sleep)
    }

    if(command == "mug"){
        if(message.content == "mug") return
        client.responses.get("saymugmoment").execute(message, sleep)
    }
    
    if(command == "k"){
        client.responses.get("saylackcare").execute(message, sleep)
    }

    if(command == "kk"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("lack care (x2)")
    }
    
    if(command == "deez"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("nutz")
    }

    if(command == "caught"){
        client.responses.get("caught").execute(message, sleep)
    }

    if(command == "goodnight"){
        client.responses.get("saygoodnight").execute(message, sleep)
    }
    
    if(command == "silly"){
        client.responses.get("silly").execute(message, sleep)
    }

    if(command == "😮"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("why 😮")
    }

    if(command == "boner"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("what you get from going to your favorite site")
    }

    if(message.content == "i like turtles"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("i like trains")
    }

    if(message.content == "i like trains"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("i like turtles")
    }
    
    const reddit = "r/"

    if(message.content.startsWith(reddit)){
        client.responses.get("reddit").execute(message, reddit)
    }

    if(message.content == "hold up"){
        client.responses.get("holup").execute(message)
    }

    if(message.content == "hold up"){
        client.responses.get("holup").execute(message)
    }

    if(message.content == "hol up"){
        client.responses.get("holup").execute(message)
    }

    if(message.content == "holdup"){
        client.responses.get("holup").execute(message)
    }

    if(message.content == "holup"){
        client.responses.get("holup").execute(message)
    }

    if(command == "yuri"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("vcashy waifu")
    }

// egghead dashi
    const alot = ["alot"]
    for (var i = 0; i < alot.length; i++) {
        const index = message.content.indexOf(alot[i])
        if (index !== -1) {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.reply("a lot*")
            break
        }
    }
})

// obsessed with d
client.on("messageCreate", async message =>{
    if(message.channel.type == "DM" || message.author.bot || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == spec || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == poli || message.channel.id == role || message.channel.id == funq || message.channel.id == lear || message.channel.id == fran || message.channel.id == hydr) return

    const ddd = ["ddd"]

    for (var i = 0; i < ddd.length; i++) {
        const index = message.content.indexOf(ddd[i])
        if (index !== -1) {
            // add one to include the space
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("obsessed with d")
            break
        }
    }
})

// if non-government tries to use @everyone or @here
client.on("messageCreate", message =>{
    if(message.channel.type == "DM" || message.author.bot || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == funq || message.channel.id == hydr) return
    if(message.author.id == "762133129209053244" || message.author.id == "527285622809952256" || message.author.id == "826841451945787412") return

    const args = message.content.split(/ +/)
    const command = args.shift().toLowerCase()

    const ping = ["@everyone", "@here"]

    for (var i = 0; i < ping.length; i++) {
        const index = message.content.toLowerCase().indexOf(ping[i])
        if (index !== -1) {
            message.reply("only governmental officials can use that ping idot!")
            break
        }
    }
})

// commands for mezmer420
client.on("messageCreate", async message =>{
    if(message.channel.type == "DM" || message.author.bot) return

    const args = message.content.split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "qwert"){
        if(message.author.id !== "527285622809952256") return
        message.channel.send("tset").then(sentMessage =>{
            sentMessage.react("1️⃣")
            sentMessage.react("2️⃣")
            sentMessage.react("3️⃣")
            sentMessage.react("4️⃣")
            sentMessage.react("5️⃣")
            sentMessage.react("6️⃣")
            sentMessage.react("7️⃣")
        })
    }

    if(command == "!bad"){
        if(message.author.id !== "527285622809952256") return
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send("sowwy")
    }
})

// commands for boomer bot
// client.on("messageCreate", message =>{
//     if(message.author.id == "969084144141344788") {
//     if(message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

//     const args = message.content.split(/ +/)
//     const command = args.shift().toLowerCase()

//     if(command == "how"){
//         message.channel.send("<@&969084144141344788> ??? choc himself said it's ok for us to call him \"cock\"")
//     }

//     if(command == "cookies"){
//         message.channel.send("boomer detected")
//     }

//     if(command == "i"){
//         message.channel.send("bomer hi")
//     }
    
//     if(command == "why"){
//         message.channel.send("damn do we not have a right to misspell your name")
//     }

//     if(command == "stop"){
//         message.channel.send("sinner")
//     }

//     if(command == "yes"){
//         message.channel.send("https://www.unorules.org/wp-content/uploads/2021/09/Uno-Reverse-Card-Green-Classic-Uno-Unorules.org_.png.png")
//     }

// }
// })

// commands for delta bot
client.on("messageCreate", message =>{
    if(message.channel.type == "DM") return
    if(message.author.id == "973731082136592454"){
    if(message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const args = message.content.split(/ +/)
    const command = args.shift().toLowerCase()

    // if(command == "shut"){
    //     message.reply("language")
    // }

    // if(command == "oki"){
    //     message.reply("uwu owo")
    // }

    const badWord = ["fuck", "bitch", "damn", "shit"]

    for (var i = 0; i < badWord.length; i++) {
        const index = message.content.indexOf(badWord[i])
        if (index !== -1) {
            message.reply("language!")
            break
        }
    }
}
})

// respond to people with @france role
// client.on("messageCreate", message =>{
//     if(message.channel.type == "DM") return
//     if(message.author.id == ""){
//     message.channel.send("https://c.tenor.com/eUGNMYebEwoAAAAC/bleu-blanc-rouge-france.gif")
// }
// })

client.login(config.token)