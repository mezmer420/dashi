const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("discard")
	.setDescription("Discard unsellable items you own")
	.addStringOption((option) =>
		option
			.setName("item")
			.setDescription("The item to discard")
			.setRequired(true)
			.addChoices({
				name: "Birth Control Pills",
				value: "Birth Control Pills",
			})
	)

module.exports.category = "Economy"

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Economy,
	Items,
	defaultColor,
}) => {
	const getEconomy = await Systems.findOne({
		where: { system: "Economy" },
	})

	if (getEconomy.online === false) {
		return await interaction
			.editReply({
				content: "The Economy system is currently disabled",
			})
			.catch((err) => {})
	}

	const item = interaction.options.getString("item")

	let getUser = await Economy.findOne({
		where: { id: interaction.member.id },
	})

	if (!getUser) {
		getUser = await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		})
	}

	const findItem = await Items.findOne({
		where: { memberid: interaction.member.id, item: item },
	})

	const itemLowercase = item.toLowerCase()

	if (!findItem) {
		return await interaction
			.editReply({
				content: `You don't have any **${itemLowercase}**!`,
			})
			.catch((err) => {})
	}

	await findItem.destroy()

	const Embed = new EmbedBuilder()
		.setDescription(`You just discarded \`1x\` **${itemLowercase}**`)
		.setColor(defaultColor)
		.setThumbnail(
			interaction.member.user.displayAvatarURL({
				size: 4096,
				dynamic: true,
			})
		)

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
