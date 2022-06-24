const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("pause")
.setDescription("Pause the music")

module.exports.run = async ({client, interaction}) => {
	const queue = client.player.getQueue(interaction.guildId)

	if(!queue){
		return await interaction.editReply({content: "There are no songs in the queue"})
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

	queue.setPaused(true)
	
	await interaction.editReply({content: "Music has been paused! Use `/resume` to resume the music"})
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