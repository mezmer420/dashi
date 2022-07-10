const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
	.setName("work")
	.setDescription("Work for Dashcoins; default earned is 65-100")

module.exports.run = async ({
	client,
	interaction,
	Economy,
	Items,
	workCooldown,
}) => {
	const getworkCooldown = await workCooldown.findOne({
		where: { id: interaction.member.id },
	})
	const workcooldownTime = getworkCooldown?.expiry

	if (getworkCooldown && workcooldownTime > new Date().getTime()) {
		return await interaction
			.editReply({
				content: `Wait **${ms(workcooldownTime - new Date().getTime(), {
					long: true,
				})}** before trying to work again!`,
			})
			.catch((err) => {})
	}

	if (getworkCooldown) {
		await workCooldown.destroy({ where: { id: interaction.member.id } })
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

	const randomvalue = Math.floor(Math.random() * 100)

	const findWife = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Wife" },
	})
	const findMotorcycle = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Motorcycle" },
	})
	const findSuperbike = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Superbike" },
	})
	const findHammer = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Hammer" },
	})
	const findSickle = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Sickle" },
	})

	let coins_earned = Math.floor(Math.random() * 35) + 66

	if (findWife) {
		if (randomvalue >= 5) {
			if (findHammer && findSickle) {
				coins_earned = Math.floor(Math.random() * 20) + 131
			} else if (findHammer && !findSickle) {
				coins_earned = Math.floor(Math.random() * 20) + 81
			} else if (!findHammer && findSickle) {
				coins_earned = Math.floor(Math.random() * 35) + 116
			}

			await Economy.update(
				{ wallet: getUser.wallet + coins_earned },
				{ where: { id: interaction.member.id } }
			)

			if (findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 4,
				})
			} else if (findMotorcycle && !findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 7,
				})
			} else if (!findMotorcycle && !findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 10,
				})
			}

			return await interaction
				.editReply({
					content: `You earned **${coins_earned}** Dashcoins:tm:!`,
				})
				.catch((err) => {})
		} else if (randomvalue < 5) {
			if (findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 4,
				})
			} else if (findMotorcycle && !findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 7,
				})
			} else if (!findMotorcycle && !findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 10,
				})
			}

			return await interaction
				.editReply({
					content:
						"Unfortunately, you had a bad day and couldn't work.",
				})
				.catch((err) => {})
		}
	} else if (!findWife) {
		if (randomvalue >= 10) {
			if (findHammer && findSickle) {
				coins_earned = Math.floor(Math.random() * 20) + 131
			} else if (findHammer && !findSickle) {
				coins_earned = Math.floor(Math.random() * 20) + 81
			} else if (!findHammer && findSickle) {
				coins_earned = Math.floor(Math.random() * 35) + 116
			}

			await Economy.update(
				{ wallet: getUser.wallet + coins_earned },
				{ where: { id: interaction.member.id } }
			)

			if (findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 4,
				})
			} else if (findMotorcycle && !findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 7,
				})
			} else if (!findMotorcycle && !findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 10,
				})
			}

			return await interaction
				.editReply({
					content: `You earned **${coins_earned}** Dashcoins:tm:!`,
				})
				.catch((err) => {})
		} else if (randomvalue < 10) {
			if (findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 4,
				})
			} else if (findMotorcycle && !findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 7,
				})
			} else if (!findMotorcycle && !findSuperbike) {
				workCooldown.create({
					id: interaction.member.id,
					expiry: new Date().getTime() + 60000 * 10,
				})
			}

			return await interaction
				.editReply({
					content:
						"Unfortunately, you had a bad day and couldn't work.",
				})
				.catch((err) => {})
		}
	}
}
