const Discord = require("discord.js")

const client = new Discord.Client({
    presence: {
        status: "online",
        afk: false,
        activities: [{
            name: "everything you say",
            type: "LISTENING"
            // url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }],
    },
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES"],
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
    partials: ["CHANNEL"]
});

const config = require("./config.json")

require("./slash-register")(true)

const prefix = ""

// welc, cons, anno, vot, self, cour, semi, gove, mee6, imag, vide, argu, game, role, funq, hydr, vtts, mtts, ctts, dtts
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
//     "948675276466958336",
//     "950419717779238993",
//     "951655268884820068",
//     "940786577808969738",
//     "949118223805210674",
//     "964714582402826280",
//     "955689401688682526",
//     "947301903186944020",
//     "951345913627021354",
//     "955599561869639710", 
//     "975235909861654538"
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

const vtts = "947301903186944020"
const mtts = "951345913627021354"
const ctts = "955599561869639710"
const dtts = "975235909861654538"

const imag = "948675276466958336"
const vide = "950419717779238993"
const argu = "951655268884820068"
const game = "940786577808969738"
const role = "949118223805210674"
const funq = "964714582402826280"
const hydr = "955689401688682526"

const fs = require("fs")

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.dialects = new Discord.Collection()
const dialectFiles = fs.readdirSync("./dialects/").filter(file => file.endsWith(".js"))
for(const file of dialectFiles){
    const dialect = require(`./dialects/${file}`)

    client.dialects.set(dialect.name, dialect)
}

client.ponyembeds = new Discord.Collection()
const ponyembedFiles = fs.readdirSync("./embeds/pony_embeds/").filter(file => file.endsWith(".js"))
for(const file of ponyembedFiles){
    const ponyembed = require(`./embeds/pony_embeds/${file}`)

    client.ponyembeds.set(ponyembed.name, ponyembed)
}

client.yuriembeds = new Discord.Collection()
const yuriembedFiles = fs.readdirSync("./embeds/yuri_embeds/").filter(file => file.endsWith(".js"))
for(const file of yuriembedFiles){
    const yuriembed = require(`./embeds/yuri_embeds/${file}`)

    client.yuriembeds.set(yuriembed.name, yuriembed)
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
    await Economy.sync().then(console.log("Economy synced"))
    await workCooldown.sync().then(console.log("workCooldown synced"))
    await begCooldown.sync().then(console.log("begCooldown synced"))
    await robCooldown.sync().then(console.log("robCooldown synced"))

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

// client.on("guildMemberRemove", member =>{
//     member.send(`You left Eoic Gamer Server. Maybe you were kicked, banned, or left on your own accord. If you left on your own accord, please provide feedback right here in this DM as to why you did so.`)
// })

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
    if(message.channel.type == "DM" || !message.content.startsWith(prefix) || message.author.bot || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "rainbow dash"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("best pony")
    }

    if(command == "ding"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("dong")
    }
        
    if(message.content == "dad"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("is gone")
    }

    if(message.content == "mom"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("?? what's that")
    }
        
    if(command == "why"){
        if(message.author.id == "527285622809952256") return
        if(!message.content.startsWith("why not")){
            client.commands.get("saywhynot").execute(message, sleep)
        }
        else {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 1000) + 1001)
            message.channel.send("because why")
        }
    }

    if(command == "igues"){
        client.commands.get("sayuncertaintydetected").execute(message, sleep)
    }

    if(command == "iges"){
        client.commands.get("sayuncertaintydetected").execute(message, sleep)
    }

    if(command == "igs"){
        client.commands.get("sayuncertaintydetected").execute(message, sleep)
    }

    if(command == "rick"){
        message.channel.send("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    }
    
    if(message.content == "bruh"){
        client.commands.get("saymoment").execute(message, sleep)
    }

    if(command == "bruh"){
        if(message.content == "bruh") return
        client.commands.get("saybruhmoment").execute(message, sleep)
    }

    if(message.content == "mug"){
        client.commands.get("saymoment").execute(message, sleep)
    }

    if(command == "mug"){
        if(message.content == "mug") return
        client.commands.get("saymugmoment").execute(message, sleep)
    }
    
    if(command == "k"){
        client.commands.get("saylackcare").execute(message, sleep)
    }

    if(command == "kk"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("lack care (x2)")
    }
    
    if(command == "deez"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("nutz")
    }

    if(command == "caught"){
        client.commands.get("caught").execute(message, sleep)
    }

    if(command == "goodnight"){
        client.commands.get("saygoodnight").execute(message, sleep)
    }
    
    if(command == "silly"){
        client.commands.get("silly").execute(message, sleep)
    }

    if(command == "😮"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("why 😮")
    }

    if(command == "boner"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("what you get from going to your favorite site")
    }

    if(command == "!good"){
        client.commands.get("!good").execute(message, sleep)
    }

    // if(command == "!dashi"){
    //     message.channel.send("e")
    // }

    if(command == "olc"){
        if(message.channel.id == "939674946953682976" || message.channel.id == "970859343849349160"){
            client.dialects.get("mezmerdialect").execute(message, sleep)
        }
        else {
            message.channel.send("https://imgur.com/a/Mif7suH")
        }
    }

    if(command == "oolc"){
        if(message.channel.id == "939674946953682976" || message.channel.id == "970859343849349160"){
            client.dialects.get("mezmerdialect").execute(message, sleep)
        }
        else {
        message.channel.send("https://imgur.com/a/LnykHHZ")
        }
    }

    if(message.content == "i like turtles"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("i like trains")
    }

    if(message.content == "i like trains"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("i like turtles")
    }
    
    const reddit = "r/"

    if(message.content.startsWith(reddit)){
        client.commands.get("reddit").execute(message, reddit)
    }

    if(message.content == "hold up"){
        client.commands.get("holup").execute(message)
    }

    if(message.content == "hold up"){
        client.commands.get("holup").execute(message)
    }

    if(message.content == "hol up"){
        client.commands.get("holup").execute(message)
    }

    if(message.content == "holdup"){
        client.commands.get("holup").execute(message)
    }

    if(message.content == "holup"){
        client.commands.get("holup").execute(message)
    }

    if(command == "yuri"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("vcashy waifu")
    }
    
// dialects
    // vcash
    if(command == "ballsl"){
        client.dialects.get("vcashdialect").execute(message, sleep)
    }

    if(message.content == "el mao"){
        client.dialects.get("vcashdialect").execute(message, sleep)
    }

    if(command == "kl"){
        client.dialects.get("vcashdialect").execute(message, sleep)
    }

    if(message.content == "le mao"){
        client.dialects.get("vcashdialect").execute(message, sleep)
    }

    if(command == "peel"){
        client.dialects.get("vcashdialect").execute(message, sleep)
    }

    if(command == "toyota"){
        client.dialects.get("vcashdialect").execute(message, sleep)
    }

    if(command == "toyot"){
        client.dialects.get("vcashdialect").execute(message, sleep)
    }

    if(command == "xt"){
        client.dialects.get("vcashdialect").execute(message, sleep)
    }

    // mezmer
    if(message.content == "ecks dee"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(command == "hmok"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(command == "idecay"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(command == "ifusaiso"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(message.content == "le mayo"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(command == "obsessed"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(command == "omegal"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(command == "wowzer"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(command == "wowzr"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(command == "wowzerooni"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    if(command == "wowzeroni"){
        client.dialects.get("mezmerdialect").execute(message, sleep)
    }

    // choc
    if(command == "ifusaso"){
        client.dialects.get("chocdialect").execute(message, sleep)
    }

    if(command == "perty"){
        client.dialects.get("chocdialect").execute(message, sleep)
    }

    if(command == "ys"){
        client.dialects.get("chocdialect").execute(message, sleep)
    }

    if(command == "yss"){
        client.dialects.get("chocdialect").execute(message, sleep)
    }

    //choc x spedy
    if(command == "e"){
        client.dialects.get("speedychocdialect").execute(message, sleep)
    }

    // speedy
    if(command == "emoyi"){
        client.dialects.get("speedydialect").execute(message, sleep)
    }

    if(command == "gf"){
        client.dialects.get("speedydialect").execute(message, sleep)
    }

    if(command == "ues"){
        client.dialects.get("speedydialect").execute(message, sleep)
    }

    // delta
    if(command == "bigfunni"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "bigl"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "bihl"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "cockl"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "ifusayso"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(message.content == "la mao"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "mediuml"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "megal"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "r"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "shut"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "tinyl"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "yees"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "yeees"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "yeeees"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "yews"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    if(command == "yeews"){
        client.dialects.get("deltadialect").execute(message, sleep)
    }

    // garrett
    // if(command == "yo"){
    //     client.dialects.get("garrettdialect").execute(message, sleep)
    // }

    // if(command == "dude"){
    //     client.dialects.get("garrettdialect").execute(message, sleep)
    // }
    
    // if(command == "funko"){
    //     client.dialects.get("garrettdialect").execute(message, sleep)
    // }

    // if(command == "nft"){
    //     client.dialects.get("garrettdialect").execute(message, sleep)
    // }
})

// general commands for everyone
client.on("messageCreate", message =>{
    if(message.channel.type == "DM" || !message.content.startsWith(prefix) || message.author.bot || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "!servers"){
        client.commands.get("!servers").execute(client, message)
    }
})

// pony embeds (only i can use)
client.on("messageCreate", message =>{
    if(message.channel.type == "DM" || !message.content.startsWith(prefix) || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    
    if(command == "!twilight"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("TwilightSparkle").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!rainbow"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("RainbowDash").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!aj"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("Applejack").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!fluttershy"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("Fluttershy").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!rarity"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("Rarity").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!pinkie"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("PinkiePie").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!celestia"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("PrincessCelestia").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!luna"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("PrincessLuna").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!cadance"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("PrincessCadance").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!starlight"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("StarlightGlimmer").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!sweetie"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("SweetieBelle").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!scootaloo"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("Scootaloo").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!applebloom"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("AppleBloom").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!shining"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("ShiningArmor").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!derpy"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("DerpyHooves").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!bigmac"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("BigMacintosh").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }

    if(command == "!trixie"){
        if(message.author.id == "527285622809952256"){
            client.ponyembeds.get("Trixie").execute(message, Discord)
        }
        else {
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
    }
})

// waifu (yuri) embeds (only vcash and i can use)
client.on("messageCreate", message =>{
    if(message.channel.type == "DM" || !message.content.startsWith(prefix) || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "!waifu"){
        client.commands.get("!waifu").execute(message, RandArray)
    }


    if(message.content == "q59u1enq8f"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri1").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri1"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri1").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "v5276j5lc5"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri2").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri2"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri2").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "h36qc00td7"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri3").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri3"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri3").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "l5rhtpoq7f"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri4").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri4"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri4").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "msgbefh79t"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri5").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri5"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri5").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "9p32ifvhwd"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri6").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri6"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri6").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "ubkw47qr1p"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri7").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri7"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri7").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "pupedixq5e"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri8").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri8"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri8").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "xjlcnmp71w"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri9").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri9"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri9").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "ow9yz77ral"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri10").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri10"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri10").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "3849o45dwt"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri11").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri11"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri11").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "e0nf688kip"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri12").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri12"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri12").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "0wwayn2ajj"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri13").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri13"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri13").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "3b5g3ty49b"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri14").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri14"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri14").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "j1an3w3zrk"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri15").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri15"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri15").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "doqhes3gj5"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri16").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri16"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri16").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "kcn4vronhr"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri17").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri17"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri17").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "cdezma2ron"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri18").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri18"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri18").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "fvyltdc89n"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri19").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri19"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri19").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }

    if(message.content == "3geu76bpo0"){
        if(!message.author.bot) return
        client.yuriembeds.get("Yuri20").execute(message, Discord)
        message.delete()
    }
    if(command == "!yuri20"){
        if(message.author.id == "527285622809952256"){
            client.yuriembeds.get("Yuri20").execute(message, Discord)
        }
        else if(message.author.id == "762133129209053244"){
            message.reply("only mezmer420 can use that command! (for debugging purposes obviously)")
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
    }
})

