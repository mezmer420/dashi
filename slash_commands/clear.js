const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("clear")
	.setDescription("Delete specified messages in this channel")
	.addIntegerOption((option) =>
		option
			.setName("number")
			.setDescription("The number of messages to delete")
			.setMinValue(1)
			.setRequired(true)
	)
	.addUserOption((option) =>
		option
			.setName("member")
			.setDescription("Delete a specific member's messages")
			.setRequired(false)
	)

module.exports.run = async ({ client, interaction }) => {
	const number = interaction.options.getInteger("number")
	const member = interaction.options.getMember("member")

	const messages = await interaction.channel.messages.fetch()

	if (member) {
		let i = 0
		const filtered = []
		;(await messages).filter((m) => {
			if (m.author.id == member.id && number > i) {
				filtered.push(m)
				i++
			}
		})

		await interaction.deleteReply().catch((err) => {})

		await interaction.channel.bulkDelete(filtered, true).catch((err) => {
			console.log(err)
			return interaction.channel.send("I couldn't do that")
		})
		// .then((messages) => {
		// 	interaction.channel.send(
		// 		`<@${interaction.member.id}> 🧹 Deleted ${messages.size} messages from ${member}`
		// 	)
		// })
		// .then((msg) => {
		// 	console.log(msg)
		// 	setTimeout(() => msg.delete().catch((err) => {}), 6000)
		// })

		if (number >= 20) {
			// interaction.member
			// 	.send(
			// 		`Warning that you just purged a large number of messages—${number}`
			// 	)
			// 	.catch((err) => {
			// 		console.log(err)
			// 	})

			const logs = await client.channels.cache.get("955948174894325782")

			const warningEmbed = new MessageEmbed()
				.setTitle(`⚠️ Large # of Messages Purged`)
				.setDescription(
					`# Purged: **${number}**\nPurged By: <@${interaction.member.id}>\nChannel: <#${interaction.channel.id}>`
				)
				.setColor("#9BDBF5")
				.setTimestamp()

			logs.send({
				embeds: [warningEmbed],
			}).catch((err) => {
				console.log(err)
			})
		}
	} else if (!member) {
		await interaction.deleteReply().catch((err) => {})

		await interaction.channel.bulkDelete(number, true).catch((err) => {
			console.log(err)
			return interaction.channel.send("I couldn't do that")
		})
		// .then((messages) => {
		// 	interaction.channel.send(
		// 		`<@${interaction.member.id}>🧹 Deleted ${messages.size} messages (this message will autodelete)`
		// 	)
		// })
		// .then((msg) => {
		// 	console.log(msg)
		// 	setTimeout(() => msg.delete().catch((err) => {}), 6000)
		// })

		if (number >= 20) {
			// interaction.member
			// 	.send(
			// 		`Warning that you just purged a large number of messages—${number}`
			// 	)
			// 	.catch((err) => {
			// 		console.log(err)
			// 	})

			const logs = await client.channels.cache.get("955948174894325782")

			const warningEmbed = new MessageEmbed()
				.setTitle(`⚠️ Large # of Messages Purged`)
				.setDescription(
					`# Purged: **${number}**\nPurged By: <@${interaction.member.id}> using ` +
						"`/clear`\n" +
						`Channel: <#${interaction.channel.id}>`
				)
				.setColor("#9BDBF5")
				.setTimestamp()

			logs.send({
				embeds: [warningEmbed],
			}).catch((err) => {
				console.log(err)
			})
		}
	}
}
