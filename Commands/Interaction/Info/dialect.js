const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Info"

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

	let dialect = []

	for (let obj of dialectData) {
		dialect.push(obj)
	}

	let dialectPhrases = []

	for (let i = 0; i < dialect.length; i++) {
		const phrase = dialect[i].phrase

		dialectPhrases.push(phrase)
	}

	dialectPhrases = dialectPhrases.sort()

	let dialectCount = []

	for (let i = 0; i < dialect.length; i++) {
		const count = dialect[i].count

		dialectCount.push(count)
	}

	dialectCount = dialectCount.reduce((a, b) => a + b, 0)

	const oneDialectData = await Dialects.findOne({
		where: { dialectid: dialectId },
	})

	const embed = new EmbedBuilder()
		.setTitle(`${oneDialectData.dialectname}`)
		.setFooter({ text: `Use Count: ${dialectCount} | Since 6/30/2022` })

	let desc = ""

	for (let i = 0; i < dialectPhrases.length; i++) {
		const phrase = dialectPhrases[i]

		desc += "`" + `${phrase}` + "`" + " "
	}

	embed.setDescription(desc)

	if (dialectId === "1") {
		embed.setColor("#FFA500")
	} else if (dialectId === "2") {
		embed.setColor("#0096FF")
	} else if (dialectId === "3") {
		embed.setColor("Red")
	} else if (dialectId === "4") {
		embed.setColor("Purple")
	} else if (dialectId === "5") {
		embed.setColor("Purple")
	} else if (dialectId === "6") {
		embed.setColor("Orange")
	} else if (dialectId === "7") {
		embed.setColor("Purple")
	}

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
