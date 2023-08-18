const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const sequelize = require("sequelize")

module.exports.category = "Economy"

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

	const oneTimeItemsData = await Items.findAll({
		where: { memberid: member.id, itemid: { [sequelize.Op.not]: "101" } },
	})

	let oneTimeItems = []

	for (let obj of oneTimeItemsData) {
		oneTimeItems.push(obj)
	}

	const embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle(`${member.displayName}'s Inventory`)
		.setThumbnail(
			member.user.displayAvatarURL({ size: 4096, dynamic: true })
		)

	oneTimeItems = oneTimeItems.sort(function (b, a) {
		return b.itemid - a.itemid
	})

	let desc = ""

	for (let i = 0; i < oneTimeItems.length; i++) {
		const itemName = oneTimeItems[i].item

		desc += `**${itemName}**\n`
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

	embed.setDescription(desc)

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
