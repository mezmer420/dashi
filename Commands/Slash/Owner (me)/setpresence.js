const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActivityType,
} = require("discord.js")

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

module.exports.category = "Owner"

module.exports.run = async ({ client, interaction }) => {
	if (interaction.member.id !== "527285622809952256") {
		return await interaction
			.editReply({
				content: "Only mezmer420 can use this command",
			})
			.catch((err) => {})
	}

	const Options = interaction.options.getSubcommand()

	switch (Options) {
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
			const activitytype = interaction.options.getInteger("activity")
			const activityname = interaction.options.getString("name")

			await client.user.setActivity({
				name: activityname,
				type: activitytype,
			})

			// Playing **e**
			// Listening to **e**
			// Watching **e**
			// Playing **e** (live on twitch)
			// Competing in **e**

			let activity

			if (activitytype === ActivityType.Playing) {
				activity = "Playing"
			} else if (activitytype === ActivityType.Listening) {
				activity = "Listening to"
			} else if (activitytype === ActivityType.Watching) {
				activity = "Watching"
			} else if (activitytype === ActivityType.Streaming) {
				activity = "Playing"
			} else if (activitytype === ActivityType.Competing) {
				activity = "Competing in"
			}

			return await interaction
				.editReply({
					content: `✅ | Updated activity to **${activity} ${activityname}**`,
				})
				.catch((err) => {})
		}
	}
}
