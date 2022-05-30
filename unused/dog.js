module.exports = {
    name: "!dog",
    description: "random dog picker",
    execute(message, RandArray){
        if(message.author.bot) return
        if(message.channel.id == "939674946953682976" || message.channel.id == "939686071241949205" || message.channel.id == "945527434655187006"){

// actual names                      dog 1            dog 2            dog 3
            const dognumbers = ["randomstring1", "randomstring2", "randomstring3"]
            const randomdog = RandArray(dognumbers)

            message.channel.send(randomdog)
        }
        else {
            message.reply(`you can only use that command in ${message.guild.channels.cache.get("939674946953682976").toString()} (restricted use) and ${message.guild.channels.cache.get("939686071241949205").toString()} and ${message.guild.channels.cache.get("945527434655187006").toString()}! (these messages will autodelete)`)
            .then(msg => {
                setTimeout(() => message.delete(), 6000)
                setTimeout(() => msg.delete(), 6000)
              })
              .catch()
        }
    }
}