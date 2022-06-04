const { MessageEmbed } = require("discord.js")

module.exports = {
    callback: async (message, args) => {
        if(message.author.id == "527285622809952256"){
            message.delete()
            const Embed = new MessageEmbed()
            .setColor("#9BDBF5")
            .setTitle("Case #4 — IN RECESS")
            .addField("choc versus rock", "Punishment Appeal")
            await message.channel.send({
                embeds: [Embed]
            })
        }

        else {
            message.reply("only mezmer420 can use that command! (these messages will autodelete)")
            .then(msg => {
              setTimeout(() => message.delete(), 6000)
              setTimeout(() => msg.delete(), 6000)
            })
            .catch()
        }
    }
}