const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("quit")
.setDescription("Stops the bot and clears the queue")

module.exports.run = async (client, interaction) => {
	const queue = client.player.getQueue(interaction.guildId)

	if (!queue) return await interaction.editReply({content: "There are no songs in the queue"})
	.catch((err) => {
		return
	})
	.then(interaction => {
		setTimeout(() => interaction.delete()
		.catch((err) => {
			return
		}), 10000)
	})

	queue.destroy()

	await interaction.editReply({content: "Bye!"})
	.catch((err) => {
		return
	})
	.then(interaction => {
		setTimeout(() => interaction.delete()
		.catch((err) => {
			return
		}), 10000)
	})
}