// obsessed with d
client.on("messageCreate", async message =>{
    if(message.channel.type == "DM" || !message.content.startsWith(prefix) || message.author.bot || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const ddd = ["ddd"]

    for (var i = 0; i < ddd.length; i++) {
        const index = message.content.indexOf(ddd[i])
        if (index !== -1) {
            // add one to include the space
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 1000) + 1001)
            message.channel.send("obsessed with d")
            break
        }
    }
})

// commands for government
client.on("messageCreate", message =>{
    if(message.channel.type == "DM" || !message.content.startsWith(prefix) || message.author.bot || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "!france"){
        client.commands.get("!france").execute(message)
    }
})

// if non-government tries to use @everyone or @here
client.on("messageCreate", message =>{
    if(message.channel.type == "DM" || !message.content.startsWith(prefix) || message.author.bot || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "@everyone"){
        if(message.author.id == "762133129209053244" || message.author.id == "527285622809952256" || message.author.id == "826841451945787412") return
            message.reply("only governmental officials can ping everyone idot!")
    }

    if(command == "@here"){
        if(message.author.id == "762133129209053244" || message.author.id == "527285622809952256" || message.author.id == "826841451945787412") return
            message.reply("only governmental officials can ping here idot!")
    }
})

// say anything (only i can use), can be used in any channel
client.on("messageCreate", message =>{
    if(message.channel.type == "DM" || !message.content.startsWith(prefix) || message.author.bot) return

    const sayWord = "!!s"

    if(message.content.startsWith(sayWord)){
        client.commands.get("!!s").execute(message, sayWord)
    }

    // if(message.content.startsWith("!embed")){
    //     client.commands.get("!embed").execute(message)
    // }
})

