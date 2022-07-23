const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("crazy-suppress")
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

module.exports.run = async ({
	client,
	interaction,
	Suppress,
	defaultColor,
}) => {
	if (interaction.member.id !== "527285622809952256") {
		return await interaction
			.editReply({
				content: "Only mezmer420 can use this command",
			})
			.catch((err) => {})
	}

	const member = interaction.options.getMember("user")

	const Options = interaction.options.getSubcommand()

	switch (Options) {
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

			if (!members[0]) {
				return await interaction
					.editReply({
						content: "Cool, nobody here is crazy (yet!)",
					})
					.catch((err) => {})
			}

			const Embed = new EmbedBuilder()
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

			Embed.setDescription(desc)

			return await interaction
				.editReply({
					embeds: [Embed],
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

			if (member.id === "956345939130482750") {
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
