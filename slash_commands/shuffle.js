const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("shuffle")
.setDescription("Shuffles the queue")

module.exports.run = async ({client, interaction}) => {
	const queue = client.player.getQueue(interaction.guildId)

	if(!queue){
		return await interaction.editReply({
			content: "There are no songs in the queue"
		})
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

	queue.shuffle()

	await interaction.editReply({
		content: `The queue of ${queue.tracks.length} songs have been shuffled!`
	})
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