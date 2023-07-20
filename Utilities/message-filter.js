const { ChannelType, EmbedBuilder } = require("discord.js")

module.exports.run = async ({ client, Systems, Infraction, logChannel }) => {
	client.on("messageCreate", async (message) => {
		const getMessageFilterandAutoWarn = await Systems.findOne({
			where: { system: "Message Filter & Auto Warn" },
		})

		if (getMessageFilterandAutoWarn.online === false) return

		if (message.channel.type === ChannelType.DM) return
		if (
			message.author.id === "527285622809952256" || // mezmer
			message.author.id === client.user.id // dashi
		)
			return

		const lowercase = message.content.toLowerCase()
		const blacklistedPhrases = ["nigger", "nigga", "polack"]

		const contains = blacklistedPhrases.some((element) => {
			if (lowercase.includes(element)) {
				return true
			}

			return null
		})

		if (!contains) return

		await message.delete().catch((err) => {})

		const member = message.member
		const user = message.author

		const currentTime = Date.now()

		const randomId = Math.floor(Math.random() * 8989000) + 1010000

		await Infraction.create({
			memberid: member.id,
			infractionid: randomId,
			warnerid: client.user.id,
			time: currentTime,
			nature: "Bad word usage",
		})

		await member
			.send(
				`<@${member.id}> Warning! The message you just sent contains a word/phrase not allowed in Eoic Gamer Server. This is the message you sent:\n${message.content}`
			)
			.catch((err) => {
				console.log(err)
			})

		const embed = new EmbedBuilder()
			.setColor("Red")
			.setAuthor({
				name: `${user.tag} has been warned`,
				iconURL: member.displayAvatarURL(),
			})
			.setDescription(
				`Reason: **Bad word usage**\nMessage content: ${message.content}\nIssued By: <@${client.user.id}>`
			)
			.setThumbnail(
				"https://images.emojiterra.com/twitter/v14.0/512px/26a0.png"
			)
			.setFooter({ text: `Infraction ID: ${randomId}` })
			.setTimestamp()

		const logs = await client.channels.cache.get(logChannel)

		return logs
			.send({
				embeds: [embed],
			})
			.catch((err) => {
				console.log(err)
			})
	})
}
