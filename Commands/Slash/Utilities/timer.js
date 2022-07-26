const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("timer")
	.setDescription("Set a timer")
	.addIntegerOption((option) =>
		option
			.setName("seconds")
			.setDescription("The time in seconds")
			.setMinValue(1)
			.setMaxValue(86400)
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("reminder")
			.setDescription("What to remind you about")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const time = interaction.options.getInteger("seconds")
	const subject = interaction.options.getString("reminder")
	const milliseconds = time * 1000

	const createdEmbed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle("Timer Set")
		.setAuthor({
			name: `${interaction.member.user.tag}'s Timer ⏱️`,
			iconURL: interaction.member.displayAvatarURL({
				size: 4096,
				dynamic: true,
			}),
		})
		.setDescription(
			`In **${time} seconds**, I will remind you about **${subject}**`
		)
		.setTimestamp()

	const doneEmbed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle("Timer Up!")
		.setAuthor({
			name: `${interaction.member.user.tag}'s Timer ⏱️`,
			iconURL: interaction.member.displayAvatarURL({
				size: 4096,
				dynamic: true,
			}),
		})
		.setDescription(`**${subject}**\nTime set: **${time} seconds**`)
		.setTimestamp()

	await interaction.editReply({
		embeds: [createdEmbed],
	})

	setTimeout(async () => {
		await interaction
			.editReply({
				embeds: [doneEmbed],
			})
			.catch((err) => {
				return
			})
		interaction.member.send(
			`<@${interaction.member.id}> The timer you set **${time} seconds** ago is up! Reminder: **${subject}**`
		)
	}, milliseconds)
}
