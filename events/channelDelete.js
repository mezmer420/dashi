const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "channelDelete",
    async execute(channel){
        const logs = await channel.client.channels.cache.get("955948174894325782")

        const Embed = new MessageEmbed()
        .setTitle("👋 Channel Deleted")
        .setDescription(`Name: **#${channel.name}**`)
        .setColor("#9BDBF5")
        .setTimestamp()

        logs.send({embeds: [Embed]})
    }
}