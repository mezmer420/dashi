const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("quit")
	.setDescription("Stops the bot and clears the queue")

module.exports.run = async ({ client, interaction }) => {
	if (interaction.channel.id !== "992630810186367016") {
		return await interaction
			.editReply({
				content:
					"You can only use that command in <#992630810186367016>! (this message will autodelete)",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 6000)
			})
	}

	const queue = client.player.getQueue(interaction.guildId)

	if (!queue) {
		return await interaction
			.editReply({ content: "There are no songs in the queue" })
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	await queue.destroy()

	const responses = [
		"Bye",
		"Bye!",
		"Goodbye",
		"Goodbye!",
		"k cya",
		"Adios amigo",
		"Hasta la vista!",
		"bye bye!",
	]
	const response = responses[Math.floor(Math.random() * responses.length)]

	await interaction
		.editReply({
			content: response,
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 15000)
		})

	// const row = new MessageActionRow().addComponents(
	// 	new MessageButton()
	// 		.setLabel("Confirm")
	// 		.setStyle("PRIMARY")
	// 		.setCustomId(`quit`)
	// )

	// const response = await interaction
	// 	.editReply({
	// 		content:
	// 			"Confirm you wish to clear the queue and stop playing music",
	// 		components: [row],
	// 	})
	// 	.catch((err) => {})

	// setTimeout(() => response.delete().catch((err) => {}), 10500)

	// const filter = (i) => {
	// 	return i.user.id == interaction.user.id
	// }

	// const collector = response.createMessageComponentCollector({
	// 	filter,
	// 	max: 1,
	// 	time: 10000,
	// })

	// collector.on("collect", async (i) => {
	// 	if (i.customId !== `quit`) return

	// 	if (!queue) return

	// 	await queue.destroy()

	// 	await i
	// 		.reply({
	// 			content: "Bye!",
	// 		})
	// 		.catch((err) => {})
	// 		.then((int) => {
	// 			setTimeout(() => int.delete().catch((err) => {}), 10000)
	// 		})
	// })

	// collector.on("end", async (i) => {
	// 	row.components[0].setDisabled(true)

	// 	await response
	// 		.edit({
	// 			components: [row],
	// 		})
	// 		.catch((err) => {})
	// })
}
