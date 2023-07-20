const { SlashCommandBuilder } = require("discord.js")

// https://api.jeyy.xyz/docs#/

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("image")
	.setDescription(
		"Image manipulation commands; to use someone's avatar, first use /user avatar"
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("glitch")
			.setDescription("glitch")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("level")
					.setDescription("Intensity of the effect; default: 3")
					.setMaxValue(1)
					.setMaxValue(10)
					.setRequired(false)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("boil")
			.setDescription("boil")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("level")
					.setDescription("Intensity of the effect; default: 2")
					.setMaxValue(1)
					.setMaxValue(5)
					.setRequired(false)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("earthquake")
			.setDescription("earthquake")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("level")
					.setDescription("Intensity of the effect; default: 3")
					.setMaxValue(1)
					.setMaxValue(10)
					.setRequired(false)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("hearts")
			.setDescription("hearts")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
			.addBooleanOption((option) =>
				option
					.setName("rainbow")
					.setDescription("Rainbow?; default: false")
					.setRequired(false)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("shear")
			.setDescription("shear")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
			.addStringOption((option) =>
				option
					.setName("axis")
					.setDescription("Axis; default: X")
					.setRequired(false)
					.addChoices(
						{ name: "x", value: "x" },
						{ name: "X", value: "X" },
						{ name: "y", value: "y" },
						{ name: "Y", value: "Y" }
					)
			)
	)
	// .addSubcommand((subcommand) =>
	// 	subcommand
	// 		.setName("wave")
	// 		.setDescription("wave")
	// 		.addAttachmentOption((option) =>
	// 			option
	// 				.setName("image")
	// 				.setDescription("The image you want to be manipulate")
	// 				.setRequired(true)
	// 		)
	// 		.addNumberOption((option) =>
	// 			option
	// 				.setName("frequency")
	// 				.setDescription("Frequency; default: 0.05")
	// 				// .setMaxValue(0)
	// 				// .setMaxValue(10)
	// 				.setRequired(false)
	// 		)
	// 		.addIntegerOption((option) =>
	// 			option
	// 				.setName("amplitude")
	// 				.setDescription("Amplitude; default: 1")
	// 				.setMaxValue(1)
	// 				.setMaxValue(5)
	// 				.setRequired(false)
	// 		)
	// )
	.addSubcommand((subcommand) =>
		subcommand
			.setName("patpat")
			.setDescription("patpat")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("burn")
			.setDescription("burn")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("shock")
			.setDescription("shock")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("bomb")
			.setDescription("bomb")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("bonks")
			.setDescription("bonks")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("explicit")
			.setDescription("explicit")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("blur")
			.setDescription("blur")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("lamp")
			.setDescription("lamp")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("rain")
			.setDescription("rain")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("canny")
			.setDescription("canny")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("cartoon")
			.setDescription("cartoon")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("layers")
			.setDescription("layers")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("radiate")
			.setDescription("radiate")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("shoot")
			.setDescription("shoot")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("tv")
			.setDescription("tv")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("magnify")
			.setDescription("magnify")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("print")
			.setDescription("print")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)

	.addSubcommand((subcommand) =>
		subcommand
			.setName("matrix")
			.setDescription("matrix")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("sensitive")
			.setDescription("sensitive")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("dilate")
			.setDescription("dilate")
			.addAttachmentOption((option) =>
				option
					.setName("image")
					.setDescription("The image you want to be manipulate")
					.setRequired(true)
			)
	)

module.exports.run = async ({ client, interaction }) => {
	const image = interaction.options.getAttachment("image")

	const options = interaction.options.getSubcommand()

	switch (options) {
		case "glitch": {
			const level = interaction.options.getInteger("level") || 3

			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/glitch?image_url=${image.url}&level=${level}`,
							name: "glitch.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "boil": {
			const level = interaction.options.getInteger("level") || 2

			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/boil?image_url=${image.url}&level=${level}`,
							name: "boil.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "earthquake": {
			const level = interaction.options.getInteger("level") || 3

			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/earthquake?image_url=${image.url}&level=${level}`,
							name: "earthquake.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "hearts": {
			const rainbow = interaction.options.getBoolean("rainbow") || false

			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/hearts?image_url=${image.url}&rainbow=${rainbow}`,
							name: "hearts.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "shear": {
			const axis = interaction.options.getString("axis") || "X"

			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/shear?image_url=${image.url}&axis=${axis}`,
							name: "shear.gif",
						},
					],
				})
				.catch((err) => {})
		}

		// case "wave": {
		// 	const frequency = interaction.options.get("frequency").value || 0.05
		// 	const amplitude = interaction.options.getInteger("amplitude") || 1

		// 	return await interaction
		// 		.editReply({
		// 			files: [
		// 				{
		// 					attachment: `https://api.jeyy.xyz/image/wave?image_url=${image.url}&frequency=${frequency}&amplitude=${amplitude}`,
		// 					name: "wave.gif",
		// 				},
		// 			],
		// 		})
		// 		.catch((err) => {})
		// }

		case "patpat": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/patpat?image_url=${image.url}`,
							name: "patpat.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "burn": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/burn?image_url=${image.url}`,
							name: "burn.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "shock": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/shock?image_url=${image.url}`,
							name: "shock.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "bomb": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/bomb?image_url=${image.url}`,
							name: "bomb.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "bonks": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/bonks?image_url=${image.url}`,
							name: "bonks.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "explicit": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/explicit?image_url=${image.url}`,
							name: "explicit.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "blur": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/blur?image_url=${image.url}`,
							name: "blur.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "lamp": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/lamp?image_url=${image.url}`,
							name: "lamp.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "rain": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/rain?image_url=${image.url}`,
							name: "rain.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "canny": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/canny?image_url=${image.url}`,
							name: "canny.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "cartoon": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/cartoon?image_url=${image.url}`,
							name: "cartoon.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "layers": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/layers?image_url=${image.url}`,
							name: "layers.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "radiate": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/radiate?image_url=${image.url}`,
							name: "radiate.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "shoot": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/shoot?image_url=${image.url}`,
							name: "shoot.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "tv": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/tv?image_url=${image.url}`,
							name: "tv.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "magnify": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/magnify?image_url=${image.url}`,
							name: "magnify.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "print": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/print?image_url=${image.url}`,
							name: "print.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "matrix": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/matrix?image_url=${image.url}`,
							name: "matrix.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "sensitive": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/sensitive?image_url=${image.url}`,
							name: "sensitive.gif",
						},
					],
				})
				.catch((err) => {})
		}

		case "dilate": {
			return await interaction
				.editReply({
					files: [
						{
							attachment: `https://api.jeyy.xyz/image/dilate?image_url=${image.url}`,
							name: "dilate.gif",
						},
					],
				})
				.catch((err) => {})
		}
	}
}
