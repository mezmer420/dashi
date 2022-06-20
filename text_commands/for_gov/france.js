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

module.exports = {
    callback: (client, message, args) => {
        if(message.author.id == "762133129209053244" || message.author.id == "527285622809952256" || message.author.id == "826841451945787412"){
            if(message.channel.id == "973334244178919504"){
                message.channel.send("https://c.tenor.com/eUGNMYebEwoAAAAC/bleu-blanc-rouge-france.gif")
            }

            else {
                message.reply(`for safety, you can only use that command in ${message.guild.channels.cache.get("973334244178919504").toString()}`)
                .catch((err) => {
                    return
                })
            }
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
                setTimeout(() => msg.delete()
                .catch((err) => {
                    return
                }), 6000)
              })
        }
    }
}