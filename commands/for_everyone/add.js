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
    callback: async (message, args) => {
        if(message.channel.id == welc || message.channel.id == cons || message.channel.id == anno || message.channel.id == voti || message.channel.id == self || message.channel.id == cour || message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == dtts || message.channel.id == imag || message.channel.id == vide || message.channel.id == argu || message.channel.id == game || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return

        let sum = 0

        for (const arg of args) {
            sum += parseInt(arg)
        }

        message.reply(`The sum is ${sum}`)
    }
}