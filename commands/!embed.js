const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "!embed",
    description: "send embed (only i can use), can be used in any channel",
    execute(message){
        if(message.author.id == "527285622809952256"){
            message.delete()
            const Embed = new MessageEmbed()
            .setColor("#9BDBF5")
            .setTitle("Case #4 — IN RECESS")
            .addField("choc versus rock", "Punishment Appeal")
            return message.channel.send({
                embeds: [Embed]
            })
        }

        // response to non-me who try to use !embed
        if(message.author.id == "527285622809952256") return
            message.reply("only mezmer420 can use that command! (these messages will autodelete)")
            .then(msg => {
              setTimeout(() => message.delete(), 6000)
              setTimeout(() => msg.delete(), 6000)
            })
            .catch()
    }
}