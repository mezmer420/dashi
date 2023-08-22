const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActivityType,
	PermissionFlagsBits,
} = require("discord.js")

module.exports.category = "mezmer420"

module.exports.data = new SlashCommandBuilder()
	.setName("setpresence")
	.setDescription("Set my presence")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("status")
			.setDescription("Set my status")
			.addStringOption((option) =>
				option
					.setName("status")
					.setDescription("The status to set to")
					.setRequired(true)
					.addChoices(
						{ name: "online", value: "online" },
						{ name: "idle", value: "idle" },
						{ name: "dnd", value: "dnd" },
						{ name: "invisible", value: "invisible" }
					)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("activity")
			.setDescription("Set my activity")
			.addIntegerOption((option) =>
				option
					.setName("activity")
					.setDescription("The activity type to set to")
					.setRequired(true)
					.addChoices(
						{ name: "Playing", value: ActivityType.Playing },
						{ name: "Listening", value: ActivityType.Listening },
						{ name: "Watching", value: ActivityType.Watching },
						{ name: "Streaming", value: ActivityType.Streaming },
						{ name: "Competing", value: ActivityType.Competing }
					)
			)
			.addStringOption((option) =>
				option
					.setName("name")
					.setDescription("The activity name to set to")
					.setRequired(true)
			)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports.run = async ({ client, interaction }) => {
	const options = interaction.options.getSubcommand()

	switch (options) {
		case "status": {
			const status = interaction.options.getString("status")

			await client.user.setStatus(status)

			return await interaction
				.editReply({
					content: `✅ | Updated status to **${status}**`,
				})
				.catch((err) => {})
		}

		case "activity": {
			const activityType = interaction.options.getInteger("activity")
			const activityName = interaction.options.getString("name")

			await client.user.setActivity({
				name: activityName,
				type: activityType,
			})

			// Playing **e**
			// Listening to **e**
			// Watching **e**
			// Playing **e** (live on twitch)
			// Competing in **e**

			let activity

			if (activityType === ActivityType.Playing) {
				activity = "Playing"
			} else if (activityType === ActivityType.Listening) {
				activity = "Listening to"
			} else if (activityType === ActivityType.Watching) {
				activity = "Watching"
			} else if (activityType === ActivityType.Streaming) {
				activity = "Playing"
			} else if (activityType === ActivityType.Competing) {
				activity = "Competing in"
			}

			return await interaction
				.editReply({
					content: `✅ | Updated activity to **${activity} ${activityName}**`,
				})
				.catch((err) => {})
		}
	}
}
