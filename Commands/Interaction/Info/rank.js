const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const wait = require("node:timers/promises").setTimeout

module.exports.category = "Info"

module.exports.data = new SlashCommandBuilder()
	.setName("rank")
	.setDescription(
		"View your or another user's rank; leave blank to view your own"
	)
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("User to view the avatar of")
			.setRequired(false)
	)

module.exports.run = async ({ client, interaction, basicxp }) => {
	const member = interaction.options.getMember("user") || interaction.member

	if (member.user.bot) {
		return await interaction
			.editReply({
				content: "Bots aren't allowed in the super fancy XP system",
			})
			.catch((err) => {})
	}

	const xpData =
		(await basicxp.findOne({ where: { memberid: member.id } })) ||
		(await basicxp.create({ memberid: member.id, xp: 0, level: 1 }))

	const currentXP = xpData.xp
	const currentLevel = xpData.level
	const nextLevelXP = currentLevel * 100

	const data = await basicxp.findAll({})

	const members = data.filter((obj) =>
		interaction.guild.members.cache
			.map((member) => member.id)
			.includes(obj.memberid)
	)

	members.sort((a, b) => b.level - a.level)

	// members.filter((value) => value.level > 1)

	let pos = 0
	let memberpos

	for (const obj of members) {
		pos++

		if (obj.memberid === member.id) {
			memberpos = pos
		}
	}

	await interaction
		.editReply({
			files: [
				{
					attachment: `https://vacefron.nl/api/rankcard?username=${
						member.user.username
					}
					&avatar=${member.displayAvatarURL({
						size: 4096,
					})}
					&level=${currentLevel}
					&rank=${memberpos}
					&currentxp=${currentXP}
					&nextLevelXP=${nextLevelXP}
					&previouslevelxp=0
					&custombg=https://cdn.discordapp.com/attachments/945527434655187006/996265759577743470/unknown.png
					&xpcolor=9BDBF5
					&isboosting=false`,
					name: "rank.png",
				},
			],
		})
		.catch((err) => {})
}

// "https://vacefron.nl/api/rankcard?username=$username&avatar=$authorAvatar&level=8&rank=2&currentxp=350&nextLevelXP=400&previouslevelxp=150&custombg=https://cdn.discordapp.com/attachments/740416020761804821/741310178330148894/1596811604088.png&xpcolor=FFFFFF&isboosting=true"

// "https://api.no-api-key.com/api/v2/rank/2?current=$getUserVar[EXPVARIABLE]&total=$getUserVar[EXPLIMITVARIABLE]&rank=$getUserVar[RANKVARIABLE]&level=$getUserVar[LEVELVARIABLE]&discrim=$discriminator[$authorID]&username=$replaceText[$username; ;+;-1]&avatar=$authorAvatar?size=4096&status=dnd&barFill=gray&mainColor=white]
// $color[$random[111111;999999]"
