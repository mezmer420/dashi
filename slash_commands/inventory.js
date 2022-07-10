const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

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

module.exports.run = async ({ client, interaction, Items }) => {
	const member = interaction.options.getMember("user") || interaction.member

	const data = await Items.findAll({ where: { memberid: member.id } })

	let items = []

	for (let obj of data) {
		items.push(obj)
	}

	const Embed = new MessageEmbed()
		.setColor("#9BDBF5")
		.setTitle(`${member.displayName}'s Inventory`)
		.setThumbnail(member.user.avatarURL())

	items = items.sort(function (b, a) {
		return b.itemid - a.itemid
	})

	let desc = ""

	for (let i = 0; i < items.length; i++) {
		const itemname = items[i].item

		desc += `**${itemname}**\n`
	}

	Embed.setDescription(desc)

	if (Embed.description == "") {
		return await interaction
			.editReply({
				embeds: [
					new MessageEmbed()
						.setColor("#9BDBF5")
						.setTitle(`${member.displayName}'s Inventory`)
						.setDescription(`Nothing but empty in here`)
						.setThumbnail(member.user.avatarURL()),
				],
			})
			.catch((err) => {})
	}

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
