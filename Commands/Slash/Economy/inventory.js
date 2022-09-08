const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const sequelize = require("sequelize")

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

module.exports.category = "Economy"

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

	const onetimeitemsdata = await Items.findAll({
		where: { memberid: member.id, itemid: { [sequelize.Op.not]: "101" } },
	})

	let onetimeitems = []

	for (let obj of onetimeitemsdata) {
		onetimeitems.push(obj)
	}

	const Embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle(`${member.displayName}'s Inventory`)
		.setThumbnail(
			member.user.displayAvatarURL({ size: 4096, dynamic: true })
		)

	onetimeitems = onetimeitems.sort(function (b, a) {
		return b.itemid - a.itemid
	})

	let desc = ""

	for (let i = 0; i < onetimeitems.length; i++) {
		const itemname = onetimeitems[i].item

		desc += `**${itemname}**\n`
	}

	// const stockableitemsdata = await Items.findAll({
	// 	where: { memberid: member.id, itemid: "101" },
	// })

	// let stockableitems = []

	// for (let obj of stockableitemsdata) {
	// 	stockableitems.push(obj)
	// }

	// if (stockableitems.length > 0) {
	// 	desc += `**Birth Control Pills** \`x${stockableitems.length}\``
	// }

	// stockableitems = stockableitems.sort(function (b, a) {
	// 	return b.itemid - a.itemid
	// })

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
