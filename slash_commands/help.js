const { SlashCommandBuilder } = require("@discordjs/builders")
const {
	ActionRowBuilder,
	EmbedBuilder,
	SelectMenuBuilder,
} = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Provides first aid")

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const dashi = await client.users.fetch("956345939130482750")
	const mezmer = await client.users.fetch("527285622809952256")

	const infoEmbed = new EmbedBuilder()
		.setColor(defaultColor)
		.setTitle("Help 🚑 ❤️‍🩹")
		// .setURL("https://github.com/mezmer420/dashi")
		.setAuthor({
			name: `${dashi.tag}`,
			iconURL: `${dashi.displayAvatarURL({ size: 4096, dynamic: true })}`,
		})
		.setDescription(
			`**Who am I?**\n<@${mezmer.id}> originally got the idea of a creating a Discord bot to have one respond "obsessed with d" every time <@826841451945787412> expressed his obsession with d. Today, that feature is scarcely used and instead I've proceeded to result in the obsolescence of other bots here. I see that as a win.\n[GitHub](https://github.com/mezmer420/dashi)\n——————————\n**Text Commands**`
		)
		// .setThumbnail(
		// 	`${dashi.displayAvatarURL({ size: 4096, dynamic: true })}`
		// )
		.addFields(
			{
				name: "For Everyone",
				value: "`!bigcock`  `!chalk`  `!cockroach`  `!emojify [message]`  `!good`",
			},
			{
				name: "For Government",
				value: "`!france`",
			},
			{ name: "For Owner(s) and vcash", value: "`!s [message]`" },
			{ name: "For mezmer", value: "(CLASSIFIED)\n——————————" }
		)
		.addFields({
			name: "**Slash Commands**",
			value: "I have over 50 slash commands that everyone can use + government commands. Type `/` and click me to view my slash commands available to you in your current channel. If you're an Admin, mezmer has hardcoded certain commands such that only he can use them. ;)",
		})
		.setFooter({
			text: `${mezmer.tag}`,
			iconURL: `${mezmer.displayAvatarURL({
				size: 4096,
				dynamic: true,
			})}`,
		})

	const row = new ActionRowBuilder().addComponents(
		new SelectMenuBuilder()
			.setCustomId("help")
			.setPlaceholder("Select one or multiple system(s) (max 10)...")
			.setMinValues(0)
			.setMaxValues(10)
			.addOptions([
				{
					label: "⭐ XP",
					description: "Rewards the most active members.",
					value: "XP",
				},
				{
					label: "🗣️ Dialects",
					description: "Eocians have unique dialects.",
					value: "Dialects",
				},
				{
					label: "💬 General Responses",
					description: "Universal replies to certain phrases.",
					value: "General Responses",
				},
				{
					label: "💸 Economy",
					description:
						"Rather advanced economy system with a wide array of options.",
					value: "Economy",
				},
				{
					label: "🎵 Music",
					description:
						"Rather advanced music system that gets the job done.",
					value: "Music",
				},
				{
					label: "❤️ Waifus",
					description: "Uwu Owo",
					value: "Waifus",
				},
				{
					label: "🎂 Birthdays",
					description:
						"Store your birthday and everyone will be announced the day of.",
					value: "Birthdays",
				},
				{
					label: "👶 Fricking",
					description: "Create new Eocians.",
					value: "Fricking",
				},
				{
					label: "❗ Message Filter & Auto Warn",
					description:
						"Filters untolerably explicit language and auto warns the user.",
					value: "Message Filter & Auto Warn",
				},
				{
					label: "👮 Crazy Suppress",
					description:
						"Deletes all messages specified user(s) send. ~~Can be used as punishment.~~",
					value: "Crazy Suppress",
				},
				{
					label: "✅ Anti-crash",
					description:
						"Integral core system that ensures it's impossible to crash dashi.",
					value: "Anti-crash",
				},
			])
	)

	await interaction
		.editReply({
			embeds: [infoEmbed],
			components: [row],
		})
		.catch((err) => {})
}
