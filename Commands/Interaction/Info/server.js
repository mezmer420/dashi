const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js")
const moment = require("moment")

module.exports.category = "Info"

module.exports.data = new SlashCommandBuilder()
	.setName("server")
	.setDescription("View this server's info/icon")
	.addSubcommand((subcommand) =>
		subcommand.setName("info").setDescription("View info of this server")
	)
	.addSubcommand((subcommand) =>
		subcommand.setName("icon").setDescription("View this server's icon")
	)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const guild = client.guilds.resolve(interaction.guildId)

	const icon = guild.iconURL({ size: 4096, dynamic: true })

	const options = interaction.options.getSubcommand()

	switch (options) {
		case "info": {
			const createdTime = new Date(
				guild.createdTimestamp + 5 * 3600000
			).toLocaleString()

			const humans = await guild.members.cache.filter(
				(member) => !member.user.bot
			).size
			const bots = await guild.members.cache.filter(
				(member) => member.user.bot
			).size

			const active = guild.members.cache.filter((member) =>
				["online", "idle", "dnd"].includes(member.presence?.status)
			).size

			const totalChannels = await guild.channels.cache.filter(
				(ch) =>
					ch.type === ChannelType.GuildText ||
					ch.type === ChannelType.GuildVoice
			).size

			const categories = await guild.channels.cache.filter(
				(ch) => ch.type === ChannelType.GuildCategory
			).size
			const CategoryOrCategories =
				categories === 1 ? "category" : "categories"

			const publicThreads = await guild.channels.cache.filter(
				(ch) => ch.type === ChannelType.PublicThread
			).size
			const threadOrThreads = publicThreads === 1 ? "thread" : "threads"

			const textChannels = await guild.channels.cache.filter(
				(ch) => ch.type === ChannelType.GuildText
			).size
			const textChannelOrChannels =
				textChannels === 1 ? "channel" : "channels"

			const voiceChannels = await guild.channels.cache.filter(
				(ch) => ch.type === ChannelType.GuildVoice
			).size
			const voiceChannelOrChannels =
				voiceChannels === 1 ? "channel" : "channels"

			const regularEmojis = await guild.emojis.cache.filter(
				(e) => !e.animated
			).size
			const animatedEmojis = await guild.emojis.cache.filter(
				(e) => e.animated
			).size

			const levelInfo =
				guild.premiumTier === 0
					? "No level"
					: `Level ${guild.premiumTier}`

			const boosts = guild.premiumSubscriptionCount
			const boostsInfo = boosts ? `${boosts} total boosts` : "No boosts"

			const guildFeatures = guild.features
			const guildFeaturesInfo =
				guildFeatures.length === 0
					? "No VIP perks"
					: guildFeatures
							.map(
								(element) =>
									`${element.charAt(0)}${element
										.substring(1)
										.toLowerCase()
										.replace(/_/g, " ")}`
							)
							.join(", ")

			const embed = new EmbedBuilder()
				.setColor(defaultColor)
				.setTitle(`${guild.name}`)
				.addFields(
					{ name: "ID", value: `${guild.id}`, inline: true },
					{
						name: "Owner",
						value: `<@${guild.ownerId}>`,
						inline: true,
					},
					{
						name: "Created at",
						value: `${createdTime}`,
						inline: true,
					},
					{
						name: "Members",
						value: `${guild.memberCount} total:\n${humans} humans\n${bots} bots;\nCurrently not offline: ${active}`,
						inline: true,
					},
					{
						name: "Total Roles",
						value: `${guild.roles.cache.size}`,
						inline: true,
					},
					{
						name: "Channels (excluding threads)",
						value: `${totalChannels} total in ${categories} ${CategoryOrCategories}:\n${textChannels} text ${textChannelOrChannels}\n${voiceChannels} voice ${voiceChannelOrChannels}\n————————\n${publicThreads} public ${threadOrThreads}`,
						inline: true,
					},
					{
						name: "Emojis",
						value: `${guild.emojis.cache.size} total:\n${regularEmojis} regular\n${animatedEmojis} animated`,
						inline: true,
					},
					{
						name: "Boosts",
						value: `${levelInfo}\n${boostsInfo}`,
						inline: true,
					},
					{
						name: "VIP Perks",
						value: `${guildFeaturesInfo}`,
						inline: true,
					}
				)
				.setThumbnail(icon)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}

		case "icon": {
			const embed = new EmbedBuilder()
				.setColor(defaultColor)
				.setTitle(`${guild.name}`)
				.setImage(icon)

			return await interaction
				.editReply({
					embeds: [embed],
				})
				.catch((err) => {})
		}
	}
}
