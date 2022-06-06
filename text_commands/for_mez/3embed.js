const { MessageEmbed } = require("discord.js")

module.exports = {
    callback: async (message, args) => {
        if(message.author.id == "527285622809952256"){
            message.delete()
            const Embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Speedy")
            .addField('"what is dashcoin?"', "🤦‍♂️")
            await message.channel.send({
                embeds: [Embed]
            })

            // const Embed = new MessageEmbed()
            // .setColor("RED")
            // .setTitle("Case #4 — choc wins")
            // .setDescription
            // .addField("choc versus rock", "Punishment Appeal")
            // await message.channel.send({
            //     embeds: [Embed]
            // })
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