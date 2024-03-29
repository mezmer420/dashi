const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Waifus"

module.exports.data = new SlashCommandBuilder()
	.setName("balls")
	.setDescription("Gives a random ball")

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

	const balls = ["Basketball", "Football", "Baseball", "Golf Ball"]

	const ball = balls[Math.floor(Math.random() * balls.length)]

	const embed = new EmbedBuilder().setColor("Random").setTitle(ball)

	switch (ball) {
		case "Basketball":
			embed
				.setDescription("shoot hoops")
				.setImage(
					"https://artwork.espncdn.com/categories/cd70a58e-a830-330c-93ed-52360b51b632/1x1Feature/1440_201903062023.jpg"
				)
			break
		case "Football":
			embed
				.setDescription("throw it even though called football")
				.setImage(
					"https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/utepathletics.com/images/2021/6/24/DSC04844.jpg"
				)
			break
		case "Baseball":
			embed
				.setDescription("hit with stick or something")
				.setImage(
					"https://images.squarespace-cdn.com/content/v1/5737bc404d088e9a0cc49199/1602379045086-OIA9DAWFOLEE16AVTQ80/image-asset.jpeg?format=1500w"
				)
			break
		case "Golf Ball":
			embed
				.setDescription("swing at it to try to get in hole")
				.setImage(
					"https://ncg-live-assets.ams3.cdn.digitaloceanspaces.com/uploads/2021/02/1-Ball-in-Golf-1.jpg"
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
			await Waifus.create({ id: interaction.member.id, waifu: ball })

			return await interaction
				.editReply({
					content: `Aww, your new waifu is **${ball}**!`,
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
