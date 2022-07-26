const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")

const openticketid = "982689993195667527"

module.exports = {
	callback: async (client, message, args) => {
		if (message.author.id !== "527285622809952256") {
			return message
				.reply(
					"Only mezmer420 can use that command! (these messages will autodelete)"
				)
				.catch((err) => {})
				.then((msg) => {
					setTimeout(() => message.delete().catch((err) => {}), 6000)
					setTimeout(() => msg.delete().catch((err) => {}), 6000)
				})
		}

		const { guild } = interaction

		const Embed = new EmbedBuilder()
			.setColor(defaultColor)
			.setAuthor({
				name: "Tickets 🎫",
				iconURL: guild.iconURL({ size: 4096, dynamic: true }),
			})
			.setDescription(
				"Click a button below to open a ticket and personally discuss an issue with the Government"
			)
			.addFields(
				{
					name: "User Report",
					value: "For ~~snitching~~ informing us of someone who violated the law as outlined in the Constitution",
					inline: true,
				},
				{
					name: "Bug Report",
					value: "For informing us a bug you are aware of with one of our bots",
					inline: true,
				},
				{
					name: "Other Report",
					value: "Select this option if the issue is something else",
					inline: true,
				}
			)

		const Buttons = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("reportuser")
				.setLabel("User Report")
				.setStyle("Primary")
				.setEmoji("👮"),

			new ButtonBuilder()
				.setCustomId("reportbug")
				.setLabel("Bug Report")
				.setStyle("Success")
				.setEmoji("🐛"),

			new ButtonBuilder()
				.setCustomId("reportother")
				.setLabel("Other Report")
				.setStyle("Secondary")
				.setEmoji("❓")
		)

		await guild.channels.cache
			.get(openticketid)
			.send({
				embeds: [Embed],
				components: [Buttons],
			})
			.catch((err) => {
				console.log(err)
			})
	},
}
