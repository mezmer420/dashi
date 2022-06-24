const { MessageEmbed } = require("discord.js")

module.exports = {
    callback: async (client, message, args) => {
        if(message.author.id == "527285622809952256"){
            message.delete()
            .catch((err) => {
                return
            })

            const Embed = new MessageEmbed()
            .setColor("#9BDBF5")
            .setTitle("General Update")
            .setDescription('**Music Bot**')
            .addField("dashi now has a music bot feature—it supports YouTube URLs (Hydra doesn't)! Check it out in #song-reqs", "now some bad news... mezmer sacrificed the cleanliness of his index.js to bring you this feature so he is going to be spending the rest of the day cleaning it up")

            const Embed2 = new MessageEmbed()
            .setColor("RED")
            .setTitle("Speedy")
            .addField('"what is dashcoin?"', "🤦‍♂️")

            const Embed3 = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Cookies")
            .addField('"Oh you poor little beggar, take **1** Dashcoin:tm:"', "1 Dashcoin:tm: Recieved")

            const Embed4 = new MessageEmbed()
            .setColor("RED")
            .setTitle("Case #4 — choc wins")
            // .setDescription()
            .addField("choc versus rock", "Punishment Appeal")

            const hydra = await client.users.fetch("547905866255433758")

            const execution = new MessageEmbed()
            .setColor("RED")
            .setTitle("Execution Underway")
            .setDescription("User: Hydra#1214\nReason: Redundant Bot\nMethod: Electric Chair\nExecutioner: <@826841451945787412>")
            .setThumbnail(`${hydra.displayAvatarURL()}`)
            // .addField("User: Hydra#1214")
            .setTimestamp()

            const musicEmbed = new MessageEmbed()
            .setAuthor({name: "dashi", iconURL: "https://cdn.discordapp.com/avatars/956345939130482750/e2794eeee75ea31659a17c2de5502bed.webp?size=4096"})
            .setColor("#9BDBF5")
            .setTitle("🎵 YouTube Music System 🎵")
            .setDescription("I can play any YouTube video under 12 minutes")
            .addField("Commands", "```/play songurl   /play playlisturl   /play search\n\n/queue        /quit        /pause        /resume\n\n/skip             /skip-to             /shuffle```")
            // .addField("Commands", "```/play url\n\n/play playlist\n\n/play search\n\n/queue\n\n/quit\n\n/pause\n\n/resume\n\n/skip\n\n/skipto\n\n/shuffle```")

            message.channel.send({
                embeds: [execution]
            })
            .catch((err) => {
                return console.log(err)
            })
        }

        else {
            message.reply("only mezmer420 can use that command! (these messages will autodelete)")
            .catch((err) => {
                return
            })
            .then(msg => {
                setTimeout(() => message.delete()
                .catch((err) => {
                    return
                }), 6000)
                if(msg){
                    setTimeout(() => msg.delete()
                    .catch((err) => {
                        return
                    }), 6000)
                }
              })
        }
    }
}