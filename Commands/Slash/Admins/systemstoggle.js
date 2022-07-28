const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("systemstoggle")
	.setDescription("Modify system states")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("toggle")
			.setDescription("Toggle a system")
			.addStringOption((option) =>
				option
					.setName("system")
					.setDescription("The system to toggle")
					.setRequired(true)
					.addChoices(
						{ name: "XP", value: "XP" },
						{ name: "Dialects", value: "Dialects" },
						{
							name: "General Responses",
							value: "General Responses",
						},
						{ name: "Economy", value: "Economy" },
						{ name: "Music", value: "Music" },
						{ name: "Waifus", value: "Waifus" },
						{ name: "Birthdays", value: "Birthdays" },
						{ name: "Fricking", value: "Fricking" },
						{
							name: "Message Filter & Auto Warn",
							value: "Message Filter & Auto Warn",
						},
						{ name: "Crazy Suppress", value: "Crazy Suppress" },
						{
							name: "Anti-crash Logging",
							value: "Anti-crash Logging",
						}
					)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("lockdown")
			.setDescription("Server riot underway, cut the life support!")
	)
	.addSubcommand((subcommand) =>
		subcommand.setName("all").setDescription("Enable all systems")
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("reset")
			.setDescription("Reset all systems to their default state")
	)

module.exports.run = async ({ client, interaction, Systems }) => {
	// if (interaction.member.id !== "527285622809952256") {
	// 	return await interaction
	// 		.editReply({
	// 			content: "Only mezmer420 can use this command",
	// 		})
	// 		.catch((err) => {})
	// }

	const Options = interaction.options.getSubcommand()

	switch (Options) {
		case "toggle": {
			const system = interaction.options.getString("system")

			const getSystem = await Systems.findOne({
				where: { system: system },
			})

			if (getSystem.online === true) {
				await Systems.update(
					{ online: false },
					{ where: { system: system } }
				)

				return await interaction
					.editReply({
						content: `**${system}** has been deactivated`,
					})
					.catch((err) => {})
			} else if (getSystem.online === false) {
				await Systems.update(
					{ online: true },
					{ where: { system: system } }
				)

				return await interaction
					.editReply({
						content: `**${system}** has been enabled`,
					})
					.catch((err) => {})
			}
		}

		case "lockdown": {
			await Systems.update({ online: false }, { where: { online: true } })

			return await interaction
				.editReply({
					content: `Got it! Systems lockdown!`,
				})
				.catch((err) => {})
		}

		case "all": {
			await Systems.update({ online: true }, { where: { online: false } })

			return await interaction
				.editReply({
					content: "All systems now online",
				})
				.catch((err) => {})
		}

		case "reset": {
			await Systems.update({ online: true }, { where: { online: false } })

			await Systems.update(
				{ online: false },
				{ where: { system: "Crazy Suppress" } }
			)

			return await interaction
				.editReply({
					content: "All systems now reset",
				})
				.catch((err) => {})
		}
	}
}
