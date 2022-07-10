const { MessageEmbed } = require("discord.js")

module.exports = {
	callback: async (client, message, args) => {
		if (message.author.id !== "527285622809952256") {
			message
				.reply(
					"Only mezmer420 can use that command! (these messages will autodelete)"
				)
				.catch((err) => {})
				.then((msg) => {
					setTimeout(() => message.delete().catch((err) => {}), 6000)
					if (msg) {
						setTimeout(() => msg.delete().catch((err) => {}), 6000)
					}
				})
		}

		message.delete().catch((err) => {})

		const hydra = await client.users.fetch("547905866255433758")

		const concluded = new MessageEmbed()
			.setColor("RED")
			.setTitle("Execution Concluded")
			.setDescription(
				"User: Hydra#1214\nReason: Redundant Bot\nMethod: Electric Chair\nExecutioner: <@826841451945787412>\nTime of Death: 2354 EST"
			)
			// .setThumbnail(`https://imgur.com/a/4E2x5KB`)
			.setTimestamp()

		message.channel
			.send({
				embeds: [concluded],
			})
			.catch((err) => {
				console.log(err)
			})
	},
}
