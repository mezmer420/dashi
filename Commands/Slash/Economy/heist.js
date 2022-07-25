const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
	.setName("heist")
	.setDescription("Attempt to steal 10% of another user's bank balance")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("The user you want to heist")
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
	const getrobCooldown = await robCooldown.findOne({
		where: { id: interaction.member.id },
	})
	const robcooldownTime = getrobCooldown?.expiry

	if (getrobCooldown && robcooldownTime > new Date().getTime()) {
		return await interaction
			.editReply({
				content: `Wait **${ms(robcooldownTime - new Date().getTime(), {
					long: true,
				})}** before trying to rob/heist again!`,
			})
			.catch((err) => {})
	}

	if (getrobCooldown) {
		await robCooldown.destroy({ where: { id: interaction.member.id } })
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

	let memberBank = await Economy.findOne({ where: { id: member.id } })

	if (!memberBank) {
		memberBank = await Economy.create({
			id: member.id,
			wallet: 0,
			bank: 0,
		})
	}

	if (member.id === "956345939130482750") {
		return await interaction
			.editReply({
				content: "You can't heist me >:)",
			})
			.catch((err) => {})
	}

	if (member.id === interaction.member.id) {
		return await interaction
			.editReply({
				content: "Bruh did you just try to heist yourself",
			})
			.catch((err) => {})
	}

	if (getUser.bank < 100) {
		return await interaction
			.editReply({
				content:
					"Bro your bank balance is so low (less than 100 Dashcoins:tm:). I'm going to stop you right there.",
			})
			.catch((err) => {})
	}

	if (memberBank.bank < 100) {
		return await interaction
			.editReply({
				content:
					"Bruh the person you're trying to rob has less than 100 Dashcoins:tm: in their bank.",
			})
			.catch((err) => {})
	}

	const randomvalue = Math.floor(Math.random() * 100)

	const findHoldupEquipment = await Items.findOne({
		where: { memberid: interaction.member.id, item: "Holdup Equipment" },
	})

	let outcome
	let chance

	chance = findHoldupEquipment ? 65 : 40

	if (randomvalue >= chance) {
		outcome = "caught"
	} else if (randomvalue < chance) {
		outcome = "success"
	}

	if (outcome === "caught") {
		const coins_fined = Math.round(getUser.bank * 0.1)
		const newrobberBank = getUser.bank - coins_fined

		await Economy.update(
			{ bank: newrobberBank },
			{ where: { id: interaction.member.id } }
		)

		const getworkCooldown = await workCooldown.findOne({
			where: { id: interaction.member.id },
		})

		if (getworkCooldown) {
			await workCooldown.destroy({
				where: { id: interaction.member.id },
			})
		}

		const getbegCooldown = await begCooldown.findOne({
			where: { id: interaction.member.id },
		})

		if (getbegCooldown) {
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
				.setTitle("👮 Heist Foiled 🚨")
				.setDescription(
					`**${interaction.member.displayName}** attempted to heist **${member.displayName}** and was caught by the police! **${interaction.member.displayName}** was fined **${coins_fined}** Dashcoins:tm: and is in jail for **15** minutes.`
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
					`You were caught by the police. You were fined **${coins_fined}** Dashcoins:tm: and since you have bail bonds, you are unable to work, beg, or rob for **15** minutes.`
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
					`**${interaction.member.displayName}** attempted to rob **${member.displayName}** and was caught by the police! **${interaction.member.displayName}** was fined **${coins_fined}** Dashcoins:tm: and is in jail for **30** minutes.`
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
					`You were caught by the police. You were fined **${coins_fined}** Dashcoins:tm: and you are unable to work, beg, or rob for **30** minutes.`
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
		const coins_robbed = Math.round(memberBank.bank * 0.1)
		const newrobberBank = getUser.bank + coins_robbed
		const newvictimBank = memberBank.bank - coins_robbed

		await Economy.update(
			{ bank: newvictimBank },
			{ where: { id: member.id } }
		)
		await Economy.update(
			{ bank: newrobberBank },
			{ where: { id: interaction.member.id } }
		)

		await robCooldown.create({
			id: interaction.member.id,
			// expiry: new Date().getTime() + (150000 * 2),
			expiry: new Date().getTime() + 60000 * 10,
		})

		const successEmbed = new EmbedBuilder()
			.setTitle("💸 Heist Successful 💸")
			.setDescription(
				`**${interaction.member.displayName}** has heisted **${coins_robbed}** Dashcoins:tm: from **${member.displayName}**!`
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
				`**${interaction.member.displayName}** heisted **${coins_robbed}** Dashcoins:tm: from you!`
			)
			.catch((err) => {
				console.log(err)
			})
	}
}
