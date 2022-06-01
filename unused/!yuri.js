module.exports = {
    name: "!yuri",
    description: "random yuri picker",
    execute(message, RandArray){
        if(message.author.bot) return
        if(message.channel.id == "939686071241949205" || message.channel.id == "945527434655187006"){

                           // [yuri1,            yuri2,             yuri3]

            const yurivalues = ["randomstring1", "randomstring2", "randomstring3"]
            const randomyuri = RandArray(yurivalues)

            message.channel.send(randomyuri)
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