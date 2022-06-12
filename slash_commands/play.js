const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports.data = new SlashCommandBuilder()
.setName("play")
.setDescription("Loads songs from YouTube")
.addSubcommand((subcommand) => subcommand
        .setName("url")
        .setDescription("Loads a single song from a URL")
        .addStringOption((option) => option
            .setName("url")
            .setDescription("The song's URL")
            .setRequired(true)
        )
)
.addSubcommand((subcommand) => subcommand
        .setName("playlist")
        .setDescription("Loads a playlist of songs from a URL")
        .addStringOption((option) => option
            .setName("url")
            .setDescription("The playlist's URL")
            .setRequired(true)
        )
)
.addSubcommand((subcommand) => subcommand
        .setName("search")
        .setDescription("Searches for song based on provided keywords")
        .addStringOption((option) => option
            .setName("searchterms")
            .setDescription("The search keywords")
            .setRequired(true)
        )
)

module.exports.run = async ({client, interaction}) => {
    const url = interaction.options.getString("url")
    const searchterms = interaction.options.getString("searchterms")

    if(!interaction.member.voice.channel) return await interaction.editReply({content: "You need to be in a VC to use this command"})
    .catch((err) => {
        return
    })
	.then(interaction => {
		setTimeout(() => interaction.delete()
		.catch((err) => {
			return
		}), 10000)
	})

    const queue = await client.player.createQueue(interaction.guild)

    if(!queue.connection){
        await queue.connect(interaction.member.voice.channel)
    }

    let embed = new MessageEmbed()

    if(interaction.options.getSubcommand() == "url"){
        const result = await client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.YOUTUBE_VIDEO
        })
        
        if(result.tracks.length == 0) return await interaction.editReply({content: "No results"})
        .catch((err) => {
            return
        })
        .then(interaction => {
            setTimeout(() => interaction.delete()
            .catch((err) => {
                return
            }), 10000)
        })
        
        const song = result.tracks[0]

        await queue.addTrack(song)

        embed
            .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Duration: ${song.duration}`})
    }
    
    else if(interaction.options.getSubcommand() == "playlist"){
        const result = await client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.YOUTUBE_PLAYLIST
        })

        if(result.tracks.length == 0) return await interaction.editReply({content: "No results"})
        .catch((err) => {
            return
        })
        .then(interaction => {
            setTimeout(() => interaction.delete()
            .catch((err) => {
                return
            }), 10000)
        })
        
        const playlist = result.playlist

        await queue.addTracks(result.tracks)

        embed
            .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
            .setThumbnail(playlist.thumbnail)

    }
    
    else if(interaction.options.getSubcommand() == "search"){
        const result = await client.player.search(searchterms, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })

        if(result.tracks.length == 0) return await interaction.editReply({content: "No results"})
        .catch((err) => {
            return
        })
        .then(interaction => {
            setTimeout(() => interaction.delete()
            .catch((err) => {
                return
            }), 10000)
        })
        
        const song = result.tracks[0]

        await queue.addTrack(song)
        
        embed
            .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Duration: ${song.duration}`})
    }

    if(!queue.playing) await queue.play()

    await interaction.editReply({
        embeds: [embed]
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