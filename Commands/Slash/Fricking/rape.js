const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const ms = require("ms")
const wait = require("node:timers/promises").setTimeout

module.exports.data = new SlashCommandBuilder()
	.setName("rape")
	.setDescription("Rape someone")
	.addUserOption((option) =>
		option.setName("user").setDescription("User to rape").setRequired(true)
	)

module.exports.run = async ({ client, interaction, Systems }) => {
	const getFricking = await Systems.findOne({
		where: { system: "Fricking" },
	})

	if (getFricking.online === false) {
		return await interaction
			.editReply({
				content: "The Fricking system is currently disabled",
			})
			.catch((err) => {})
	}

	const targetMember = interaction.options.getMember("user")
	const Member = interaction.member

	if (targetMember === Member) {
		return await interaction
			.editReply({
				content:
					"You jacked off in bathroom... try again when you're ready to actually rape someone",
			})
			.catch((err) => {})
	}

	await interaction
		.editReply({
			content: `You just raped <@${targetMember.id}>!`,
		})
		.catch((err) => {})
}