// commands for mezmer420
client.on("messageCreate", async message =>{
    if(message.channel.type == "DM" || !message.content.startsWith(prefix) || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "!bad"){
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 1000) + 1001)
        message.channel.send("sowwy")
    }
})

// spam vcash (only i can use)
client.on("messageCreate", async message => {
    if(message.channel.type == "DM") return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(message.author.id == "527285622809952256"){
        client.commands.get("!spamvcash").execute(message, command)
}
})

// response to non-me who try to use spamvcash commands
client.on("messageCreate", message =>{
    if(message.channel.type == "DM") return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "!spamvcash" || command == "!stopspamvcash"){
        if(message.author.id == "527285622809952256") return
        message.reply("only mezmer420 can use that command! (these messages will autodelete)")
        .then(msg => {
            setTimeout(() => message.delete(), 6000)
            setTimeout(() => msg.delete(), 6000)
        })
        .catch()
    }
})

// spam mezmer422 (only i can use)
client.on("messageCreate", async message => {
    if(message.channel.type == "DM") return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(message.author.id == "527285622809952256"){
        client.commands.get("!spam422").execute(message, command)
}
})

// response to non-me who try to use spam422 commands
client.on("messageCreate", message =>{
    if(message.channel.type == "DM") return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "!spam422" || command == "!stopspam422"){
        if(message.author.id == "527285622809952256") return
        message.reply("only mezmer420 can use that command! (these messages will autodelete)")
        .then(msg => {
            setTimeout(() => message.delete(), 6000)
            setTimeout(() => msg.delete(), 6000)
        })
        .catch()
    }
})

