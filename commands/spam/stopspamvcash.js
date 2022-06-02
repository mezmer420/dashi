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

module.exports = {
    callback: (message, args) => {
        if(message.author.id == "527285622809952256" || message.author.id == "826841451945787412"){
            if(message.channel.id == "945527434655187006"){
                switch (message.content) {
                    case "!stopspamvcash":
                        clearInterval(interval)
                        message.channel.send("vcash spam is stopped")
                    break
                }
            }
            else {
                message.reply(`you can only use that command in ${message.guild.channels.cache.get("945527434655187006").toString()}! (these messages will autodelete)`)
                .then(msg => {
                    setTimeout(() => message.delete(), 6000)
                    setTimeout(() => msg.delete(), 6000)
                  })
                  .catch()
            }
        }

        else {
            message.reply("only mezmer420 and choc can use that command! (these messages will autodelete)")
            .then(msg => {
                setTimeout(() => message.delete(), 6000)
                setTimeout(() => msg.delete(), 6000)
            })
            .catch()
        }
    }
}