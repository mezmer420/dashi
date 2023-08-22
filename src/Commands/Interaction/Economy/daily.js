const { SlashCommandBuilder } = require("discord.js")
const ms = require("ms")

module.exports.category = "Economy"

module.exports.data = new SlashCommandBuilder()
	.setName("daily")
	.setDescription("Get 200 Dashcoins for free every 16 hours")

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Economy,
	dailyCooldown,
}) => {
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

	const getDailyCooldown = await dailyCooldown.findOne({
		where: { id: interaction.member.id },
	})

	const dailyCooldownTime = getDailyCooldown?.expiry

	if (getDailyCooldown && dailyCooldownTime > new Date().getTime()) {
		return await interaction
			.editReply({
				content: `Wait **${ms(
					dailyCooldownTime - new Date().getTime(),
					{ long: true }
				)}** before acquiring your next daily!`,
			})
			.catch((err) => {})
	}

	if (getDailyCooldown) {
		dailyCooldown.destroy({ where: { id: interaction.member.id } })
	}

	const getUser =
		(await Economy.findOne({
			where: { id: interaction.member.id },
		})) ||
		(await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		}))

	const coinsEarned = 200

	await Economy.update(
		{ wallet: getUser.wallet + coinsEarned },
		{ where: { id: interaction.member.id } }
	)

	await dailyCooldown.create({
		id: interaction.member.id,
		expiry: new Date().getTime() + 57600000,
	})

	await interaction
		.editReply({
			content: `You got **200** Dashcoins:tm:!`,
		})
		.catch((err) => {})
}
