const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("inventory")
	.setDescription(
		"View the inventory of yourself or another user; leave blank to view your own inventory"
	)
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("User to check the balance of")
			.setRequired(false)
	)

module.exports.run = async ({
	client,
	interaction,
	Systems,
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

	const member = interaction.options.getMember("user") || interaction.member

	const data = await Items.findAll({ where: { memberid: member.id } })

	let items = []

	for (let obj of data) {
		items.push(obj)
	}

	const Embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle(`${member.displayName}'s Inventory`)
		.setThumbnail(
			member.user.displayAvatarURL({ size: 4096, dynamic: true })
		)

	items = items.sort(function (b, a) {
		return b.itemid - a.itemid
	})

	let desc = ""

	for (let i = 0; i < items.length; i++) {
		const itemname = items[i].item

		desc += `**${itemname}**\n`
	}

	if (!desc) {
		return await interaction
			.editReply({
				embeds: [
					new EmbedBuilder()
						.setColor(defaultColor)
						.setTitle(`${member.displayName}'s Inventory`)
						.setDescription(`Nothing but empty in here`)
						.setThumbnail(
							member.user.displayAvatarURL({
								size: 4096,
								dynamic: true,
							})
						),
				],
			})
			.catch((err) => {})
	}

	Embed.setDescription(desc)

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
