const { MessageEmbed } = require("discord.js")

module.exports = {
    callback: async (message, args) => {
        if(message.author.id == "527285622809952256"){
            message.delete()
            const Embed = new MessageEmbed()
            .setColor("#9BDBF5")
            .setTitle("General Update")
            .setDescription('**Music Bot**')
            .addField("dashi now has a music bot feature—it supports YouTube URLs (Hydra doesn't)! Check it out in #song-reqs", "now some bad news... mezmer sacrificed the cleanliness of his index.js to bring you this feature so he is going to be spending the rest of the day cleaning it up")
            await message.channel.send({
                embeds: [Embed]
            })

            // const Embed2 = new MessageEmbed()
            // .setColor("GREEN")
            // .setTitle("Cookies")
            // .addField('"Oh you poor little beggar, take **1** Dashcoin:tm:"', "1 Dashcoin:tm: Recieved")
            // await message.channel.send({
            //     embeds: [Embed2]
            // })

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