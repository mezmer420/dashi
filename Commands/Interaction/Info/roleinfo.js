const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Info"

module.exports.data = new SlashCommandBuilder()
	.setName("roleinfo")
	.setDescription("View info about a role")
	.addRoleOption((option) =>
		option
			.setName("role")
			.setDescription("The role to view info of")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const role = interaction.options.getRole("role")

	const displayed = role.hoist === true ? "Yes" : "No"

	const mentionable = role.mentionable === true ? "Yes" : "No"

	const createdTime = new Date(
		role.createdTimestamp + 6 * 3600000
	).toLocaleString()

	const embed = new EmbedBuilder()
		.setColor(defaultColor)
		.addFields(
			{ name: "Role Name", value: `<@&${role.id}>`, inline: true },
			{ name: "Role ID", value: `${role.id}`, inline: true },
			{
				name: "Users in Role",
				value: `${role.members.size}`,
				inline: true,
			}
		)
		.addFields(
			{ name: "Mentionable", value: `${mentionable}`, inline: true },
			{
				name: "Displayed Seperately?",
				value: `${displayed}`,
				inline: true,
			},
			{ name: "Color", value: `${role.hexColor}`, inline: true }
		)
		.setFooter({ text: `Role Creation Date | ${createdTime}` })

	// console.log(role.members)

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
