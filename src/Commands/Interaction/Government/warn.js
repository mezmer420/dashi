const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js")

module.exports.category = "Government"

module.exports.data = new SlashCommandBuilder()
	.setName("warn")
	.setDescription("Warn a member")
	.addUserOption((option) =>
		option
			.setName("member")
			.setDescription("Member to warn")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("reason")
			.setDescription("Reason of the warn")
			.setRequired(true)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

module.exports.run = async ({ client, interaction, Infraction }) => {
	const member = interaction.options.getMember("member")
	const user = interaction.options.getUser("member")
	const reason = interaction.options.getString("reason")

	if (
		member.id !== "762133129209053244" && // vcash
		member.id !== "527285622809952256" && // mezmer
		member.id !== client.user.id // dashi
	) {
		const currentTime = Date.now()

		const randomId = Math.floor(Math.random() * 8989000) + 1010000

		await Infraction.create({
			memberid: member.id,
			infractionid: randomId,
			warnerid: interaction.member.id,
			time: currentTime,
			nature: reason,
		})

		const tag = await interaction.user.tag

		await member
			.send(
				`<@${member.id}> You have been warned by **${tag}** for:\n**${reason}**`
			)
			.catch((err) => {
				console.log(err)
			})

		const embed = new EmbedBuilder()
			.setColor("Red")
			.setAuthor({
				name: `${user.tag} has been warned`,
				iconURL: member.displayAvatarURL({ size: 4096, dynamic: true }),
			})
			.setDescription(
				`Reason: **${reason}**\nIssued By: <@${interaction.member.id}>`
			)
			.setThumbnail(
				"https://images.emojiterra.com/twitter/v14.0/512px/26a0.png"
			)
			.setFooter({ text: `Infraction ID: ${randomId}` })
			.setTimestamp()

		await interaction
			.editReply({
				embeds: [embed],
			})
			.catch((err) => {})

		const logs = await client.channels.cache.get("955948174894325782")

		return logs
			.send({
				embeds: [embed],
			})
			.catch((err) => {
				console.log(err)
			})
	} else {
		const responses = [
			'"Bruh moment"',
			'"Uno bruh momento"',
			'"LMAO"',
			'"Coup d' + "'" + 'état"',
			'"How dare you"',
			'"lol"',
			'"Nice try nimrod"',
			'"Your execution is scheduled for tomorrow morning"',
			'"Seriously?"',
			'"Bruh"',
			'"hmm yes"',
		]
		const response = responses[Math.floor(Math.random() * responses.length)]

		const embed = new EmbedBuilder()
			.setColor("Red")
			.setDescription(response)
			.setTimestamp()

		if (member.id === "762133129209053244") {
			// vcash
			embed
				.setAuthor({
					name: "vcash",
					iconURL: `${member.displayAvatarURL({
						size: 4096,
						dynamic: true,
					})}`,
				})
				// .setTitle("vcash")
				.setFooter({ text: "You just tried to warn vcash 🤦‍♂️" })
		} else if (member.id === "527285622809952256") {
			// mezmer
			// me
			embed
				.setAuthor({
					name: "mezmer420",
					iconURL: `${member.displayAvatarURL({
						size: 4096,
						dynamic: true,
					})}`,
				})
				// .setTitle("mezmer420")
				.setFooter({ text: "You just tried to warn mezmer 🤦‍♂️" })
		} else if (member.id === client.user.id) {
			// dashi
			// dashi
			embed
				.setAuthor({
					name: "dashi",
					iconURL: `${member.displayAvatarURL({
						size: 4096,
						dynamic: true,
					})}`,
				})
				// .setTitle("dashi")
				.setFooter({ text: "You just tried to warn the me 🤦‍♂️" })
		}
		// else if (member.id === "159985870458322944") {
		// 	// mee6
		// 	embed.setAuthor({
		// 		name: "MEE6",
		// 		iconURL: `${member.displayAvatarURL({
		// 			size: 4096,
		// 			dynamic: true,
		// 		})}`,
		// 	})
		// 		// .setTitle("mee6")
		// 		.setFooter({ text: "You just tried to warn an Admin 🤦‍♂️" })
		// }

		return await interaction
			.editReply({
				embeds: [embed],
			})
			.catch((err) => {})
	}
}
