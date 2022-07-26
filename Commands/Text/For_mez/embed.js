const { EmbedBuilder } = require("discord.js")

module.exports = {
	callback: async (client, message, args) => {
		if (message.author.id !== "527285622809952256") {
			return message
				.reply(
					"Only mezmer420 can use that command! (these messages will autodelete)"
				)
				.catch((err) => {})
				.then((msg) => {
					setTimeout(() => message.delete().catch((err) => {}), 6000)
					setTimeout(() => msg.delete().catch((err) => {}), 6000)
				})
		}

		message.delete().catch((err) => {})

		const Embed = new EmbedBuilder()
			.setColor("#9BDBF5")
			.setTitle("General Update")
			.setDescription("**Music Bot**")
			.addFields({
				name: "dashi now has a music bot feature—it supports YouTube URLs (Hydra doesn't)! Check it out in #song-reqs",
				value: "now some bad news... mezmer sacrificed the cleanliness of his index.js to bring you this feature so he is going to be spending the rest of the day cleaning it up",
			})

		const Embed2 = new EmbedBuilder()
			.setColor("Red")
			.setTitle("Speedy")
			.addFields({
				name: '"what is dashcoin?"',
				value: "🤦‍♂️",
			})

		const Embed3 = new EmbedBuilder()
			.setColor("Green")
			.setTitle("Cookies")
			.addFields({
				name: '"Oh you poor little beggar, take **1** Dashcoin:tm:"',
				value: "1 Dashcoin:tm: Recieved",
			})

		const Embed4 = new EmbedBuilder()
			.setColor("Red")
			.setTitle("Case #4 — choc wins")
			// .setDescription()
			.addFields({
				name: "choc versus rock",
				value: "Punishment Appeal",
			})

		const hydra = await client.users.fetch("547905866255433758")

		const execution = new EmbedBuilder()
			.setColor("Red")
			.setTitle("Execution Underway")
			.setDescription(
				"User: Hydra#1214\nReason: Redundant Bot\nMethod: Electric Chair\nExecutioner: <@826841451945787412>"
			)
			.setThumbnail(`${hydra.displayAvatarURL()}`)
			// .addField("User: Hydra#1214")
			.setTimestamp()

		const musicEmbed = new EmbedBuilder()
			.setAuthor({
				name: "dashi",
				iconURL:
					"https://cdn.discordapp.com/avatars/956345939130482750/e2794eeee75ea31659a17c2de5502bed.webp?size=4096",
			})
			.setColor("#C04BF7")
			.setTitle("🎵 Music System 🎵")
			.setDescription("I can play videos under 12 minutes")
			.addFields({
				name: "Commands",
				value: "`/play song` `/play playlisturl` `/quit` `/queue` `/loop` `/pause` `/resume` `/skip` `/skip-to` `/shuffle` `/filter`",
				inline: false,
			})
			.setFooter({
				text: "Supported platforms for /play song (using a URL):\nYouTube, SoundCloud, Spotify, Facebook, Vimeo",
			})

		message.channel
			.send({
				embeds: [Embed3],
			})
			.catch((err) => {
				console.log(err)
			})
	},
}
