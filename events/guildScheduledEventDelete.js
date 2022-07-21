const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "guildScheduledEventDelete",
    async execute(client, guildScheduledEvent, defaultColor){
        const logs = await client.channels.cache.get("955948174894325782")
        const anno = await client.channels.cache.get("946442711936938034")

        const Embed = new EmbedBuilder()
        .setTitle("❌ Event Cancelled")
        .setDescription(`Event Name: **${guildScheduledEvent.name}**`)
        .setColor(defaultColor)
        .setTimestamp()

        logs.send({
            embeds: [Embed]
        })
        .catch((err) => {
            console.log(err)
        })

        // anno.send({
		// 	embeds: [Embed],
		// }).catch((err) => {
		// 	console.log(err)
		// })
    }
}