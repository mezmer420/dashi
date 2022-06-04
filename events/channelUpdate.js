const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "channelUpdate",
    async execute(oldChannel, newChannel){
        const logs = await newChannel.client.channels.cache.get("955948174894325782")

        if(oldChannel.name !== newChannel.name){
            const nameEmbed = new MessageEmbed()
            .setTitle("🌼 Channel Update")
            .addField("Channel Name Changed", `**#${oldChannel.name}** -> **#${newChannel.name}**`)
            .setColor("#9BDBF5")
            .setTimestamp()

            logs.send({embeds: [nameEmbed]})
        }

        else if(oldChannel.topic !== newChannel.topic){
            const topicEmbed = new MessageEmbed()
            .setTitle("🌼 Channel Update")
            .addField("Channel Topic Changed", `#${newChannel.name}: **${oldChannel.topic}** -> **${newChannel.topic}**`)
            .setColor("#9BDBF5")
            .setTimestamp()

            logs.send({embeds: [topicEmbed]})
        }

        else if(oldChannel.nsfw !== newChannel.nsfw){
            const nsfwEmbed = new MessageEmbed()
            .setTitle("🌼 Channel Update")
            .addField("Channel NSFW Changed", `#${newChannel.name}: **${oldChannel.nsfw}** -> **${newChannel.nsfw}**`)
            .setColor("#9BDBF5")
            .setTimestamp()

            logs.send({embeds: [nsfwEmbed]})
        }
    }
}