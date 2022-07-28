const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const ms = require("ms")

module.exports.data = new SlashCommandBuilder()
	.setName("frick")
	.setDescription("Frick someone; consent needed")
	.addUserOption((option) =>
		option.setName("user").setDescription("User to frick").setRequired(true)
	)

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Fricking,
	frickingCooldown,
}) => {
	const getFricking = await Systems.findOne({
		where: { system: "Fricking" },
	})

	if (getFricking.online === false) {
		return await interaction
			.editReply({
				content: "The Fricking system is currently disabled",
			})
			.catch((err) => {})
	}

	const getfrickingCooldown = await frickingCooldown.findOne({
		where: { id: interaction.member.id },
	})

	const frickingcooldownTime = getfrickingCooldown?.expiry

	if (getfrickingCooldown && frickingcooldownTime > new Date().getTime()) {
		return await interaction
			.editReply({
				content: `Wait **${ms(
					frickingcooldownTime - new Date().getTime(),
					{
						long: true,
					}
				)}** before trying to frick again!`,
			})
			.catch((err) => {})
	} else if (getfrickingCooldown) {
		await frickingCooldown.destroy({ where: { id: interaction.member.id } })
	}

	const targetMember = interaction.options.getMember("user")
	const Member = interaction.member

	let getTargetUser = await Fricking.findOne({
		where: { memberid: targetMember.id },
	})

	if (!getTargetUser) {
		getTargetUser = await Fricking.create({
			memberid: targetMember.id,
			children: 0,
		})
	}

	let getUser = await Fricking.findOne({
		where: { memberid: interaction.member.id },
	})

	if (!getUser) {
		getUser = await Fricking.create({
			memberid: interaction.member.id,
			children: 0,
		})
	}

	if (targetMember === Member) {
		return await interaction
			.editReply({
				content:
					"You jacked off in the bathroom... try again when you're ready to actually frick someone",
			})
			.catch((err) => {})
	}

	const sentMessageUser = await interaction
		.editReply({
			content: "Awaiting consent...",
		})
		.catch((err) => {})

	await interaction.channel
		.send({
			content: `<@${targetMember.id}> Frick attempt!`,
		})
		.catch((err) => {
			console.log(err)
		})

	let rowTarget = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId(`consent-${targetMember.id}`)
			.setLabel("Give consent")
			.setStyle("Primary"),
		new ButtonBuilder()
			.setCustomId(`deny-${targetMember.id}`)
			.setLabel("Deny consent")
			.setStyle("Danger")
	)

	const sentMessageTarget = await interaction.followUp({
		content: `<@${targetMember.id}>\nDo you consent to sex with <@${interaction.member.id}>? (30 seconds to answer)`,
		components: [rowTarget],
	})

	const filterTarget = (i) => {
		const buttonId = i.customId
		const [command, memberId] = buttonId.split("-")

		return i.user.id === memberId
	}

	const collectorTarget =
		await sentMessageTarget.createMessageComponentCollector({
			filterTarget,
			time: 30000,
		})

	collectorTarget.on("collect", async (i) => {
		await i.deferUpdate().catch((err) => {})

		if (i.user.id !== targetMember.id) return

		const buttonId = i.customId
		const [command, memberId] = buttonId.split("-")

		if (command === "consent") {
			const existingTargetChildren = getTargetUser.children

			await Fricking.update(
				{ children: existingTargetChildren + 1 },
				{ where: { memberid: targetMember.id } }
			)

			const existingUserChildren = getUser.children

			await Fricking.update(
				{ children: existingUserChildren + 1 },
				{ where: { memberid: interaction.member.id } }
			)

			await frickingCooldown.create({
				id: interaction.member.id,
				expiry: new Date().getTime() + 60000 * 30,
			})

			const genders = ["boy", "girl"]
			const gender = genders[Math.floor(Math.random() * genders.length)]

			await interaction
				.followUp({
					content: `You just fricked <@${targetMember.id}>! You are both now the parents of a baby ${gender}!`,
				})
				.catch((err) => {})
		} else if (command === "deny") {
			await sentMessageUser
				.edit({
					content: `<@${targetMember.id}> denied consent`,
				})
				.catch((err) => {})

			await interaction
				.followUp({
					content: `*${targetMember.displayName}* denied to give consent`,
				})
				.catch((err) => {})
		}

		rowTarget.components[0].setDisabled(true)
		rowTarget.components[1].setDisabled(true)

		return await sentMessageTarget
			.edit({
				content: `<@${targetMember.id}>\nDo you consent to sex with <@${interaction.member.id}>? (30 seconds to answer)`,
				components: [rowTarget],
			})
			.catch((err) => {})
	})

	collectorTarget.on("end", async (collected, reason) => {
		if (reason === "time") {
			rowTarget.components[0].setDisabled(true)
			rowTarget.components[1].setDisabled(true)

			return await sentMessageTarget
				.edit({
					content: `<@${targetMember.id}>\nDo you consent to sex with <@${interaction.member.id}>? (time up)`,
					components: [rowTarget],
				})
				.catch((err) => {})
		}
	})
}
