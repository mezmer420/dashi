const { MessageEmbed } = require("discord.js")

module.exports = {
    callback: async (client, message, args) => {
        if(message.author.id == "527285622809952256"){
            message.delete()
            .catch((err) => {
                return
            })
            message.channel.send("https://i.pinimg.com/originals/32/8a/7e/328a7efd6bda56acd35a3d2ab702aa2a.gif")
        }
        else {
            message.reply("only mezmer420 can use that command! (these messages will autodelete)")
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