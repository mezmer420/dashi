const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "channelCreate",
    async execute(channel){
        const logs = await channel.client.channels.cache.get("955948174894325782")

        const Embed = new MessageEmbed()
        .setTitle("🆕 Channel Created")
        .setDescription(`Channel Name: **#${channel.name}**\nID: **${channel.id}**\nType: **${channel.type}**\nNSFW: **${channel.nsfw}**`)
        .setColor("#9BDBF5")
        .setTimestamp()

        logs.send({
            embeds: [Embed]
        })
        .catch((err) => {
            console.log(err)
            return
        })
    }
}