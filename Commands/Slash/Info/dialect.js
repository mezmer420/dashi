const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("dialect")
	.setDescription("View dialect info")
	.addStringOption((option) =>
		option
			.setName("dialect")
			.setDescription("The dialect to view")
			.setRequired(true)
			.addChoices(
				{ name: "vcash dialect", value: "1" },
				{ name: "mezmer dialect", value: "2" },
				{ name: "choc dialect", value: "3" },
				{ name: "delta airlines dialect", value: "4" },
				{
					name: "speedy dialect uwu owu uwo ow- -w- -wu uWu",
					value: "5",
				},
				{
					name: "vchoc dialect",
					value: "6",
				},
				{
					name: "balls dialect",
					value: "7",
				}
			)
	)

module.exports.category = "Info"

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Dialects,
	defaultColor,
}) => {
	const getDialects = await Systems.findOne({
		where: { system: "Dialects" },
	})

	if (getDialects.online === false) {
		return await interaction
			.editReply({
				content: "The Dialects system is currently disabled",
			})
			.catch((err) => {})
	}

	const dialectId = interaction.options.getString("dialect")

	const dialectTest = await Dialects.findOne({
		where: { dialectid: dialectId },
	})

	if (!dialectTest) {
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
	}

	const dialectData = await Dialects.findAll({
		where: { dialectid: dialectId },
	})

	let Dialect = []

	for (let obj of dialectData) {
		Dialect.push(obj)
	}

	let DialectPhrases = []

	for (let i = 0; i < Dialect.length; i++) {
		const phrase = Dialect[i].phrase

		DialectPhrases.push(phrase)
	}

	DialectPhrases = DialectPhrases.sort()

	let DialectCount = []

	for (let i = 0; i < Dialect.length; i++) {
		const count = Dialect[i].count

		DialectCount.push(count)
	}

	DialectCount = DialectCount.reduce((a, b) => a + b, 0)

	const OneDialectData = await Dialects.findOne({
		where: { dialectid: dialectId },
	})

	const Embed = new EmbedBuilder()
		.setTitle(`${OneDialectData.dialectname}`)
		.setFooter({ text: `Use Count: ${DialectCount} | Since 6/30/2022` })

	let desc = ""

	for (let i = 0; i < DialectPhrases.length; i++) {
		const phrase = DialectPhrases[i]

		desc += "`" + `${phrase}` + "`" + " "
	}

	Embed.setDescription(desc)

	if (dialectId === "1") {
		Embed.setColor("#FFA500")
	} else if (dialectId === "2") {
		Embed.setColor("#0096FF")
	} else if (dialectId === "3") {
		Embed.setColor("Red")
	} else if (dialectId === "4") {
		Embed.setColor("Purple")
	} else if (dialectId === "5") {
		Embed.setColor("Purple")
	} else if (dialectId === "6") {
		Embed.setColor("Orange")
	} else if (dialectId === "7") {
		Embed.setColor("Purple")
	}

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
