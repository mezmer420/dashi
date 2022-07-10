const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

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

module.exports.run = async ({ client, interaction, Infractions }) => {
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

		await Infractions.create({
			memberid: member.id,
			infractionid: randomid,
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

		const Embed = new MessageEmbed()
			.setColor("RED")
			.setAuthor({
				name: `${user.tag} has been warned`,
				iconURL: `${member.displayAvatarURL()}`,
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

		await logs
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

		let Embed = new MessageEmbed()
			.setColor("RED")
			.setDescription(response)
			.setTimestamp()

		// if (member.id == "762133129209053244") {
		// 	Embed.setAuthor({
		// 		name: "vcash",
		// 		iconURL: `${member.displayAvatarURL()}`,
		// 	})
		// 		// .setTitle("vcash")
		// 		.setFooter({ text: "You just tried to warn the Owner 🤦‍♂️" })
		// } 
		
		if (member.id == "527285622809952256") { // me
			Embed.setAuthor({
				name: "mezmer420",
				iconURL: `${member.displayAvatarURL()}`,
			})
				// .setTitle("mezmer420")
				.setFooter({ text: "You just tried to warn the Owner 🤦‍♂️" })
		} else if (member.id == "956345939130482750") { // dashi
			Embed.setAuthor({
				name: "dashi",
				iconURL: `${member.displayAvatarURL()}`,
			})
				// .setTitle("dashi")
				.setFooter({ text: "You just tried to warn the me 🤦‍♂️" })
		} else if (member.id == "159985870458322944") { // mee6
			Embed.setAuthor({
				name: "MEE6",
				iconURL: `${member.displayAvatarURL()}`,
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
