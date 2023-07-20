const { SlashCommandBuilder } = require("discord.js")
const ms = require("ms")

module.exports.category = "Economy"

module.exports.data = new SlashCommandBuilder()
	.setName("beg")
	.setDescription("Beg for Dashcoins; cooldown 1 min")

module.exports.run = async ({
	client,
	interaction,
	Economy,
	begCooldown,
	Systems,
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

	const getBegCooldown = await begCooldown.findOne({
		where: { id: interaction.member.id },
	})

	const begCooldownTime = getBegCooldown?.expiry

	if (getBegCooldown && begCooldownTime > new Date().getTime()) {
		return await interaction
			.editReply({
				content: `Wait **${ms(begCooldownTime - new Date().getTime(), {
					long: true,
				})}** before trying to beg again!`,
			})
			.catch((err) => {})
	} else if (getBegCooldown) {
		await begCooldown.destroy({ where: { id: interaction.member.id } })
	}

	const getUser =
		(await Economy.findOne({ where: { id: interaction.member.id } })) ||
		(await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		}))

	// if (getUser.wallet >= 1000 && getUser.bank < 1000) {
	// 	return await interaction
	// 		.editReply({
	// 			content:
	// 				"bruh you have at least 1000 Dashcoins:tm: in your wallet; nobody's going to donate to you lmao",
	// 		})
	// 		.catch((err) => {})
	// } else if (getUser.wallet < 1000 && getUser.bank >= 1000) {
	// 	return await interaction
	// 		.editReply({
	// 			content:
	// 				"bruh you have at least 1000 Dashcoins:tm: in your bank; what are you doing begging lmao",
	// 		})
	// 		.catch((err) => {})
	// } else if (getUser.wallet >= 1000 && getUser.bank >= 1000) {
	// 	return await interaction
	// 		.editReply({
	// 			content:
	// 				"bruh you have at least 1000 Dashcoins:tm: in both your wallet and bank; what are you doing begging lmao",
	// 		})
	// 		.catch((err) => {})
	// } else if (getUser.wallet < 1000 && getUser.bank < 1000) {
	const randomValue = Math.floor(Math.random() * 100)

	if (randomValue >= 20) {
		const coinsEarned = Math.floor(Math.random() * 5) + 5

		await Economy.update(
			{ wallet: getUser.wallet + coinsEarned },
			{ where: { id: interaction.member.id } }
		)

		await begCooldown.create({
			id: interaction.member.id,
			expiry: new Date().getTime() + 30000 * 2,
		})

		return await interaction
			.editReply({
				content: `You recieved **${coinsEarned}** Dashcoins:tm:!`,
			})
			.catch((err) => {})
	} else if (10 <= randomValue && randomValue < 20) {
		const coinsEarned = Math.floor(Math.random() * 50) + 100

		await Economy.update(
			{ wallet: getUser.wallet + coinsEarned },
			{ where: { id: interaction.member.id } }
		)

		await begCooldown.create({
			id: interaction.member.id,
			expiry: new Date().getTime() + 30000 * 2,
		})

		return await interaction
			.editReply({
				content: `Woah, was that MrBeast? You recieved **${coinsEarned}** Dashcoins:tm:!`,
			})
			.catch((err) => {})
	} else if (randomValue < 10) {
		await begCooldown.create({
			id: interaction.member.id,
			expiry: new Date().getTime() + 30000 * 2,
		})

		return await interaction
			.editReply({
				content:
					"Unfortunately, nobody donated you anything. Better luck next time.",
			})
			.catch((err) => {})
		// }
	}
}
