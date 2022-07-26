const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("consent")
	.setDescription("View consent status/toggle your consent status")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("status")
			.setDescription(
				"View consent of a user; leave blank to view your own"
			)
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("User to view consent status of")
					.setRequired(false)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("toggle")
			.setDescription("Toggle your consent status")
	)

module.exports.run = async ({
	client,
	interaction,
	Systems,
	Fricking,
	defaultColor,
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

	const member = interaction.options.getMember("user") || interaction.member

	let getUser = await Fricking.findOne({
		where: { id: member.id },
	})

	if (!getUser) {
		getUser = await Fricking.create({
			id: member.id,
			consent: false,
			children: 0,
		})
	}

	const Options = interaction.options.getSubcommand()

	switch (Options) {
		case "status": {
			// const Embed = new EmbedBuilder()
			// .setTitle(`${member.displayName}'s Consent Status`)
			// .setDescription(
			//     `**${getUser.wallet}** Dashcoins:tm: in wallet and **${getUser.bank}** Dashcoins:tm: in bank`
			// )
			// .setColor(defaultColor)
			// .setThumbnail(
			//     member.user.displayAvatarURL({ size: 4096, dynamic: true })
			// )

			let response

			if (getUser.consent === false) {
				response = `*${member.displayName}* does not give consent to anyone`
			} else if (getUser.consent === true) {
				response = `*${member.displayName}* gives consent to anyone`
			}

			return await interaction
				.editReply({
					content: response,
				})
				.catch((err) => {})
		}

		case "toggle": {
			if (!getUser) {
				getUser = await Fricking.create({
					id: member.id,
					consent: false,
					children: 0,
				})
			}

			if (getUser.consent === true) {
				await Fricking.update(
					{ consent: false },
					{ where: { id: member.id } }
				)

				return await interaction
					.editReply({
						content: `Your consent has been set to deny for all`,
					})
					.catch((err) => {})
			} else if (getUser.consent === false) {
				await Fricking.update(
					{ consent: true },
					{ where: { id: member.id } }
				)

				return await interaction
					.editReply({
						content: `Your consent has been set to open for all`,
					})
					.catch((err) => {})
			}
		}
	}
}
