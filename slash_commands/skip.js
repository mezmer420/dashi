const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("skip")
.setDescription("Skips the current song")

module.exports.run = async (client, interaction) => {
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

    const currentSong = queue.current

    queue.skip()

    await interaction.editReply({
        embeds: [
            new MessageEmbed()
            .setDescription(`${currentSong.title} has been skipped!`)
            .setThumbnail(currentSong.thumbnail)
        ]
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