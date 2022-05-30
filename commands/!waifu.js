module.exports = {
    name: "!waifu",
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