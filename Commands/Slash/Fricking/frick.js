const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
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
			consent: false,
			children: 0,
		})
	}

	let getUser = await Fricking.findOne({
		where: { memberid: interaction.member.id },
	})

	if (!getUser) {
		getUser = await Fricking.create({
			memberid: interaction.member.id,
			consent: false,
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

	if (getTargetUser.consent === false) {
		return await interaction
			.editReply({
				content: `*${targetMember.displayName}* denied to give consent!`,
			})
			.catch((err) => {})
	}

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
		.editReply({
			content: `You just fricked <@${targetMember.id}>! You are both now the parents of a baby ${gender}!`,
		})
		.catch((err) => {})

	if (targetMember.user.bot) return

	await targetMember
		.send(
			`**${Member.user.username}** just fricked you! You are both now the parents of a baby ${gender}!`
		)
		.catch((err) => {
			console.log(err)
		})
}
