const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

function RandArray(array) {
	var rand = (Math.random() * array.length) | 0
	var rValue = array[rand]
	return rValue
}

module.exports.data = new SlashCommandBuilder()
	.setName("yuri")
	.setDescription("Gives a random Yuri!")

module.exports.run = async ({ client, interaction, Systems, Waifus }) => {
	const getWaifus = await Systems.findOne({
		where: { system: "Waifus" },
	})

	if (getWaifus.online === false) {
		return await interaction
			.editReply({
				content: "The Waifus system is currently disabled",
			})
			.catch((err) => {})
	}

	const yuris = [
		"Yuri1",
		"Yuri2",
		"Yuri3",
		"Yuri4",
		"Yuri5",
		"Yuri6",
		"Yuri7",
		"Yuri8",
		"Yuri9",
		"Yuri10",
		"Yuri11",
		"Yuri12",
		"Yuri13",
		"Yuri14",
		"Yuri15",
		"Yuri16",
		"Yuri17",
		"Yuri18",
		"Yuri19",
		"Yuri20",
	]
	const randomyuri = RandArray(yuris)

	const Embed = new EmbedBuilder()

	if (randomyuri === "Yuri1") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://i.pinimg.com/originals/f1/57/56/f157565faa42f556df9baa2b1063bde9.jpg"
			)
	} else if (randomyuri === "Yuri2") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9f1a633b-231d-4b77-9c14-5ce67d4f0917/dby7b7r-32eeabbd-0bb3-4c82-8790-89258f5e31f6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlmMWE2MzNiLTIzMWQtNGI3Ny05YzE0LTVjZTY3ZDRmMDkxN1wvZGJ5N2I3ci0zMmVlYWJiZC0wYmIzLTRjODItODc5MC04OTI1OGY1ZTMxZjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2EwAYyQ9l_06CzOTGD3EVlxok7AKpW9NLroKsPo_z_I"
			)
	} else if (randomyuri === "Yuri3") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://64.media.tumblr.com/cdbdd58ab338d108a74852a5c0ad4945/2610ac1947e38872-ed/s1280x1920/1d5cec054acb8275665b7e5b7db30b806236127b.jpg"
			)
	} else if (randomyuri === "Yuri4") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://www.kindpng.com/picc/m/325-3250080_yuri-cute-yuri-doki-doki-hd-png-download.png"
			)
	} else if (randomyuri === "Yuri5") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"http://pm1.narvii.com/7301/859efdbf1823f2a9c8f90a7e36b2c0f482f5672fr1-500-500v2_00.jpg"
			)
	} else if (randomyuri === "Yuri6") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage("https://pbs.twimg.com/media/EQGnPoSWAAEnf2E.jpg:large")
	} else if (randomyuri === "Yuri7") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://i.pinimg.com/originals/07/4c/73/074c73d545dc8039aa3049527f69875c.jpg"
			)
	} else if (randomyuri === "Yuri8") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://i.pinimg.com/originals/ca/dc/92/cadc92995ad6fa4592d72036518ca3d7.png"
			)
	} else if (randomyuri === "Yuri9") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://w0.peakpx.com/wallpaper/250/486/HD-wallpaper-video-game-doki-doki-literature-club-girl-purple-eyes-yuri-doki-doki-literature-club.jpg"
			)
	} else if (randomyuri === "Yuri10") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://i.pinimg.com/736x/1b/cd/6f/1bcd6f453c9a56150ec843b8032bc094.jpg"
			)
	} else if (randomyuri === "Yuri11") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://pbs.twimg.com/media/EzKz2a3VgAox0_j?format=jpg&name=4096x4096"
			)
	} else if (randomyuri === "Yuri12") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage("https://pbs.twimg.com/media/E_b9pv4XIAYY5BG.jpg:large")
	} else if (randomyuri === "Yuri13") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://sun9-3.userapi.com/s/v1/ig1/ya2hlCsURQmmpUy4R8o_Q3gA2Uou_tAlCsAYC7NOHueTZcmzm0ytL9I2It_fMEp5jjFiUf4o.jpg?size=430x604&quality=96&type=album"
			)
	} else if (randomyuri === "Yuri14") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://i.pinimg.com/originals/fb/75/cf/fb75cf65b60763c66283446c97324e8f.jpg"
			)
	} else if (randomyuri === "Yuri15") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://static.zerochan.net/Yuri.%28Doki.Doki.Literature.Club%21%29.full.3384849.png"
			)
	} else if (randomyuri === "Yuri16") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://www.seekpng.com/png/small/134-1347813_doki-doki-literature-club-yuri-ddlc-yuri.png"
			)
	} else if (randomyuri === "Yuri17") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://preview.redd.it/mc8x7j0cg2d71.jpg?auto=webp&s=4c3186b657d2b77b2be6284ebca546ede0c4295d"
			)
	} else if (randomyuri === "Yuri18") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://pbs.twimg.com/media/Eymj8oWXEAEn9hP?format=jpg&name=4096x4096"
			)
	} else if (randomyuri === "Yuri19") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage("https://cdn140.picsart.com/271169818025211.png")
	} else if (randomyuri === "Yuri20") {
		Embed.setColor("#A020F0")
			.setTitle("Yuri")
			.setDescription("Doki Doki Literature Club!")
			.setImage(
				"https://pbs.twimg.com/media/E8u5LohVkAEgyuz?format=jpg&name=4096x4096"
			)
	}

	const sentInteraction = await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})

	sentInteraction.react("❤️").catch((err) => {})

	const filter = (reaction, user) => {
		return reaction.emoji.name === "❤️" && user.id === interaction.member.id
	}

	const collector = await sentInteraction.createReactionCollector({
		filter,
		max: 1,
		time: 20000,
	})

	collector.on("collect", async (reaction) => {
		const getUser = await Waifus.findOne({
			where: { id: interaction.member.id },
		})

		if (!getUser) {
			await Waifus.create({
				id: interaction.member.id,
				waifu: randomyuri,
			})

			return await interaction
				.editReply({
					content: `Aww, your new waifu is **${randomyuri}**!`,
				})
				.catch((err) => {})
		} else if (getUser) {
			const existingwaifu = getUser.waifu

			return await interaction
				.editReply({
					content:
						`You already have a waifu—**${existingwaifu}**! Use ` +
						"`/breakup`" +
						` to break up with ${existingwaifu}`,
				})
				.catch((err) => {})
		}

		// console.log(
		// 	`${interaction.member.username} collected a new ${reaction.emoji.name} reaction`
		// )
	})

	collector.on("end", (collected, reason) => {
		return

		// if (reason === "limit") return console.log("limit reached")
		// else {
		// 	console.log("time expired")
		// }
	})
}
