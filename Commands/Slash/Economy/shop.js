const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("shop")
	.setDescription("Open the shop")

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

	const shopopenEmbed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle("Shop")
		.addFields(
			{
				name: "**About**",
				value: "Cost and info below each item. To buy, type `/buy`. To sell an item you own (at a reduced price of its original), type `/sell`.",
			},
			{
				name: "Debit Card",
				value: "`1000 Dashcoins`   Purchases will be made by default from your bank",
			},
			{
				name: "Motorcycle",
				value: "`500 Dashcoins`   Get places fast! Work cooldown reduced from 10 min to 7 min",
			},
			{
				name: "Superbike",
				value: "`3500 Dashcoins`   Get places super fast! Work cooldown reduced to 4 minutes",
			},
			{
				name: "Hammer",
				value: "`1000 Dashcoins`   Randomized range of Dashcoins:tm: earned from working reduced from 35 to 20 from the max",
			},
			{
				name: "Sickle",
				value: "`1500 Dashcoins`   Max Dashcoins:tm: earned from working increased from 100 to 150",
			},
			{
				name: "Wife",
				value: "`1000 Dashcoins`   Aw, a loving partner~ Chances of having a bad day at work reduced from 10% to 5%",
			},
			{
				name: "Bail Bonds",
				value: "`2000 Dashcoins`   If you're caught robbing, eco cooldowns reduced from 1 hour to 30 min",
			}
		)

	await interaction
		.editReply({
			embeds: [shopopenEmbed],
		})
		.catch((err) => {})
}
