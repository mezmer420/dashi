const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js")
const moment = require("moment")

module.exports.data = new SlashCommandBuilder()
	.setName("server")
	.setDescription("View this server's info/icon")
	.addSubcommand((subcommand) =>
		subcommand.setName("info").setDescription("View info of this server")
	)
	.addSubcommand((subcommand) =>
		subcommand.setName("icon").setDescription("View this server's icon")
	)

module.exports.category = "Info"

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const guild = client.guilds.resolve(interaction.guildId)

	const icon = guild.iconURL({ size: 4096, dynamic: true })

	const Options = interaction.options.getSubcommand()

	switch (Options) {
		case "info": {
			const createdts = new Date(guild.createdTimestamp + 5 * 3600000)
			const createdtime = createdts.toLocaleString()

			const humans = await guild.members.cache.filter(
				(member) => !member.user.bot
			).size
			const bots = await guild.members.cache.filter(
				(member) => member.user.bot
			).size

			const active = await guild.members.cache.filter(
				(member) =>
					member.presence?.status === "online" ||
					member.presence?.status === "idle" ||
					member.presence?.status === "dnd"
			).size

			const totalchannels = await guild.channels.cache.filter(
				(ch) =>
					ch.type === ChannelType.GuildText ||
					ch.type === ChannelType.GuildVoice
			).size

			const categories = await guild.channels.cache.filter(
				(ch) => ch.type === ChannelType.GuildCategory
			).size

			let CategoryorCategories = "categories"

			if (categories === 1) {
				CategoryorCategories = "category"
			}

			const publicthreads = await guild.channels.cache.filter(
				(ch) => ch.type === ChannelType.GuildPublicThread
			).size

			let ThreadorThreads = "threads"

			if (publicthreads === 1) {
				ThreadorThreads = "thread"
			}

			const textchannels = await guild.channels.cache.filter(
				(ch) => ch.type === ChannelType.GuildText
			).size

			let textChannelorChannels = "channels"

			if (textchannels === 1) {
				textChannelorChannels = "channel"
			}

			const voicechannels = await guild.channels.cache.filter(
				(ch) => ch.type === ChannelType.GuildVoice
			).size

			let voiceChannelorChannels = "channels"

			if (voicechannels === 1) {
				voiceChannelorChannels = "channel"
			}

			const regularemojis = await guild.emojis.cache.filter(
				(e) => !e.animated
			).size
			const animatedemojis = await guild.emojis.cache.filter(
				(e) => e.animated
			).size

			let levelinfo = `Level ${guild.premiumTier}`

			if (guild.premiumTier === 0) {
				levelinfo = "No level"
			}

			const boosts = guild.premiumSubscriptionCount

			let boostsinfo = `${boosts} total boosts`

			if (!boosts) {
				boostsinfo = "No boosts"
			}

			const guildfeatures = guild.features
			const guildfeaturestoLowerCase = guildfeatures.map((element) => {
				return element.charAt(0) + element.substring(1).toLowerCase()
			})
			const vipperks = guildfeaturestoLowerCase
				.join(", ")
				.replace(/_/g, " ")

			let guildfeaturesinfo = vipperks

			if (guildfeatures.length === 0) {
				guildfeaturesinfo = "No VIP perks"
			}

			const Embed = new EmbedBuilder()
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
						value: `${createdtime}`,
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
						value: `${totalchannels} total in ${categories} ${CategoryorCategories}:\n${textchannels} text ${textChannelorChannels}\n${voicechannels} voice ${voiceChannelorChannels}\n————————\n${publicthreads} public ${ThreadorThreads}`,
						inline: true,
					},
					{
						name: "Emojis",
						value: `${guild.emojis.cache.size} total:\n${regularemojis} regular\n${animatedemojis} animated`,
						inline: true,
					},
					{
						name: "Boosts",
						value: `${levelinfo}\n${boostsinfo}`,
						inline: true,
					},
					{
						name: "VIP Perks",
						value: `${guildfeaturesinfo}`,
						inline: true,
					}
				)
				.setThumbnail(icon)

			return await interaction
				.editReply({
					embeds: [Embed],
				})
				.catch((err) => {})
		}

		case "icon": {
			const Embed = new EmbedBuilder()
				.setColor(defaultColor)
				.setTitle(`${guild.name}`)
				.setImage(icon)

			return await interaction
				.editReply({
					embeds: [Embed],
				})
				.catch((err) => {})
		}
	}
}
