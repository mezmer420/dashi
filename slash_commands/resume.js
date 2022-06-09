const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("resume")
.setDescription("Resumes the music")

module.exports.run = async ({client, interaction}) => {
	const queue = client.player.getQueue(interaction.guildId)

	if(!queue) return await interaction.editReply({content: "There are no songs in the queue"})
	.catch((err) => {
		return
	})
	.then(interaction => {
		setTimeout(() => interaction.delete()
		.catch((err) => {
			return
		}), 10000)
	})

	queue.setPaused(false)

	await interaction.editReply({content: "Music has been resumed! Use `/pause` to pause the music"})
	.catch((err) => {
		return
	})
	.then(interaction => {
		setTimeout(() => interaction.delete()
		.catch((err) => {
			return
		}), 30000)
	})
}