const Discord = require("discord.js")

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const config = require("./config.json")

const prefix = ""

const fs = require("fs")

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.carembeds = new Discord.Collection()
const carembedFiles = fs.readdirSync("./embeds/car_embeds/").filter(file => file.endsWith(".js"))
for(const file of carembedFiles){
    const carembed = require(`./embeds/car_embeds/${file}`)

    client.carembeds.set(carembed.name, carembed)
}

client.yuriembeds = new Discord.Collection()
const yuriembedFiles = fs.readdirSync("./embeds/yuri_embeds/").filter(file => file.endsWith(".js"))
for(const file of yuriembedFiles){
    const yuriembed = require(`./embeds/yuri_embeds/${file}`)

    client.yuriembeds.set(yuriembed.name, yuriembed)
}

client.once("ready", () => {
    console.log("vcashcarbot is online!")
})

// random picker function
function RandArray(array){
    var rand = Math.random()*array.length | 0
    var rValue = array[rand]
    return rValue
}

client.on("messageCreate", message =>{

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "ping"){
        message.channel.send("pong!")
    }

})

client.on("messageCreate", message =>{

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "word1"){
        client.commands.get("response1").execute(message, args)
    }

    if(command == "word2"){
        client.commands.get("response1").execute(message, args)
    }

})

// !car command for everyone
client.on("messageCreate", message =>{

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    
    if(command == "!car"){
        client.commands.get("!car").execute(message, RandArray)
    }
    
    
    if(message.content == "randomstring1"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("toyotacamry").execute(message, Discord)
    }
    if(command == "!toyotacamry"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("toyotacamry").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring2"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }
})

// !yuri command for everyone
client.on("messageCreate", message =>{

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    
    if(command == "!yuri"){
        client.commands.get("!yuri").execute(message, RandArray)
    }
    
    
    if(message.content == "randomstring1"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("toyotacamry").execute(message, Discord)
    }
    if(command == "!toyotacamry"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("toyotacamry").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring2"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("supra").execute(message, Discord)
    }
    if(command == "!supra"){
        if(message.author.id == "762133129209053244"){
            client.carembeds.get("supra").execute(message, Discord)
        }
        else {
            message.reply("only vcash can use that command! (for debugging purposes obviously)")
        }
    }
})


// !dog carembed command for everyone
client.on("messageCreate", message =>{

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    
    if(command == "!dog"){
        client.commands.get("!dog").execute(message, RandArray)
    }
})


// // text only !car command
// client.on("messageCreate", message =>{
//     if(!message.content.startsWith(prefix) || message.author.bot) return

//     const args = message.content.slice(prefix.length).split(/ +/)
//     const command = args.shift().toLowerCase()

//     if(command == "!car"){
//         if(message.channel.id == "939686071241949205" || message.channel.id == "945527434655187006"){

//             const cars = ["car1", "car2", "car3", "car4", "car5", "car6", "car7", "car8", "car9", "car10"]
//             const randomcar = RandArray(cars)

//             message.channel.send(randomcar)
//         }
//         else {
//             message.reply(`you can only use that command in ${message.guild.channels.cache.get("939686071241949205").toString()} and ${message.guild.channels.cache.get("945527434655187006").toString()}! (these messages will autodelete)`)
//             .then(msg => {
//                 setTimeout(() => message.delete(), 6000)
//                 setTimeout(() => msg.delete(), 6000)
//               })
//               .catch()
//         }
//     }
// })

// text only !dog command
client.on("messageCreate", message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == "!dog"){
        if(message.channel.id == "939686071241949205" || message.channel.id == "945527434655187006"){

            const dogstext = ["dog 1", "dog 2", "dog 3", "dog 4", "dog 5", "dog 6", "dog 7", "dog 8", "dog 9", "dog 10"]
            const randomdogtext = RandArray(dogstext)

            message.channel.send(randomdogtext)
        }
        else {
            message.reply(`you can only use that command in ${message.guild.channels.cache.get("939686071241949205").toString()} and ${message.guild.channels.cache.get("945527434655187006").toString()}! (these messages will autodelete)`)
            .then(msg => {
                setTimeout(() => message.delete(), 6000)
                setTimeout(() => msg.delete(), 6000)
              })
              .catch()
        }
    }
})

client.login(config.token)





























































// !dog carembed command for everyone
client.on("messageCreate", message =>{

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    
    if(command == "!dog"){
        client.commands.get("!dog").execute(message, RandArray)
    }

    if(message.content == "randomstring1"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("englishbulldog").execute(message, Discord)
    }
    if(command == "!englishbulldog"){
        if(message.author.id == "826841451945787412"){
            client.carembeds.get("englishbulldog").execute(message, Discord)
        }
        else {
            message.reply("only choc can use that command")
        }
    } 

    if(message.content == "randomstring2"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("dog2").execute(message, Discord)
    }
    if(command == "!dog2"){
        if(message.author.id == "826841451945787412"){
            client.carembeds.get("dog2").execute(message, Discord)
        }
        else {
            message.reply("only choc can use that command")
        }
    } 

    if(message.content == "randomstring3"){
        if(!message.author.bot) return
        message.delete()
        client.carembeds.get("dog3").execute(message, Discord)
    }
    if(command == "!dog3"){
        if(message.author.id == "826841451945787412"){
            client.carembeds.get("dog3").execute(message, Discord)
        }
        else {
            message.reply("only choc can use that command")
        }
    } 
})