const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js")

module.exports.category = "Government"

module.exports.data = new SlashCommandBuilder()
	.setName("infraction")
	.setDescription("Modify infractions")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("remove")
			.setDescription("Remove a member's infraction")
			.addIntegerOption((option) =>
				option
					.setName("infractionid")
					.setDescription("Infraction ID")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("edit")
			.setDescription("Edit a member's infraction's nature")
			.addIntegerOption((option) =>
				option
					.setName("infractionid")
					.setDescription("Infraction ID")
					.setRequired(true)
			)
			.addStringOption((option) =>
				option
					.setName("nature")
					.setDescription("New nature to set")
					.setMinLength(1)
					.setRequired(true)
			)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

module.exports.run = async ({
	client,
	interaction,
	Infraction,
	defaultColor,
}) => {
	const infractionId = interaction.options.getInteger("infractionid")

	const getInfraction = await Infraction.findOne({
		where: { infractionid: infractionId },
	})

	if (!getInfraction) {
		return await interaction
			.editReply({
				content: `Couldn't find an infraction on record with ID **${infractionId}**`,
			})
			.catch((err) => {})
	}

	if (
		interaction.member.id === "826841451945787412" && // choc
		getInfraction.memberid === "826841451945787412" // choc
	) {
		return await interaction
			.editReply({
				content: "nice try choc",
			})
			.catch((err) => {})
	}

	if (
		interaction.member.id === "762133129209053244" && // vcash
		getInfraction.memberid === "762133129209053244" // vcash
	) {
		return await interaction
			.editReply({
				content: "nice try vcash",
			})
			.catch((err) => {})
	}

	const logs = await client.channels.cache.get("955948174894325782")

	const options = interaction.options.getSubcommand()

	switch (options) {
		case "remove": {
			await Infraction.destroy({ where: { infractionid: infractionId } })

			const member = await client.users.fetch(`${getInfraction.memberid}`)

			const embed = new EmbedBuilder()
				.setColor(defaultColor)
				.setAuthor({
					name: `${member.tag}'s infraction *${getInfraction.nature}* has been removed`,
					iconURL: `${member.displayAvatarURL({
						size: 4096,
						dynamic: true,
					})}`,
				})
				.setDescription(`Removed By: <@${interaction.member.id}>`)
				.setTimestamp()

			await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})

			return logs
				.send({
					embeds: [embed],
				})
				.catch((err) => {
					console.log(err)
				})
		}

		case "edit": {
			const nature = interaction.options.getString("nature")

			const oldNature = getInfraction.nature

			await Infraction.update(
				{ nature: nature },
				{ where: { infractionid: infractionId } }
			)

			const member = await client.users.fetch(`${getInfraction.memberid}`)

			const embed = new EmbedBuilder()
				.setColor(defaultColor)
				.setAuthor({
					name: `${member.tag}'s infraction *${getInfraction.nature}* has been updated`,
					iconURL: `${member.displayAvatarURL({
						size: 4096,
						dynamic: true,
					})}`,
				})
				.setDescription(
					`Updated By: <@${interaction.member.id}>\n**${oldNature}**\n->\n**${nature}**`
				)
				.setTimestamp()

			await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})

			return logs
				.send({
					embeds: [embed],
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
}
