const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("quit")
	.setDescription("Stops the music bot and clears the queue")

module.exports.run = async ({ client, interaction, Systems }) => {
	const getMusic = await Systems.findOne({
		where: { system: "Music" },
	})

	if (getMusic.online === false) {
		return await interaction
			.editReply({
				content: "The Music system is currently disabled",
			})
			.catch((err) => {})
	}

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

	const queue = await client.distube.getQueue(interaction.guildId)

	if (!queue) {
		return await interaction
			.editReply({ content: "There is nothing in the queue" })
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	await queue.stop()

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

	// const row = new ActionRowBuilder().addComponents(
	// 	new ButtonBuilder()
	// 		.setLabel("Confirm")
	// 		.setStyle("Primary")
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
	// 	return i.user.id === interaction.user.id
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
