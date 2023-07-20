const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const ms = require("ms")

module.exports.category = "Economy"

module.exports.data = new SlashCommandBuilder()
	.setName("rob")
	.setDescription("Attempt to steal 10% of another user's wallet balance")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("The user you want to rob")
			.setRequired(true)
	)

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Economy,
	Items,
	workCooldown,
	begCooldown,
	robCooldown,
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

	const member = interaction.options.getMember("user")
	const getRobCooldown = await robCooldown.findOne({
		where: { id: interaction.member.id },
	})
	const robCooldownTime = getRobCooldown?.expiry

	if (getRobCooldown && robCooldownTime > new Date().getTime()) {
		return await interaction
			.editReply({
				content: `Wait **${ms(robCooldownTime - new Date().getTime(), {
					long: true,
				})}** before trying to rob/heist again!`,
			})
			.catch((err) => {})
	}

	if (getRobCooldown) {
		await robCooldown.destroy({ where: { id: interaction.member.id } })
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

	const memberWallet =
		(await Economy.findOne({ where: { id: member.id } })) ||
		(await Economy.create({
			id: member.id,
			wallet: 0,
			bank: 0,
		}))

	if (member.id === client.user.id) {
		return await interaction
			.editReply({
				content: "You can't rob me >:)",
			})
			.catch((err) => {})
	}

	if (member.id === interaction.member.id) {
		return await interaction
			.editReply({
				content: "Bruh did you just try to rob yourself",
			})
			.catch((err) => {})
	}

	if (getUser.wallet < 100) {
		return await interaction
			.editReply({
				content:
					"Bro your wallet balance is so low (less than 100 Dashcoins:tm:). I'm going to stop you right there.",
			})
			.catch((err) => {})
	}

	if (memberWallet.wallet < 100) {
		return await interaction
			.editReply({
				content:
					"Bruh the person you're trying to rob has less than 100 Dashcoins:tm: in their wallet.",
			})
			.catch((err) => {})
	}
	const randomValue = Math.floor(Math.random() * 100)

	let outcome

	if (randomValue >= 50) {
		outcome = "fail"
	} else if (30 <= randomValue && randomValue < 50) {
		outcome = "caught"
	} else if (randomValue < 30) {
		outcome = "success"
	}

	if (outcome === "fail") {
		await robCooldown.create({
			id: interaction.member.id,
			// expiry: new Date().getTime() + (150000 * 2),
			expiry: new Date().getTime() + 60000 * 10,
		})

		const failEmbed = new EmbedBuilder()
			.setTitle("🤦‍♂️ Robbery Failed 🤦‍♂️")
			.setDescription(
				`**${interaction.member.displayName}** failed to rob **${member.displayName}**!`
			)
			.setColor("Yellow")
			.setThumbnail(
				member.user.displayAvatarURL({
					size: 4096,
					dynamic: true,
				})
			)

		await interaction
			.editReply({
				embeds: [failEmbed],
			})
			.catch((err) => {})

		if (member.user.bot) return

		return member
			.send(
				`**${interaction.member.displayName}** attempted and **failed** to rob you!`
			)
			.catch((err) => {
				console.log(err)
			})
	} else if (outcome === "caught") {
		const coinsFined = Math.round(getUser.wallet * 0.1)
		const newRobberWallet = getUser.wallet - coinsFined

		await Economy.update(
			{ wallet: newRobberWallet },
			{ where: { id: interaction.member.id } }
		)

		const getWorkCooldown = await workCooldown.findOne({
			where: { id: interaction.member.id },
		})

		if (getWorkCooldown) {
			await workCooldown.destroy({
				where: { id: interaction.member.id },
			})
		}

		const getBegCooldown = await begCooldown.findOne({
			where: { id: interaction.member.id },
		})

		if (getBegCooldown) {
			await begCooldown.destroy({
				where: { id: interaction.member.id },
			})
		}

		const findBailbonds = await Items.findOne({
			where: {
				memberid: interaction.member.id,
				item: "Bail Bonds",
			},
		})

		if (findBailbonds) {
			workCooldown.create({
				id: interaction.member.id,
				// expiry: new Date().getTime() + (150000 * 2),
				expiry: new Date().getTime() + 60000 * 30,
			})

			begCooldown.create({
				id: interaction.member.id,
				// expiry: new Date().getTime() + (150000 * 2),
				expiry: new Date().getTime() + 60000 * 30,
			})

			await robCooldown.create({
				id: interaction.member.id,
				// expiry: new Date().getTime() + (150000 * 2),
				expiry: new Date().getTime() + 60000 * 30,
			})

			const caughtEmbed = new EmbedBuilder()
				.setTitle("👮 Robbery Foiled 🚨")
				.setDescription(
					`**${interaction.member.displayName}** attempted to rob **${member.displayName}** and was caught by the police! **${interaction.member.displayName}** was fined **${coinsFined}** Dashcoins:tm: and is in jail for **30** minutes.`
				)
				.setColor("Red")
				.setThumbnail(
					member.user.displayAvatarURL({
						size: 4096,
						dynamic: true,
					})
				)

			await interaction
				.editReply({
					embeds: [caughtEmbed],
				})
				.catch((err) => {})

			return interaction.member
				.send(
					`You were caught by the police. You were fined **${coinsFined}** Dashcoins:tm: and since you have bail bonds, you are unable to work, beg, or rob/heist for **30** minutes.`
				)
				.catch((err) => {
					console.log(err)
				})
		} else if (!findBailbonds) {
			workCooldown.create({
				id: interaction.member.id,
				// expiry: new Date().getTime() + (150000 * 2),
				expiry: new Date().getTime() + 60000 * 60,
			})

			begCooldown.create({
				id: interaction.member.id,
				// expiry: new Date().getTime() + (150000 * 2),
				expiry: new Date().getTime() + 60000 * 60,
			})

			await robCooldown.create({
				id: interaction.member.id,
				// expiry: new Date().getTime() + (150000 * 2),
				expiry: new Date().getTime() + 60000 * 60,
			})

			const caughtEmbed = new EmbedBuilder()
				.setTitle("👮 Robbery Foiled 🚨")
				.setDescription(
					`**${interaction.member.displayName}** attempted to rob **${member.displayName}** and was caught by the police! **${interaction.member.displayName}** was fined **${coinsFined}** Dashcoins:tm: and is in jail for **60** minutes.`
				)
				.setColor("Red")
				.setThumbnail(
					member.user.displayAvatarURL({
						size: 4096,
						dynamic: true,
					})
				)

			await interaction
				.editReply({
					embeds: [caughtEmbed],
				})
				.catch((err) => {})

			interaction.member
				.send(
					`You were caught by the police. You were fined **${coinsFined}** Dashcoins:tm: and you are unable to work, beg, or rob/heist for **60** minutes.`
				)
				.catch((err) => {
					console.log(err)
				})
		}

		if (member.user.bot) return

		return member
			.send(
				`**${interaction.member.displayName}** attempted to rob you but was caught by the police.`
			)
			.catch((err) => {
				console.log(err)
			})
	} else if (outcome === "success") {
		const coinsRobbed = Math.round(memberWallet.wallet * 0.1)
		const newRobberWallet = getUser.wallet + coinsRobbed
		const newVictimWallet = memberWallet.wallet - coinsRobbed

		await Economy.update(
			{ wallet: newVictimWallet },
			{ where: { id: member.id } }
		)
		await Economy.update(
			{ wallet: newRobberWallet },
			{ where: { id: interaction.member.id } }
		)

		await robCooldown.create({
			id: interaction.member.id,
			// expiry: new Date().getTime() + (150000 * 2),
			expiry: new Date().getTime() + 60000 * 10,
		})

		const successEmbed = new EmbedBuilder()
			.setTitle("💸 Robbery Successful 💸")
			.setDescription(
				`**${interaction.member.displayName}** has robbed **${coinsRobbed}** Dashcoins:tm: from **${member.displayName}**!`
			)
			.setColor("Green")
			.setThumbnail(
				member.user.displayAvatarURL({
					size: 4096,
					dynamic: true,
				})
			)

		await interaction
			.editReply({
				embeds: [successEmbed],
			})
			.catch((err) => {})

		if (member.user.bot) return

		return member
			.send(
				`**${interaction.member.displayName}** robbed **${coinsRobbed}** Dashcoins:tm: from you!`
			)
			.catch((err) => {
				console.log(err)
			})
	}
}