// spam speedy (me and vcash can use)
client.on("messageCreate", async message => {
    if(message.channel.type == "DM") return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(message.author.id == "527285622809952256" || message.author.id == "762133129209053244"){
        client.commands.get("!spamspedy").execute(message, command)
}
})

// response to non-me-or-vcash who try to use spamspedy commands
client.on("messageCreate", message =>{
    if(message.channel.type == "DM") return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "!spamspedy"){
        if(message.author.id == "527285622809952256" || message.author.id =="762133129209053244") return
        message.reply("only mezmer420 and vcashy can use that command! (these messages will autodelete)")
        .then(msg => {
            setTimeout(() => message.delete(), 6000)
            setTimeout(() => msg.delete(), 6000)
        })
        .catch()
    }

    if(command == "!stopspamspedy"){
        if(message.author.id == "527285622809952256" || message.author.id =="762133129209053244") return
        message.reply("only mezmer420 and vcashy can use that command! (these messages will autodelete)")
        .then(msg => {
            setTimeout(() => message.delete(), 6000)
            setTimeout(() => msg.delete(), 6000)
        })
        .catch()
    }
})

// spam choc (me and vcash can use)
client.on("messageCreate", async message => {
    if(message.channel.type == "DM") return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(message.author.id == "527285622809952256" || message.author.id == "762133129209053244"){
        client.commands.get("!cock").execute(message, command)
}
})

