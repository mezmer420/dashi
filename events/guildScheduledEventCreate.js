const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildScheduledEventCreate",
    async execute(guildScheduledEvent){
        const logs = await guildScheduledEvent.client.channels.cache.get("955948174894325782")

        // const startts = new Date(guildScheduledEvent.scheduledStartTimestamp)
        // const endts = new Date(guildScheduledEvent.scheduledEndTimestamp)

        // const starttime = startts.toLocaleString()
        // const endtime = endts.toLocaleString()

        const Embed = new MessageEmbed()
        .setTitle("🎉 New Event")
        .setDescription(`Event Name: **${guildScheduledEvent.name}**\nCreated By: **${guildScheduledEvent.creator.tag}**`)
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