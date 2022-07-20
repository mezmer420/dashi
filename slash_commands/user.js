const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("user")
	.setDescription("View info/the avatar of a server member")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("info")
			.setDescription("View info of a user; leave blank to view your own")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("User to view info of")
					.setRequired(false)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("avatar")
			.setDescription(
				"View the avatar of a user; leave blank to view your own"
			)
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription(
						"User to view the avatar of; leave blank to view your own"
					)
					.setRequired(false)
			)
	)

module.exports.run = async ({ client, interaction, Infraction }) => {
	const member = interaction.options.getMember("user") || interaction.member

	const avatar = member.user.displayAvatarURL({ size: 4096, dynamic: true })

	const Options = interaction.options.getSubcommand()

	switch (Options) {
		case "info": {
			const createdts = new Date(
				member.user.createdTimestamp + 5 * 3600000
			)
			const createdtime = createdts.toLocaleString()

			const joinedts = new Date(member.joinedTimestamp + 5 * 3600000)
			const joinedtime = joinedts.toLocaleString()

			let nick = member.nickname

			if (!nick) {
				nick = `${member.user.username}`
			}

			const boostingts = new Date(
				member.premiumSinceTimestamp + 6 * 3600000
			)
			let boostingtime = boostingts.toLocaleString()

			if (!member.premiumSinceTimestamp) {
				boostingtime = "Not boosting"
			}

			let bot = "No"
			if (member.user.bot === true) {
				bot = "Yes"
			}

			const infractiondata = await Infraction.findAll({
				where: { memberid: member.id },
			})

			let infractions = []

			for (let obj of infractiondata) {
				infractions.push(obj)
			}

			const Embed = new EmbedBuilder()
				.setColor("Random")
				.setAuthor({ name: `${member.user.tag}`, iconURL: `${avatar}` })
				.addFields(
					{ name: "User ID", value: `${member.id}`, inline: true },
					{ name: "Server Nickname", value: `${nick}`, inline: true },
					{ name: "Bot", value: `${bot}`, inline: true },
					{
						name: "Account Created at",
						value: `${createdtime}`,
						inline: true,
					},
					{
						name: "Joined Server at",
						value: `${joinedtime}`,
						inline: true,
					},
					{
						name: "Highest Role",
						value: `${member.roles.highest}`,
						inline: true,
					},
					{
						name: "Boosting Server Since",
						value: `${boostingtime}`,
						inline: true,
					},
					{
						name: "Infractions",
						value: `${infractions.length}`,
						inline: true,
					}
				)
				.setThumbnail(avatar)

			const memberPerms = (await member.permissions).toArray()

			if (memberPerms.length > 0) {
				const perms = memberPerms.join(", ")
				Embed.addFields({
					name: "Server Permissions",
					value: `${perms}`,
					inline: false,
				})
			}

			return await interaction
				.editReply({
					embeds: [Embed],
				})
				.catch((err) => {})
		}

		case "avatar": {
			const Embed = new EmbedBuilder()
				.setTitle(`${member.displayName}'s Avatar`)
				.setColor("Random")
				.setImage(avatar)

			return await interaction
				.editReply({
					embeds: [Embed],
				})
				.catch((err) => {})
		}
	}
}