// response to non-me-or-vcash who try to use spamchoc commands
client.on("messageCreate", message =>{
    if(message.channel.type == "DM") return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "!cock"){
        if(message.author.id == "527285622809952256" || message.author.id =="762133129209053244") return
        message.reply("only mezmer420 and vcashy can use that command! (these messages will autodelete)")
        .then(msg => {
            setTimeout(() => message.delete(), 6000)
            setTimeout(() => msg.delete(), 6000)
        })
        .catch()
    }

    if(command == "!stopcock"){
        if(message.author.id == "527285622809952256" || message.author.id =="762133129209053244") return
        message.reply("only mezmer420 and vcashy can use that command! (these messages will autodelete)")
        .then(msg => {
            setTimeout(() => message.delete(), 6000)
            setTimeout(() => msg.delete(), 6000)
        })
        .catch()
    }
})

// commands for mezmer420 and vcash
// client.on("messageCreate", message =>{
//     if(message.author.id == "527285622809952256" || message.author.id == "762133129209053244") {
//     if(!message.content.startsWith(prefix) || message.author.bot || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

//     const args = message.content.slice(prefix.length).split(/ +/)
//     const command = args.shift().toLowerCase()

    
// }
// })

// commands for boomer bot
// client.on("messageCreate", message =>{
//     if(message.author.id == "969084144141344788") {
//     if(!message.content.startsWith(prefix) || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

//     const args = message.content.slice(prefix.length).split(/ +/)
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
    if(!message.content.startsWith(prefix) || message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "shut"){
        message.reply("language")
    }
}
})

// respond to everything someone says
// client.on("messageCreate", message =>{
//     if(message.author.id == "idofvictim") {
//     if(!message.content.startsWith(prefix) || message.author.bot) return


// }
// })

// respond to people with @france role
// client.on("messageCreate", message =>{
//     if(message.channel.type == "DM") return
//     const hasfrancerole = message.member.roles.cache.has("973334603253317702")
//     if(hasfrancerole){
//     message.channel.send("https://c.tenor.com/eUGNMYebEwoAAAAC/bleu-blanc-rouge-france.gif")
// }
// })


// dad bot
// const imWord = ["i'm", "I'm", "i'M", "I'M", "im", "Im", "iM", "IM"]

// client.on("messageCreate", message =>{

//     const args = message.content.slice(prefix.length).split(/ +/)
//     const command = args.shift().toLowerCase()

//     if(command == "i'm" || command == "im"){
//     if(message.author.id == "956345939130482750") return
//     for (var i = 0; i < imWord.length; i++) {
//         const index = message.content.indexOf(imWord[i])
//         if (index !== -1) {
//             // add one to include the space
//             const name = message.content.slice(index + imWord[i].length + 1)
//             message.channel.send(`hi ${name}`)
//             break
//         }
//     }
// }
// })

// dad bot anywhere in message
// client.on("messageCreate", message =>{

//     const args = message.content.slice(prefix.length).split(/ +/)
//     const command = args.shift().toLowerCase()

//     const imWord = ["i'm", "I'm", "i'M", "I'M", "im", "Im", "iM", "IM"]

//     if(message.author.id == "956345939130482750") return
//     for (var i = 0; i < imWord.length; i++) {
//         const index = message.content.indexOf(imWord[i])
//         if (index !== -1) {
//             // add one to include the space
//             const name = message.content.slice(index + imWord[i].length + 1)

//             message.channel.send(`hi ${name}`)
//             break
//         }
//     }
// })

// bad language response from anywhere in message
// client.on("messageCreate", message =>{

//     const args = message.content.slice(prefix.length).split(/ +/)
//     const command = args.shift().toLowerCase()

//     const badWord = ["fucking", "fuck", "bitch", "damn"]

//     if(message.author.id == "956345939130482750") return
//     for (var i = 0; i < badWord.length; i++) {
//         const index = message.content.indexOf(badWord[i])
//         if (index !== -1) {

//             message.reply("language")
//             break
//         }
//     }
// })

// dm winner
// client.on("messageCreate", message =>{
//     if(!message.content.startsWith(prefix) || message.author.bot || message.author.id == "762133129209053244") return

//     const args = message.content.slice(prefix.length).split(/ +/)
//     const command = args.shift().toLowerCase()

//     if(command == "idecay"){
//         message.author.send('Congratulations! You won the secret contest of mezmer420 (to say "idecay")! DO NOT tell anyone you have won until mezmer420 gives you the winner role.')
//         message.channel.send("<@527285622809952256>")
//     }
// })

client.login(config.token)