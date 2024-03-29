const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Waifus"

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

	const yuri = yuris[Math.floor(Math.random() * yuris.length)]

	const embed = new EmbedBuilder()
		.setColor("#A020F0")
		.setTitle("Yuri")
		.setDescription("Doki Doki Literature Club!")

	switch (yuri) {
		case "Yuri1":
			embed.setImage(
				"https://i.pinimg.com/originals/f1/57/56/f157565faa42f556df9baa2b1063bde9.jpg"
			)
			break
		case "Yuri2":
			embed.setImage(
				"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9f1a633b-231d-4b77-9c14-5ce67d4f0917/dby7b7r-32eeabbd-0bb3-4c82-8790-89258f5e31f6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlmMWE2MzNiLTIzMWQtNGI3Ny05YzE0LTVjZTY3ZDRmMDkxN1wvZGJ5N2I3ci0zMmVlYWJiZC0wYmIzLTRjODItODc5MC04OTI1OGY1ZTMxZjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2EwAYyQ9l_06CzOTGD3EVlxok7AKpW9NLroKsPo_z_I"
			)
			break
		case "Yuri3":
			embed.setImage(
				"https://64.media.tumblr.com/cdbdd58ab338d108a74852a5c0ad4945/2610ac1947e38872-ed/s1280x1920/1d5cec054acb8275665b7e5b7db30b806236127b.jpg"
			)
			break
		case "Yuri4":
			embed.setImage(
				"https://www.kindpng.com/picc/m/325-3250080_yuri-cute-yuri-doki-doki-hd-png-download.png"
			)
			break
		case "Yuri5":
			embed.setImage(
				"http://pm1.narvii.com/7301/859efdbf1823f2a9c8f90a7e36b2c0f482f5672fr1-500-500v2_00.jpg"
			)
			break
		case "Yuri6":
			embed.setImage(
				"https://pbs.twimg.com/media/EQGnPoSWAAEnf2E.jpg:large"
			)
			break
		case "Yuri7":
			embed.setImage(
				"https://i.pinimg.com/originals/07/4c/73/074c73d545dc8039aa3049527f69875c.jpg"
			)
			break
		case "Yuri8":
			embed.setImage(
				"https://i.pinimg.com/originals/ca/dc/92/cadc92995ad6fa4592d72036518ca3d7.png"
			)
			break
		case "Yuri9":
			embed.setImage(
				"https://w0.peakpx.com/wallpaper/250/486/HD-wallpaper-video-game-doki-doki-literature-club-girl-purple-eyes-yuri-doki-doki-literature-club.jpg"
			)
			break
		case "Yuri10":
			embed.setImage(
				"https://i.pinimg.com/736x/1b/cd/6f/1bcd6f453c9a56150ec843b8032bc094.jpg"
			)
			break
		case "Yuri11":
			embed.setImage(
				"https://pbs.twimg.com/media/EzKz2a3VgAox0_j?format=jpg&name=4096x4096"
			)
			break
		case "Yuri12":
			embed.setImage(
				"https://pbs.twimg.com/media/E_b9pv4XIAYY5BG.jpg:large"
			)
			break
		case "Yuri13":
			embed.setImage(
				"https://sun9-3.userapi.com/s/v1/ig1/ya2hlCsURQmmpUy4R8o_Q3gA2Uou_tAlCsAYC7NOHueTZcmzm0ytL9I2It_fMEp5jjFiUf4o.jpg?size=430x604&quality=96&type=album"
			)
			break
		case "Yuri14":
			embed.setImage(
				"https://i.pinimg.com/originals/fb/75/cf/fb75cf65b60763c66283446c97324e8f.jpg"
			)
			break
		case "Yuri15":
			embed.setImage(
				"https://static.zerochan.net/Yuri.%28Doki.Doki.Literature.Club%21%29.full.3384849.png"
			)
			break
		case "Yuri16":
			embed.setImage(
				"https://www.seekpng.com/png/small/134-1347813_doki-doki-literature-club-yuri-ddlc-yuri.png"
			)
			break
		case "Yuri17":
			embed.setImage(
				"https://preview.redd.it/mc8x7j0cg2d71.jpg?auto=webp&s=4c3186b657d2b77b2be6284ebca546ede0c4295d"
			)
			break
		case "Yuri18":
			embed.setImage(
				"https://pbs.twimg.com/media/Eymj8oWXEAEn9hP?format=jpg&name=4096x4096"
			)
			break
		case "Yuri19":
			embed.setImage("https://cdn140.picsart.com/271169818025211.png")
			break
		case "Yuri20":
			embed.setImage(
				"https://pbs.twimg.com/media/E8u5LohVkAEgyuz?format=jpg&name=4096x4096"
			)
			break
	}

	const sentInteraction = await interaction
		.editReply({
			embeds: [embed],
		})
		.catch(async (err) => {
			console.log(err)

			return await interaction
				.editReply({
					content: "❌ | An error occured",
				})
				.catch((err) => {})
		})

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
				waifu: yuri,
			})

			return await interaction
				.editReply({
					content: `Aww, your new waifu is **${yuri}**!`,
				})
				.catch((err) => {})
		} else if (getUser) {
			const existingWaifu = getUser.waifu

			return await interaction
				.editReply({
					content:
						`You already have a waifu—**${existingWaifu}**! Use ` +
						"`/breakup`" +
						` to break up with ${existingWaifu}`,
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
