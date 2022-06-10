const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.data = new SlashCommandBuilder()
.setName("skipto")
.setDescription("Skips to a certain track #")
.addNumberOption((option) => option
    .setName("tracknumber")
    .setDescription("The track to skip to")
    .setMinValue(1)
    .setRequired(true)
)

module.exports.run = async ({client, interaction}) => {
    const queue = client.player.getQueue(interaction.guildId)

    if(!queue) return await interaction.editReply({
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

    const trackNum = interaction.options.getNumber("tracknumber")

    if(trackNum > queue.tracks.length) return await interaction.editReply({
        content: "Invalid track number"
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

    queue.skipTo(trackNum - 1)

    await interaction.editReply({
        content: `Skipped ahead to track number ${trackNum}`
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