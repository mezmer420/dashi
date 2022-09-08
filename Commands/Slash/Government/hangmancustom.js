const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
// const { hangman } = require("reconlx")
// npm i reconlx@version1

module.exports.data = new SlashCommandBuilder()
	.setName("hangmancustom")
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

module.exports.category = "Government"

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

class hangman {
	/**
	 * @name hangman
	 * @kind constructor
	 * @param {Object} options options
	 * @param {String} [options.channelID] channel to send to (channel.id)
	 * @param {any} [options.message] parameter used for message event
	 * @param {String} [options.permission] required permission to use this command
	 * @param {String} [options.word] word that needed to be guessed
	 * @param {any} [options.client] client used to defined Discord.Client
	 * @description Easy and simple hangman game!
	 */
	constructor(options) {
		if (!options.channelID)
			throw new TypeError("Channel ID is a required argument.")
		if (typeof options.channelID !== "string")
			throw new TypeError("Channel ID must be in a string")
		if (!options.message)
			throw new TypeError(
				"Message is a required argument; parameter used for message event"
			)
		if (!options.word)
			throw new TypeError(
				"Word is an required argument; Word is the word needed to be guessed"
			)
		if (!options.client)
			throw new TypeError(
				"Client is a required argument; client used to defined Discord.Client"
			)
		this.message = options.message
		this.channel = this.message.guild.channels.cache.get(options.channelID)
		this.args = options.args
		this.permission = options.permission
		this.word = options.word.toLowerCase().replace(/[^a-z\s:]/g, "")
		this.client = options.client
	}
	async start() {
		var letters = [
			"🇦",
			"🇧",
			"🇨",
			"🇩",
			"🇪",
			"🇫",
			"🇬",
			"🇭",
			"🇮",
			"🇯",
			"🇰",
			"🇱",
			"🇲",
			"🇳",
			"🇴",
			"🇵",
			"🇶",
			"🇷",
			"🇸",
			"🇹",
			"🇺",
			"🇻",
			"🇼",
			"🇽",
			"🇾",
			"🇿",
		]
		var unicode = [
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"j",
			"k",
			"l",
			"m",
			"n",
			"o",
			"p",
			"q",
			"r",
			"s",
			"t",
			"u",
			"v",
			"w",
			"x",
			"y",
			"z",
		]
		var games = []

		var stages = [
			`\`\`\`
      /---|
      |   
      |
      |
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |
      |
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |   |
      | 
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |  /|
      |
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |  /|\\
      |
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o
      |  /|\\
      |  /
      |
      \`\`\`
      `,
			`\`\`\`
      /---|
      |   o ~ thanks
      |  /|\\
      |  / \\
      |
      \`\`\`
      `,
		]
		function generateMessage(phrase, guesses) {
			var s = ""
			for (var i = 0; i < phrase.length; i++) {
				if (phrase[i] == " ") s += " "
				else {
					var c = phrase[i]
					if (guesses.indexOf(c) == -1) c = "\\_"
					s += "__" + c + "__ "
				}
			}
			return s
		}
		function nextLetter(message, index, word) {
			message
				.react(letters[index])
				.catch((err) => {})
				.then((r) => {
					index++
					if (index < letters.length) {
						if (index == 13) {
							message.channel
								.send(generateMessage(word, []))
								.then((m) => {
									games.push({
										stage: 0,
										msg0: message,
										msg1: m,
										phrase: word,
										guesses: [],
									})
									nextLetter(m, index)
								})
						} else {
							nextLetter(message, index, word)
						}
					}
				})
		}
		// TODO: I'm way too lazy to change this, but WHY THE FUCK IS THIS AN EVENT LISTENER?!
		this.client.on("messageReactionAdd", (reaction, user) => {
			var msg = reaction.message
			if (!user.bot) {
				for (var i = 0; i < games.length; i++) {
					var game = games[i]
					if (
						(msg.id == game.msg0.id || msg.id == game.msg1.id) &&
						game.stage < stages.length
					) {
						var letter =
							unicode[letters.indexOf(reaction.emoji.name)]

						reaction.users.fetch().then((usrs) => {
							var reactors = usrs
							var remove_next = function (index) {
								if (index < reactors.length)
									reaction
										.remove(reactors[index])
										.then(() => remove_next(index + 1))
							}

							remove_next(0)
						})

						if (game.guesses.indexOf(letter) == -1) {
							game.guesses.push(letter)
							if (game.phrase.indexOf(letter) == -1) {
								game.stage++
								game.msg0.edit(stages[game.stage])
							} else {
								var sik = true
								for (var j = 0; j < game.phrase.length; j++) {
									var c = game.phrase[j]
									if (
										c != " " &&
										game.guesses.indexOf(c) == -1
									) {
										sik = false
									}
								}

								if (sik) {
									game.msg0.edit(
										stages[game.stage].replace(
											"o",
											"o ~ ur alright.. for now"
										)
									)
								}

								game.msg1.edit(
									generateMessage(game.phrase, game.guesses)
								)
							}
						}
					}
					games[i] = game
				}
			}
		})
		if (this.permission) {
			if (!this.message.member.permissions.has(this.permission))
				return this.message.reply(
					`You need ${this.permission} permission to use this command.`
				)
			this.channel.send(stages[0]).then((m) => {
				nextLetter(m, 0, this.word)
			})
		} else {
			this.channel.send(stages[0]).then((m) => {
				nextLetter(m, 0, this.word)
			})
		}
	}
}
