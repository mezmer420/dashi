const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

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

module.exports.run = async ({ client, interaction, Infraction }) => {
	const member = interaction.options.getMember("member")
	const user = interaction.options.getUser("member")
	const reason = interaction.options.getString("reason")

	if (
		member.id !== "527285622809952256" && // mezmer
		member.id !== "956345939130482750" && // dashi
		member.id !== "159985870458322944" // mee6
	) {
		const currenttime = Date.now()

		const randomid = Math.floor(Math.random() * 8989000) + 1010000

		await Infraction.create({
			memberid: member.id,
			infractionid: randomid,
			warnerid: interaction.member.id,
			time: currenttime,
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

		const Embed = new EmbedBuilder()
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
			.setFooter({ text: `Infraction ID: ${randomid}` })
			.setTimestamp()

		await interaction
			.editReply({
				embeds: [Embed],
			})
			.catch((err) => {})

		const logs = await client.channels.cache.get("955948174894325782")

		return logs
			.send({
				embeds: [Embed],
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

		const Embed = new EmbedBuilder()
			.setColor("Red")
			.setDescription(response)
			.setTimestamp()

		// if (member.id === "762133129209053244") {
		// 	Embed.setAuthor({
		// 		name: "vcash",
		// 		iconURL: `${member.displayAvatarURL({
		// 			size: 4096,
		// 			dynamic: true,
		// 		})}`,
		// 	})
		// 		// .setTitle("vcash")
		// 		.setFooter({ text: "You just tried to warn the Owner 🤦‍♂️" })
		// }

		if (member.id === "527285622809952256") {
			// me
			Embed.setAuthor({
				name: "mezmer420",
				iconURL: `${member.displayAvatarURL({
					size: 4096,
					dynamic: true,
				})}`,
			})
				// .setTitle("mezmer420")
				.setFooter({ text: "You just tried to warn the Owner 🤦‍♂️" })
		} else if (member.id === "956345939130482750") {
			// dashi
			Embed.setAuthor({
				name: "dashi",
				iconURL: `${member.displayAvatarURL({
					size: 4096,
					dynamic: true,
				})}`,
			})
				// .setTitle("dashi")
				.setFooter({ text: "You just tried to warn the me 🤦‍♂️" })
		} else if (member.id === "159985870458322944") {
			// mee6
			Embed.setAuthor({
				name: "MEE6",
				iconURL: `${member.displayAvatarURL({
					size: 4096,
					dynamic: true,
				})}`,
			})
				// .setTitle("mee6")
				.setFooter({ text: "You just tried to warn an Admin 🤦‍♂️" })
		}

		return await interaction
			.editReply({
				embeds: [Embed],
			})
			.catch((err) => {})
	}
}
