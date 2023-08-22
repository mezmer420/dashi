const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js")

module.exports.category = "mezmer420"

module.exports.data = new SlashCommandBuilder()
	.setName("dialectupdate")
	.setDescription("Update dialects")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("add")
			.setDescription("Add a phrase to a dialect")
			.addStringOption((option) =>
				option
					.setName("dialect")
					.setDescription("The dialect to add to")
					.setRequired(true)
					.addChoices(
						{ name: "vcash dialect", value: "1" },
						{ name: "mezmer dialect", value: "2" },
						{ name: "choc dialect", value: "3" },
						{ name: "delta dialect", value: "4" },
						{ name: "speedy dialect", value: "5" },
						{
							name: "vchoc dialect",
							value: "6",
						}
						// {
						// 	name: "balls dialect",
						// 	value: "7",
						// }
					)
			)
			.addStringOption((option) =>
				option
					.setName("phrase")
					.setDescription("The word/phrase")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("remove")
			.setDescription("Remove a phrase from a dialect")
			.addStringOption((option) =>
				option
					.setName("dialect")
					.setDescription("The dialect to remove from")
					.setRequired(true)
					.addChoices(
						{ name: "vcash dialect", value: "1" },
						{ name: "mezmer dialect", value: "2" },
						{ name: "choc dialect", value: "3" },
						{ name: "delta dialect", value: "4" },
						{ name: "speedy dialect", value: "5" },
						{
							name: "vchoc dialect",
							value: "6",
						}
						// {
						// 	name: "balls dialect",
						// 	value: "7",
						// }
					)
			)
			.addStringOption((option) =>
				option
					.setName("phrase")
					.setDescription("The word/phrase")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("rename")
			.setDescription("Rename a a dialect")
			.addStringOption((option) =>
				option
					.setName("dialect")
					.setDescription("The dialect to rename")
					.setRequired(true)
					.addChoices(
						{ name: "vcash dialect", value: "1" },
						{ name: "mezmer dialect", value: "2" },
						{ name: "choc dialect", value: "3" },
						{ name: "delta dialect", value: "4" },
						{ name: "speedy dialect", value: "5" },
						{
							name: "vchoc dialect",
							value: "6",
						}
						// {
						// 	name: "balls dialect",
						// 	value: "7",
						// }
					)
			)
			.addStringOption((option) =>
				option
					.setName("name")
					.setDescription("The dialect's new name")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("setcount")
			.setDescription("Set the count of a dialect phrase")
			.addStringOption((option) =>
				option
					.setName("dialect")
					.setDescription("The dialect of the phrase")
					.setRequired(true)
					.addChoices(
						{ name: "vcash dialect", value: "1" },
						{ name: "mezmer dialect", value: "2" },
						{ name: "choc dialect", value: "3" },
						{ name: "delta dialect", value: "4" },
						{ name: "speedy dialect", value: "5" },
						{
							name: "vchoc dialect",
							value: "6",
						}
						// {
						// 	name: "balls dialect",
						// 	value: "7",
						// }
					)
			)
			.addStringOption((option) =>
				option
					.setName("phrase")
					.setDescription("The word/phrase")
					.setRequired(true)
			)
			.addIntegerOption((option) =>
				option
					.setName("count")
					.setDescription("New count of the word/phrase")
					.setRequired(true)
			)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports.run = async ({ client, interaction, Dialects }) => {
	const dialectId = interaction.options.getString("dialect")
	const phrase = interaction.options.getString("phrase")

	const options = interaction.options.getSubcommand()

	switch (options) {
		case "add": {
			const findPhrase = await Dialects.findOne({
				where: { phrase: phrase },
			})

			if (findPhrase) {
				return await interaction
					.editReply({
						content: `**${phrase}** already exists in **${findPhrase.dialectname}**`,
					})
					.catch((err) => {})
			}

			const getDialect = await Dialects.findOne({
				where: { dialectid: dialectId },
			})

			let dialectName

			if (!getDialect) {
				if (dialectId === "1") {
					dialectName = "vcash dialect"
				} else if (dialectId === "2") {
					dialectName = "mezmer dialect"
				} else if (dialectId === "3") {
					dialectName = "choc dialect"
				} else if (dialectId === "4") {
					dialectName = "delta airlines dialect"
				} else if (dialectId === "5") {
					dialectName = "speedy dialect uwu owu uwo ow- -w- -wu uWu"
				} else if (dialectId === "6") {
					dialectName = "vchoc dialect"
				} else if (dialectId === "7") {
					dialectName = "balls dialect"
				}

				await Dialects.create({
					dialectid: dialectId,
					dialectname: dialectName,
					phrase: phrase,
					count: 0,
				})

				return await interaction
					.editReply({
						content: `**${dialectName}** was created and **${phrase}** has been added to it`,
					})
					.catch((err) => {})
			} else if (getDialect) {
				dialectName = getDialect.dialectname

				await Dialects.create({
					dialectid: dialectId,
					dialectname: dialectName,
					phrase: phrase,
					count: 0,
				})

				return await interaction
					.editReply({
						content: `**${phrase}** has been added to **${dialectName}**`,
					})
					.catch((err) => {})
			}
		}

		case "remove": {
			const getDialect = await Dialects.findOne({
				where: { dialectid: dialectId, phrase: phrase },
			})

			if (!getDialect) {
				let dialectName
				if (dialectId === "1") {
					dialectName = "vcash dialect"
				} else if (dialectId === "2") {
					dialectName = "mezmer dialect"
				} else if (dialectId === "3") {
					dialectName = "choc dialect"
				} else if (dialectId === "4") {
					dialectName = "delta airlines dialect"
				} else if (dialectId === "5") {
					dialectName = "speedy dialect uwu owu uwo ow- -w- -wu uWu"
				} else if (dialectId === "6") {
					dialectName = "vchoc dialect"
				} else if (dialectId === "7") {
					dialectName = "balls dialect"
				}

				return await interaction
					.editReply({
						content: `Couldn't find phrase **${phrase}** from **${dialectName}**`,
					})
					.catch((err) => {})
			} else if (getDialect) {
				const dialectCount = getDialect.count

				await Dialects.destroy({
					where: { dialectid: dialectId, phrase: phrase },
				})

				return await interaction
					.editReply({
						content: `**${phrase}** has been removed from **${getDialect.dialectname}**; its count was **${dialectCount}**`,
					})
					.catch((err) => {})
			}
		}

		case "rename": {
			const name = interaction.options.getString("name")

			const getDialect = await Dialects.findOne({
				where: { dialectid: dialectId },
			})

			if (!getDialect) {
				let dialectName
				if (dialectId === "1") {
					dialectName = "vcash dialect"
				} else if (dialectId === "2") {
					dialectName = "mezmer dialect"
				} else if (dialectId === "3") {
					dialectName = "choc dialect"
				} else if (dialectId === "4") {
					dialectName = "delta airlines dialect"
				} else if (dialectId === "5") {
					dialectName = "speedy dialect uwu owu uwo ow- -w- -wu uWu"
				} else if (dialectId === "6") {
					dialectName = "vchoc dialect"
				} else if (dialectId === "7") {
					dialectName = "balls dialect"
				}

				return await interaction
					.editReply({
						content: `**${dialectName}** doesn't have any phrases yet`,
					})
					.catch((err) => {})
			} else if (getDialect) {
				await Dialects.update(
					{ dialectname: name },
					{ where: { dialectid: dialectId } }
				)

				return await interaction
					.editReply({
						content: `**${getDialect.dialectname}** has been renamed to **${name}**`,
					})
					.catch((err) => {})
			}
		}

		case "setcount": {
			const count = interaction.options.getInteger("count")

			const getDialect = await Dialects.findOne({
				where: { dialectid: dialectId, phrase: phrase },
			})

			if (!getDialect) {
				let dialectName
				if (dialectId === "1") {
					dialectName = "vcash dialect"
				} else if (dialectId === "2") {
					dialectName = "mezmer dialect"
				} else if (dialectId === "3") {
					dialectName = "choc dialect"
				} else if (dialectId === "4") {
					dialectName = "delta airlines dialect"
				} else if (dialectId === "5") {
					dialectName = "speedy dialect uwu owu uwo ow- -w- -wu uWu"
				} else if (dialectId === "6") {
					dialectName = "vchoc dialect"
				} else if (dialectId === "7") {
					dialectName = "balls dialect"
				}

				return await interaction
					.editReply({
						content: `Couldn't find phrase **${phrase}** from **${dialectName}**`,
					})
					.catch((err) => {})
			} else if (getDialect) {
				await Dialects.update(
					{ count: count },
					{ where: { dialectid: dialectId, phrase: phrase } }
				)

				return await interaction
					.editReply({
						content: `**${getDialect.dialectname}**'s phrase **${phrase}**'s count has been updated from **${getDialect.count}** to **${count}**`,
					})
					.catch((err) => {})
			}
		}
	}
}
