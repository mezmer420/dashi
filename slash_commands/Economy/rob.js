const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
	.setName("rob")
	.setDescription("Attempt to rob 10% of another user's wallet balance")
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
	const getrobCooldown = await robCooldown.findOne({
		where: { id: interaction.member.id },
	})
	const robcooldownTime = getrobCooldown?.expiry

	if (getrobCooldown && robcooldownTime > new Date().getTime()) {
		return await interaction
			.editReply({
				content: `Wait **${ms(robcooldownTime - new Date().getTime(), {
					long: true,
				})}** before trying to rob again!`,
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

	let memberWallet = await Economy.findOne({ where: { id: member.id } })

	if (!memberWallet) {
		memberWallet = await Economy.create({
			id: member.id,
			wallet: 0,
			bank: 0,
		})
	}

	if (getUser.wallet < 100 || memberWallet.wallet < 100) {
		// if(getUser.wallet = 0) interaction.editReply({
		//     content: "Bruh your wallet is empty. I'm going to stop you right there and urge you not to start off your money-making career by being a lawbreaker."
		// })
		if (getUser.wallet < 100) {
			return await interaction
				.editReply({
					content:
						"Bro your wallet balance is so low (less than 100 Dashcoins:tm:). I'm going to stop you right there.",
				})
				.catch((err) => {})
		}
		// else if(memberWallet.wallet = 0) interaction.editReply({
		// content: "Bruh the person you're trying to rob has **0** coins in his wallet. At least show some decency for the homeless."
		// })
		else if (memberWallet.wallet < 100) {
			return await interaction
				.editReply({
					content:
						"Bruh the person you're trying to rob has less than 100 Dashcoins:tm: in their wallet. Why bother trying to steal 10 Dashcoins:tm: at most?",
				})
				.catch((err) => {})
		}
	} else {
		if (member.id === interaction.member.id) {
			return await interaction
				.editReply({
					content: "bruh did you just try to rob yourself",
				})
				.catch((err) => {})
		}

		if (member.id === "956345939130482750") {
			return await interaction
				.editReply({
					content: "you can't rob me >:)",
				})
				.catch((err) => {})
		} else {
			const randomvalue = Math.floor(Math.random() * 100)

			if (randomvalue >= 30) {
				await robCooldown.create({
					id: interaction.member.id,
					// expiry: new Date().getTime() + (150000 * 2),
					expiry: new Date().getTime() + 60000 * 10,
				})

				member.send(
					`**${interaction.member.displayName}** attempted and **failed** to rob you!`
				)

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

				return await interaction
					.editReply({
						embeds: [failEmbed],
					})
					.catch((err) => {})

				// console.log(randomvalue)
			} else if (20 <= randomvalue && randomvalue < 30) {
				const coins_fined = Math.round(getUser.wallet * 0.1)
				const newrobberWallet = getUser.wallet - coins_fined

				await Economy.update(
					{ wallet: newrobberWallet },
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
						.setTitle("👮 Robbery Foiled 🚨")
						.setDescription(
							`**${interaction.member.displayName}** attempted to rob **${member.displayName}** and was caught by the police! **${interaction.member.displayName}** was fined **${coins_fined}** Dashcoins:tm: and is in jail for **15** minutes.`
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

					interaction.member.send(
						`You were caught by the police. You were fined **${coins_fined}** Dashcoins:tm: and since you have bail bonds, you are unable to work, beg, or rob for **15** minutes.`
					)
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

					interaction.member.send(
						`You were caught by the police. You were fined **${coins_fined}** Dashcoins:tm: and you are unable to work, beg, or rob for **30** minutes.`
					)
				}

				member.send(
					`**${interaction.member.displayName}** attempted to rob you but was caught by the police.`
				)

				// console.log(randomvalue)
			} else if (randomvalue < 20) {
				const coins_robbed = Math.round(memberWallet.wallet * 0.1)
				const newrobberWallet = getUser.wallet + coins_robbed
				const newvictimWallet = memberWallet.wallet - coins_robbed

				await Economy.update(
					{ wallet: newvictimWallet },
					{ where: { id: member.id } }
				)
				await Economy.update(
					{ wallet: newrobberWallet },
					{ where: { id: interaction.member.id } }
				)

				await robCooldown.create({
					id: interaction.member.id,
					// expiry: new Date().getTime() + (150000 * 2),
					expiry: new Date().getTime() + 60000 * 10,
				})

				member.send(
					`**${interaction.member.displayName}** robbed **${coins_robbed}** Dashcoins:tm: from you!`
				)

				const successEmbed = new EmbedBuilder()
					.setTitle("💸 Robbery Successful 💸")
					.setDescription(
						`**${interaction.member.displayName}** has robbed **${coins_robbed}** Dashcoins:tm: from **${member.displayName}**!`
					)
					.setColor("Green")
					.setThumbnail(
						member.user.displayAvatarURL({
							size: 4096,
							dynamic: true,
						})
					)

				return await interaction
					.editReply({
						embeds: [successEmbed],
					})
					.catch((err) => {})

				// console.log(randomvalue)
			}
		}
	}
}
