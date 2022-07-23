const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("loop")
	.setDescription("Set loop mode")
	.addIntegerOption((option) =>
		option
			.setName("mode")
			.setDescription("The loop type")
			.setRequired(true)
			.addChoices(
				{ name: "Off", value: 0 },
				{ name: "Song", value: 1 },
				{ name: "Queue", value: 2 }
			)
	)

module.exports.run = async ({ client, interaction, Systems }) => {
	const getMusic = await Systems.findOne({
		where: { system: "Music" },
	})

	if (getMusic.online === false) {
		return await interaction
			.editReply({
				content: "The Music system is currently disabled",
			})
			.catch((err) => {})
	}

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

	const queue = await client.distube.getQueue(interaction.guildId)

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

	const input = interaction.options.getInteger("mode")

	let loopMode = await queue.setRepeatMode(input)

	loopMode = loopMode
		? loopMode === 2
			? "Repeat queue"
			: "Repeat song"
		: "Off"

	return await interaction
		.editReply({
			content: `🔁 | Set loop mode to \`${loopMode}\``,
		})
		.catch((err) => {})
		.then((interaction) => {
			setTimeout(() => interaction.delete().catch((err) => {}), 10000)
		})

	// const mode =
	// 	loopMode === QueueRepeatMode.TRACK
	// 		? "🔂"
	// 		: loopMode === QueueRepeatMode.QUEUE
	// 		? "🔁"
	// 		: "▶"

	// await interaction
	// 	.editReply({
	// 		content: success
	// 			? `${mode} | Updated loop mode`
	// 			: "Hm,  I couldn't update the loop mode... maybe it's already set to what you selected",
	// 	})
	// 	.catch((err) => {})
	// 	.then((interaction) => {
	// 		setTimeout(() => interaction.delete().catch((err) => {}), 10000)
	// 	})
}
