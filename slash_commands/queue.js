const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
.setName("queue")
.setDescription("Displays the current song queue and displays info about the currently playing song")
.addNumberOption((option) => option
    .setName("page")
    .setDescription("Page number of the queue")
    .setMinValue(1)
)

module.exports.run = async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guildId)
    
    if(!queue || !queue.playing) return await interaction.editReply({content: "There are no songs in the queue"})
    .catch((err) => {
        return
    })

    const totalPages = Math.ceil(queue.tracks.length / 10) || 1
    const page = (interaction.options.getNumber("page") || 1) - 1

    if(page > totalPages) return await interaction.editReply({content: `Invalid Page. There are only a total of ${totalPages} pages of songs`})
    .catch((err) => {
        return
    })
    
    const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
        return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
    }).join("\n")

    let bar = queue.createProgressBar({
		queue: false,
		length: 19
	})

    const currentSong = queue.current

    await interaction.editReply({
        embeds: [
            new MessageEmbed()
                .setDescription(`**Currently Playing**\n` + 
                (currentSong ? `\`[${currentSong.duration}]\` [${currentSong.title}](${currentSong.url})\n\n${bar}\nRequested by <@${currentSong.requestedBy.id}>` : "None") +
                `\n\n**Queue**\n${queueString}`
                )
                .setThumbnail(currentSong.thumbnail)
                .setFooter({
                    text: `Page ${page + 1} of ${totalPages}`
                })
                .setThumbnail(currentSong.setThumbnail)
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