const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js")
const Sequelize = require("sequelize")

module.exports.data = new SlashCommandBuilder()
	.setName("breakup")
	.setDescription("Break up with your current waifu")

module.exports.category = "Waifus"

module.exports.run = async ({ client, interaction, Waifus, defaultColor }) => {
	const getUser = await Waifus.findOne({
		where: { id: interaction.member.id },
	})

	if (getUser) {
		const existingwaifu = getUser.waifu

		const Embed = new EmbedBuilder()
			.setTitle(
				`Are you sure you want to break up with **${existingwaifu}**?`
			)
			.setColor(defaultColor)

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setLabel("Yes")
				.setStyle("Primary")
				.setCustomId(`breakup`)
		)

		const response = await interaction
			.editReply({
				embeds: [Embed],
				components: [row],
			})
			.catch((err) => {})

		const filter = (i) => {
			return i.user.id === interaction.user.id
		}

		const collector = await response.createMessageComponentCollector({
			filter,
			max: 1,
			time: 10000,
		})

		collector.on("collect", async (i) => {
			const getNewUser = await Waifus.findOne({
				where: { id: interaction.member.id },
			})

			if (!getNewUser) return

			const command = i.customId

			if (command !== `breakup`) return

			const newExistingwaifu = getNewUser.waifu

			await Waifus.destroy(
				{ where: { id: interaction.member.id } },
				{ truncate: true }
			)

			await i
				.reply({
					content: `You broke up with **${newExistingwaifu}**`,
				})
				.catch((err) => {})
		})

		collector.on("end", async (i) => {
			row.components[0].setDisabled(true)

			await response
				.edit({
					components: [row],
				})
				.catch((err) => {})
		})
	} else if (!getUser) {
		return await interaction
			.editReply({
				content: "You don't have a waifu to break up with lol",
			})
			.catch((err) => {})
	}
}
