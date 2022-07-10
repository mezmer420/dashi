const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { hangman } = require("reconlx")
// npm i reconlx@version1

module.exports.data = new SlashCommandBuilder()
	.setName("hangman-custom")
	.setDescription("Start a hangman game with a custom word")
	.addStringOption((option) =>
		option.setName("word").setDescription("The word").setRequired(true)
	)
	.addChannelOption((option) =>
		option
			.setName("channel")
			.setDescription("The channel for the game")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("category")
			.setDescription("Optional category to display")
			.setRequired(false)
	)

module.exports.run = async ({ client, interaction }) => {
	if (
		interaction.channel.id !== "965054741480636496" &&
		interaction.channel.id !== "950196454880866314"
	) {
		return await interaction
			.editReply({
				content:
					"You can only use this command in <#965054741480636496> and <#950196454880866314>",
			})
			.catch((err) => {})
	}

	const word = interaction.options.getString("word")
	const targetchannel = interaction.options.getChannel("channel")
	const category = interaction.options.getString("category")

	if (
		targetchannel.id !== "939674946953682976" &&
		targetchannel.id !== "939686071241949205" &&
		targetchannel.id !== "940786577808969738" &&
		targetchannel.id !== "945527434655187006" &&
		targetchannel.id !== "969027553878749204"
	) {
		return await interaction
			.editReply({
				content:
					"You can only set the target channel to <#939674946953682976>, <#939686071241949205>, <#940786577808969738>, <#945527434655187006>, or <#969027553878749204>",
			})
			.catch((err) => {})
	}

	if (word.indexOf(" ") >= 0) {
		return await interaction
			.editReply({
				content: "You cannot put spaces in the word",
			})
			.catch((err) => {})
	}

	if (!/^[a-zA-Z]+$/.test(word)) {
		return await interaction
			.editReply({
				content: "The word can only have alphabet letters (a-z)",
			})
			.catch((err) => {})
	}

	console.log(word)

	const hangmangame = new hangman({
		message: interaction,
		word: word,
		client: client,
		channelID: targetchannel.id,
	})

	let content1 = `Starting hangman game in <#${targetchannel.id}> with word **${word}**`
	let content2 = `**Custom Hangman Game**\nStarted By: ${interaction.member.user.username}`
	if (category) {
		content1 = `Starting hangman game in <#${targetchannel.id}> with word **${word}** and category **${category}**`
		content2 = `**Custom Hangman Game**\nStarted By: ${interaction.member.user.username}\nCategory: **${category}**`
	}

	await interaction
		.editReply({
			content: content1,
		})
		.catch((err) => {})

	await client.channels.cache
		.get(`${targetchannel.id}`)
		.send(content2)
		.catch((err) => {
			console.log(err)
		})

	hangmangame.start().catch((err) => {
		console.log(err)
	})
}
