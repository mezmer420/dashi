const welc = "964361642668343376"
const cons = "939675214600605757"
const anno = "946442711936938034"
const voti = "939904807605514260"
const self = "963930001303015495"
const cour = "939675256765939863"
const semi = "965054741480636496"
const gove = "950196454880866314"
const logs = "955948174894325782"
const spec = "980961535826473033"

const imag = "948675276466958336"
const vide = "950419717779238993"
const argu = "951655268884820068"
const game = "940786577808969738"
const poli = "981347603167981609"
const role = "949118223805210674"
const funq = "964714582402826280"
const lear = "981647726129319976"
const fran = "973334244178919504"
const bots = "983507823965114378"
const hydr = "955689401688682526"

const vtts = "947301903186944020"
const mtts = "951345913627021354"
const ctts = "955599561869639710"

const {hangman} = require("reconlx")
// npm i reconlx@version1

module.exports = {
    callback: async (client, message, args) => {
        if(message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == logs || message.channel.id == spec || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == poli || message.channel.id == role || message.channel.id == funq || message.channel.id == lear || message.channel.id == fran || message.channel.id == bots || message.channel.id == hydr) return
        if(message.author.id == "527285622809952256" || message.author.id == "762133129209053244" || message.author.id == "826841451945787412"){
            const channel = message.mentions.channels.first()

            if(!channel) return message.reply("specify the channel! command format is `!newhangman [word] [channel]`")
            .catch((err) => {
                return
            })

            if(channel.id !== "939674946953682976" && channel.id !== "939686071241949205"  && channel.id !== "940786577808969738" && channel.id !== "945527434655187006" && channel.id !== "969027553878749204") return message.reply("you can only use that command in <#939674946953682976>, <#939686071241949205>, <#940786577808969738>, <#945527434655187006>, or <#969027553878749204> (these messages will autodelete)")
            .catch((err) => {
                return
            })
            .then(msg => {
                setTimeout(() => message.delete()
                .catch((err) => {
                    return
                }), 6000)
                if(msg){
                    setTimeout(() => msg.delete()
                    .catch((err) => {
                        return
                    }), 6000)
                }
              })

            const word = message.content.slice(12).replace(`<#${channel.id}>`, "").replace("  ", " ").split(/ +/).shift()

            if(!word) return message.reply("specify the channel! command format is `!newhangman [word] [channel]`")
            .catch((err) => {
                return
            })

            console.log(word)

            if(!/^[a-zA-Z]+$/.test(word)) return message.reply("you can only use letters!")
            .catch((err) => {
                return
            })

            message.channel.send(`starting a hangman game with word **${word}** in <#${channel.id}> (these messages will autodelete)`)
            .then(msg => {
                setTimeout(() => message.delete()
                .catch((err) => {
                    return
                }), 6000)
                if(msg){
                    setTimeout(() => msg.delete()
                    .catch((err) => {
                        return
                    }), 6000)
                }
              })

            const hangmangame = new hangman({
                message: message,
                word: word,
                client: client,
                channelID: channel.id
            })

            await client.channels.cache.get(`${channel.id}`).send(`**Custom Hangman Game**\nStarted By: ${message.author.username}`)

            hangmangame.start()
            .catch((err) => {
                return console.log(err)
            })
        }

        else {
            message.reply("only government officials can use that command! (these messages will autodelete)")
            .catch((err) => {
                return
            })
            .then(msg => {
                setTimeout(() => message.delete()
                .catch((err) => {
                    return
                }), 6000)
                if(msg){
                    setTimeout(() => msg.delete()
                    .catch((err) => {
                        return
                    }), 6000)
                }
              })
        }
    }
}