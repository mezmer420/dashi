const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("filter")
	.setDescription("Toggle a filter")
	.addStringOption((option) =>
		option
			.setName("filter")
			.setDescription("The filter to toggle")
			.setRequired(true)
			.addChoices(
				{ name: "bassboost", value: "bassboost" },
				{ name: "earrape", value: "earrape" },
				{ name: "nightcore", value: "nightcore" },
				{ name: "reverse", value: "reverse" },
				{ name: "treble", value: "treble" },
				{ name: "vaporwave", value: "vaporwave" },
				{ name: "vibrato", value: "vibrato" }
			)
	)

module.exports.run = async ({ client, interaction }) => {
	if (interaction.channel.id !== "992630810186367016") {
		return await interaction
			.editReply({
				content:
					"You can only use that command in <#992630810186367016>! (this message will autodelete)",
			})
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 6000)
			})
	}

	const queue = client.player.getQueue(interaction.guildId)

	if (!queue) {
		return await interaction
			.editReply({ content: "There are no songs in the queue" })
			.catch((err) => {})
			.then((interaction) => {
				setTimeout(() => interaction.delete().catch((err) => {}), 10000)
			})
	}

	const filter = interaction.options.getString("filter")

	switch (filter) {
		case "bassboost": {
			await queue.setFilters({
				bassboost: !queue.getFiltersEnabled().includes("bassboost"),
				normalizer2: !queue.getFiltersEnabled().includes("bassboost"), // because we need to toggle it with bass
			})

			return await interaction
				.editReply({
					content: `🎵 | Bassboost ${
						queue.getFiltersEnabled().includes("bassboost")
							? "Enabled"
							: "Disabled"
					}!`,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		case "earrape": {
			await queue.setFilters({
				earrape: !queue.getFiltersEnabled().includes("earrape"),
				normalizer2: !queue.getFiltersEnabled().includes("earrape"), // we need to toggle it
			})

			await interaction
				.editReply({
					content: `🎵 | Earrape ${
						queue.getFiltersEnabled().includes("earrape")
							? "Enabled"
							: "Disabled"
					}!`,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		case "nightcore": {
			await queue.setFilters({
				nightcore: !queue.getFiltersEnabled().includes("nightcore"),
				normalizer2: !queue.getFiltersEnabled().includes("nightcore"), // we need to toggle it
			})

			await interaction
				.editReply({
					content: `🎵 | Nightcore ${
						queue.getFiltersEnabled().includes("nightcore")
							? "Enabled"
							: "Disabled"
					}!`,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		case "reverse": {
			await queue.setFilters({
				reverse: !queue.getFiltersEnabled().includes("reverse"),
				normalizer2: !queue.getFiltersEnabled().includes("reverse"), // we need to toggle it
			})

			await interaction
				.editReply({
					content: `🎵 | Reverse ${
						queue.getFiltersEnabled().includes("reverse")
							? "Enabled"
							: "Disabled"
					}!`,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		case "treble": {
			await queue.setFilters({
				treble: !queue.getFiltersEnabled().includes("treble"),
				normalizer2: !queue.getFiltersEnabled().includes("treble"), // we need to toggle it
			})

			await interaction
				.editReply({
					content: `🎵 | Treble ${
						queue.getFiltersEnabled().includes("treble")
							? "Enabled"
							: "Disabled"
					}!`,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		case "vaporwave": {
			await queue.setFilters({
				vaporwave: !queue.getFiltersEnabled().includes("vaporwave"),
				normalizer2: !queue.getFiltersEnabled().includes("vaporwave"), // we need to toggle it
			})

			await interaction
				.editReply({
					content: `🎵 | Vaporwave ${
						queue.getFiltersEnabled().includes("vaporwave")
							? "Enabled"
							: "Disabled"
					}!`,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}

		case "vibrato": {
			await queue.setFilters({
				vibrato: !queue.getFiltersEnabled().includes("vibrato"),
				normalizer2: !queue.getFiltersEnabled().includes("vibrato"), // we need to toggle it
			})

			await interaction
				.editReply({
					content: `🎵 | Vibrato ${
						queue.getFiltersEnabled().includes("vibrato")
							? "Enabled"
							: "Disabled"
					}!`,
				})
				.catch((err) => {})
				.then((interaction) => {
					setTimeout(
						() => interaction.delete().catch((err) => {}),
						10000
					)
				})
		}
	}
}
