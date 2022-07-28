const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("shop")
	.setDescription("Open the shop")
	.addStringOption((option) =>
		option
			.setName("page")
			.setDescription("Page to view")
			.setRequired(true)
			.addChoices(
				{ name: "One-time Purchases", value: "one time" },
				{ name: "Stockable Itmes", value: "stockable" }
			)
	)

module.exports.run = async ({ client, interaction, Systems, defaultColor }) => {
	const getEconomy = await Systems.findOne({
		where: { system: "Economy" },
	})

	if (getEconomy.online === false) {
		return await interaction
			.editReply({
				content: "The Economy system is currently disabled",
			})
			.catch((err) => {})
	}

	let Embed = new EmbedBuilder()

	const page = interaction.options.getString("page")

	switch (page) {
		case "one time": {
			Embed.setColor(defaultColor).setTitle("Shop").addFields(
				{
					name: "**About**",
					value: "Cost and info below each item. To buy, type `/buy`. To sell an item you own (at a reduced price of its original), type `/sell`.",
				},
				{
					name: "Debit Card",
					value: "`1000 Dashcoins` Purchases will be made by default from your bank",
				},
				{
					name: "Motorcycle",
					value: "`500 Dashcoins` Get places fast! Work cooldown reduced from 10 min to 7 min",
				},
				{
					name: "Superbike",
					value: "`3500 Dashcoins` Get places super fast! Work cooldown reduced to 4 minutes",
				},
				{
					name: "Hammer",
					value: "`1000 Dashcoins` Randomized range of Dashcoins:tm: earned from working reduced from 35 to 20 from the max",
				},
				{
					name: "Sickle",
					value: "`1500 Dashcoins` Max Dashcoins:tm: earned from working increased from 100 to 150",
				},
				{
					name: "Wife",
					value: "`1000 Dashcoins` Aw, a loving partner~ Chances of having a bad day at work reduced from 10% to 5%",
				},
				{
					name: "Falsified College Degree",
					value: "`50000 Dashcoins` Max Dashcoins:tm: earned from working increased to 500",
				},
				{
					name: "Bail Bonds",
					value: "`2000 Dashcoins` If you're caught robbing/heisting, eco cooldowns reduced from 1 hour to 30 min",
				},
				{
					name: "Holdup Equipment",
					value: "`2000 Dashcoins` Increases your chances of a successful heist"
				}
			)
			break
		}

		case "stockable": {
			Embed.setColor(defaultColor).setTitle("Shop").addFields(
				{
					name: "**About**",
					value: "Cost and info below each item. To buy, type `/buy`. Stockable items are not sellable.",
				},
				// {
				// 	name: "Birth Control Pills",
				// 	value: "`1000 Dashcoins` Protects against getting impregnated if you are raped",
				// }
				{
					name: "Noting here rn check back later :/",
					value: "`0 Dashcoins` qwertyuioplkjhgfdsazxcvbnm",
				}
			)
			break
		}
	}

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
