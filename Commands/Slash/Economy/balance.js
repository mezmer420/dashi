const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("balance")
	.setDescription("Check the balance of yourself or another user")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription(
				"User to check the balance of; skip to view your own balance"
			)
			.setRequired(false)
	)

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Economy,
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

	const member = interaction.options.getMember("user") || interaction.member
	let getUser = await Economy.findOne({ where: { id: member.id } })

	if (!getUser) {
		getUser = await Economy.create({ id: member.id, wallet: 0, bank: 0 })
	}

	const Embed = new EmbedBuilder()
		.setTitle(`💰 ${member.displayName}'s Balance`)
		.setDescription(
			`**Wallet:** \`${getUser.wallet}\` Dashcoins:tm:\n**Bank:** \`${getUser.bank}\` Dashcoins:tm:\n——————————\n**Net:** \`${getUser.wallet + getUser.bank}\` Dashcoins:tm:`
		)
		.setColor(defaultColor)
		.setThumbnail(
			member.user.displayAvatarURL({ size: 4096, dynamic: true })
		)

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
