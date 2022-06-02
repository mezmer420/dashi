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

const args = message.content.slice(1).split(/ +/)
const commandName = args.shift().toLowerCase()

module.exports = {
    name: "waifu",
    description: "random yuri picker",
    execute(message, RandArray){
        if(message.author.bot) return
        if(message.channel.id == "939686071241949205" || message.channel.id == "945527434655187006"){
            if(message.author.id == "762133129209053244" || message.author.id == "527285622809952256"){

            const yurinumbers = ["q59u1enq8f", "v5276j5lc5", "h36qc00td7", "l5rhtpoq7f", "msgbefh79t", "9p32ifvhwd", "ubkw47qr1p", "pupedixq5e", "xjlcnmp71w", "ow9yz77ral", "3849o45dwt", "e0nf688kip", "0wwayn2ajj", "3b5g3ty49b", "j1an3w3zrk", "doqhes3gj5", "kcn4vronhr", "cdezma2ron", "fvyltdc89n", "3geu76bpo0"]
            const randomyuri = RandArray(yurinumbers)

            message.channel.send(randomyuri)
        }
        else {
            message.reply("bruh just use <@432610292342587392>'s $waifu commmand")
        }
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
}