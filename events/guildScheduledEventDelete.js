const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildScheduledEventDelete",
    async execute(client, guildScheduledEvent){
        const logs = await client.channels.cache.get("955948174894325782")

        const Embed = new MessageEmbed()
        .setTitle("👋 Event Cancelled")
        .setDescription(`Event Name: **${guildScheduledEvent.name}**`)
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