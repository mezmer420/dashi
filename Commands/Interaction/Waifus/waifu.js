const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Waifus"

module.exports.data = new SlashCommandBuilder()
	.setName("waifu")
	.setDescription(
		"View your or another user's waifu; leave blank to view your own"
	)
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("User to view the avatar of")
			.setRequired(false)
	)

module.exports.run = async ({ client, interaction, Systems, Waifus }) => {
	const getWaifus = await Systems.findOne({
		where: { system: "Waifus" },
	})

	if (getWaifus.online === false) {
		return await interaction
			.editReply({
				content: "The Waifus system is currently disabled",
			})
			.catch((err) => {})
	}

	const member = interaction.options.getMember("user") || interaction.member

	const getUser = await Waifus.findOne({ where: { id: member.id } })

	if (getUser) {
		const existingWaifu = getUser.waifu

		const response =
			member.id === interaction.member.id
				? `Your waifu is **${existingWaifu}**`
				: `${member.displayName}'s waifu is **${existingWaifu}**`

		return await interaction
			.editReply({
				content: response,
			})
			.catch((err) => {})
	} else if (!getUser) {
		const response =
			member.id === interaction.member.id
				? `You don't have a waifu lol`
				: `${member.nickname} doesn't have a waifu lol`

		return await interaction
			.editReply({
				content: response,
			})
			.catch((err) => {})
	}
}
