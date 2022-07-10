const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

const wait = require("node:timers/promises").setTimeout

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

	if(member.user.bot){
		return await interaction
		.editReply({
			content: "Bots aren't allowed in the super fancy XP system",
		})
		.catch((err) => {})
	}

	let xpdata = await basicxp.findOne({ where: { memberid: member.id } })

	if (!xpdata) {
		xpdata = await basicxp.create({ memberid: member.id, xp: 0, level: 1 })
	}

	const currentxp = xpdata.xp
	const currentlvl = xpdata.level
	const nextlevelxp = currentlvl * 100

	const data = await basicxp.findAll({})

	let members = []

	for (let obj of data) {
		if (
			interaction.guild.members.cache
				.map((member) => member.id)
				.includes(obj.memberid)
		) {
			members.push(obj)
		}
	}

	members = members.sort(function (b, a) {
		return a.level - b.level
	})

	// members = members.filter(function BigEnough(value) {
	// 	return value.level > 1
	// })

	let pos = 0
	let memberpos

	for (let obj of members) {
		pos++

		if (obj.memberid == member.id) {
			memberpos = pos
		}
	}

	await interaction
	.editReply({
		files: [
			{
				attachment: `https://vacefron.nl/api/rankcard?username=${member.user.username}&avatar=${member.displayAvatarURL()}&level=${currentlvl}&rank=${memberpos}&currentxp=${currentxp}&nextlevelxp=${nextlevelxp}&previouslevelxp=0&custombg=https://cdn.discordapp.com/attachments/945527434655187006/995434311710949447/unknown.png&xpcolor=9BDBF5&isboosting=false`,
				name: "rank.png",
			},
		],
	})
	.catch((err) => {})
}

// "https://vacefron.nl/api/rankcard?username=$username&avatar=$authorAvatar&level=8&rank=2&currentxp=350&nextlevelxp=400&previouslevelxp=150&custombg=https://cdn.discordapp.com/attachments/740416020761804821/741310178330148894/1596811604088.png&xpcolor=FFFFFF&isboosting=true"