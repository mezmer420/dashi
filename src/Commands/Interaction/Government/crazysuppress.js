const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js")

module.exports.category = "Government"

module.exports.data = new SlashCommandBuilder()
	.setName("crazysuppress")
	.setDescription("View or add/remove crazy users")
	.addSubcommand((subcommand) =>
		subcommand.setName("view").setDescription("View crazy users")
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("add")
			.setDescription("Add a crazy user")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("User to add as crazy")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("remove")
			.setDescription("Remove a crazy user")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("User to remove as crazy")
					.setRequired(true)
			)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

module.exports.run = async ({
	client,
	interaction,
	Suppress,
	defaultColor,
}) => {
	const member = interaction.options.getMember("user")

	const options = interaction.options.getSubcommand()

	switch (options) {
		case "view": {
			const data = await Suppress.findAll({})

			let members = []

			for (let obj of data) {
				if (
					interaction.guild.members.cache
						.map((member) => member.id)
						.includes(obj.memberid)
				) {
					members.push(obj)
				}
			}

			if (members.length === 0) {
				return await interaction
					.editReply({
						content: "Cool, nobody here is crazy (yet!)",
					})
					.catch((err) => {})
			}

			const embed = new EmbedBuilder()
				.setTitle("Crazy Users")
				.setColor(defaultColor)
				.setTimestamp()

			members = members.sort(function (b, a) {
				return a.memberid - b.memberid
			})

			let pos = 0

			for (let obj of members) {
				pos++
			}

			let desc = ""

			for (let i = 0; i < members.length; i++) {
				const user = client.users.cache.get(members[i].memberid)

				if (!user) return

				desc += `<@${user.id}>\n`
			}

			embed.setDescription(desc)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}

		case "add": {
			const findUser = await Suppress.findOne({
				where: { memberid: member.id },
			})

			if (findUser) {
				return await interaction
					.editReply({
						content: `<@${member.id}> is already a crazy user`,
					})
					.catch((err) => {})
			}

			if (member.id === client.user.id) {
				return await interaction
					.editReply({
						content: "I'm not crazy!",
					})
					.catch((err) => {})
			}

			await Suppress.create({
				memberid: member.id,
			})

			return await interaction
				.editReply({
					content: `<@${member.id}> has been added as a crazy user`,
				})
				.catch((err) => {})
		}

		case "remove": {
			const findUser = await Suppress.findOne({
				where: { memberid: member.id },
			})

			if (!findUser) {
				return await interaction
					.editReply({
						content: `<@${member.id}> wasn't already a crazy user`,
					})
					.catch((err) => {})
			}

			await Suppress.destroy({ where: { memberid: member.id } })

			return await interaction
				.editReply({
					content: `<@${member.id}> has been removed as a crazy user`,
				})
				.catch((err) => {})
		}
	}
}
