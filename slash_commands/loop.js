const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueueRepeatMode } = require("discord-player")

module.exports.data = new SlashCommandBuilder()
	.setName("loop")
	.setDescription("Set loop mode")
	.addIntegerOption((option) =>
		option
			.setName("mode")
			.setDescription("The loop type")
			.setRequired(true)
			.addChoices(
				{ name: "Off", value: QueueRepeatMode.OFF },
				{ name: "Track", value: QueueRepeatMode.TRACK },
				{ name: "Queue", value: QueueRepeatMode.QUEUE },
				{ name: "Autoplay", value: QueueRepeatMode.AUTOPLAY }
			)
	)

module.exports.run = async ({ client, interaction }) => {
	if (interaction.channel.id !== "992630810186367016") {
		return await interaction
			.editReply({
				content:
					"You can only use that command in <#992630810186367016>! (this message will autodelete)",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 6000)
			})
	}

	const queue = client.player.getQueue(interaction.guildId)

	if (!queue) {
		return await interaction
			.editReply({
				content: "There are no songs in the queue",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	const loopMode = interaction.options.get("mode").value

	const success = await queue.setRepeatMode(loopMode)

	const mode =
		loopMode == QueueRepeatMode.TRACK
			? "🔂"
			: loopMode == QueueRepeatMode.QUEUE
			? "🔁"
			: "▶"

	await interaction
		.editReply({
			content: success
				? `${mode} | Updated loop mode`
				: "Hm,  I couldn't update the loop mode... maybe it's already set to what you selected",
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 10000)
		})
}
