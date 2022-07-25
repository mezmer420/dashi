const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const ms = require("ms")
const wait = require("node:timers/promises").setTimeout

module.exports.data = new SlashCommandBuilder()
	.setName("rape")
	.setDescription("Rape someone; consent not needed")
	.addUserOption((option) =>
		option.setName("user").setDescription("User to rape").setRequired(true)
	)

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Items,
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
				)}** before trying to rape again!`,
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
			consent: false,
			children: 0,
		})
	}

	const getUser = await Fricking.findOne({
		where: { memberid: interaction.member.id },
	})

	if (!getUser) {
		await Fricking.create({
			memberid: interaction.member.id,
			consent: false,
			children: 0,
		})
	}

	if (targetMember === Member) {
		return await interaction
			.editReply({
				content:
					"You jacked off in bathroom... try again when you're ready to actually rape someone",
			})
			.catch((err) => {})
	}

	await interaction.channel.send({
		content: `<@${targetMember.id}> Rape attempt!`,
	})

	let timesclickedUser = 0

	let rowUser = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId(`but-${interaction.member.id}`)
			.setLabel("Attack!")
			.setStyle("Danger")
	)

	const sentMessageUser = await interaction.editReply({
		content: `<@${interaction.member.id}>\n**Rapist**\nClick the button (times clicked: ${timesclickedUser})`,
		components: [rowUser],
	})

	const filterUser = (i) => {
		const buttonId = i.customId
		const [command, memberId] = buttonId.split("-")

		return i.user.id === memberId
	}

	const collectorUser = await sentMessageUser.createMessageComponentCollector(
		{
			filterUser,
			time: 15000,
		}
	)

	collectorUser.on("collect", async (i) => {
		await i.deferUpdate().catch((err) => {})

		if (i.user.id !== interaction.member.id) return

		timesclickedUser = timesclickedUser + 1

		await sentMessageUser.edit({
			content: `<@${interaction.member.id}>\n**Rapist**\nClick the button (times clicked: ${timesclickedUser})`,
			components: [rowUser],
		})
	})

	collectorUser.on("end", async (i) => {
		rowUser.components[0].setStyle("Secondary")
		rowUser.components[0].setDisabled(true)

		await sentMessageUser.edit({
			content: `**Rapist**\nYou clicked the button ${timesclickedUser} times`,
			components: [rowUser],
		})
	})

	let timesclickedTarget = 0

	let rowTarget = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId(`but-${targetMember.id}`)
			.setLabel("Defend!")
			.setStyle("Primary")
	)

	const sentMessageTarget = await interaction.followUp({
		content: `<@${targetMember.id}>\n**Victim**\nClick the button (times clicked: ${timesclickedTarget})`,
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
			time: 15000,
		})

	collectorTarget.on("collect", async (i) => {
		await i.deferUpdate().catch((err) => {})

		if (i.user.id !== targetMember.id) return

		timesclickedTarget = timesclickedTarget + 1

		await sentMessageTarget.edit({
			content: `<@${targetMember.id}>\n**Victim**\nClick the button (times clicked: ${timesclickedTarget})`,
			components: [rowTarget],
		})
	})

	collectorTarget.on("end", async (i) => {
		rowTarget.components[0].setStyle("Secondary")
		rowTarget.components[0].setDisabled(true)

		await sentMessageTarget.edit({
			content: `**Victim**\nYou clicked the button ${timesclickedTarget} times`,
			components: [rowTarget],
		})
	})

	await wait(16000)

	let outcome

	if (timesclickedTarget + 2 >= timesclickedUser) {
		outcome = "fail"
	} else {
		outcome = "success"
	}

	// const outcomes = ["success", "fail"]
	// const outcome = outcomes[Math.floor(Math.random() * outcomes.length)]

	if (outcome === "success") {
		const findBirthControlPills = await Items.findOne({
			where: { memberid: targetMember.id, item: "Birth Control Pills" },
		})

		let protection

		if (findBirthControlPills) {
			protection = true
		} else if (!findBirthControlPills) {
			protection = false
		}

		if (protection === true) {
			await frickingCooldown.create({
				id: interaction.member.id,
				expiry: new Date().getTime() + 1000 * 60 * 30,
			})

			await interaction
				.followUp({
					content: `You just raped <@${targetMember.id}>!`,
				})
				.catch((err) => {})

			if (targetMember.user.bot) return

			return await targetMember
				.send(
					`**${Member.user.username}** just penetrated you (raped)! Because you had birth control pills, you used \`1x\` birth control pills, preventing you from getting impregnated.`
				)
				.catch((err) => {
					console.log(err)
				})
		} else if (protection === false) {
			await Fricking.update(
				{ children: getTargetUser.children + 1 },
				{ where: { memberid: targetMember.id } }
			)

			await frickingCooldown.create({
				id: interaction.member.id,
				expiry: new Date().getTime() + 1000 * 60 * 30,
			})

			const genders = ["boy", "girl"]
			const gender = genders[Math.floor(Math.random() * genders.length)]

			await interaction
				.followUp({
					content: `You just raped <@${targetMember.id}>, who is now the forced parent of a baby ${gender}!`,
				})
				.catch((err) => {})

			if (targetMember.user.bot) return

			return await targetMember
				.send(
					`**${Member.user.username}** just penetrated you (raped)! You are now forced parent of a baby ${gender}!`
				)
				.catch((err) => {
					console.log(err)
				})
		}
	} else if (outcome === "fail") {
		await interaction
			.followUp({
				content: `You attempted to rape <@${targetMember.id}>, but failed!`,
			})
			.catch((err) => {})

		await frickingCooldown.create({
			id: interaction.member.id,
			expiry: new Date().getTime() + 1000 * 60 * 30,
		})

		if (targetMember.user.bot) return

		return await targetMember
			.send(
				`**${Member.user.username}** just tried to rape you! (failed)`
			)
			.catch((err) => {
				console.log(err)
			})
	}
}
