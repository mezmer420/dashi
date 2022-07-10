const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
	.setName("daily")
	.setDescription("Get 200 Dashcoins for free every 16 hours")

module.exports.run = async ({
	client,
	interaction,
	Economy,
	dailyCooldown,
}) => {
	const getdailyCooldown = await dailyCooldown.findOne({
		where: { id: interaction.member.id },
	})
    
	const dailycooldownTime = getdailyCooldown?.expiry

	if (getdailyCooldown && dailycooldownTime > new Date().getTime()) {
		return await interaction
			.editReply({
				content: `Wait **${ms(
					dailycooldownTime - new Date().getTime(),
					{ long: true }
				)}** before acquiring your next daily!`,
			})
			.catch((err) => {})
	}

	if (getdailyCooldown) {
		dailyCooldown.destroy({ where: { id: interaction.member.id } })
	}

	let getUser = await Economy.findOne({
		where: { id: interaction.member.id },
	})

	if (!getUser) {
		getUser = await Economy.create({
			id: interaction.member.id,
			wallet: 0,
			bank: 0,
		})
	}

	const coins_earned = 200

	await Economy.update(
		{ wallet: getUser.wallet + coins_earned },
		{ where: { id: interaction.member.id } }
	)

	dailyCooldown.create({
		id: interaction.member.id,
		expiry: new Date().getTime() + 57600000,
	})

	await interaction
		.editReply({
			content: `You got **200** Dashcoins:tm:!`,
		})
		.catch((err) => {})
}
