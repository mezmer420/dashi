const { ChannelType, EmbedBuilder } = require("discord.js")

module.exports = async ({ client, Systems, Infraction }) => {
	client.on("messageCreate", async (message) => {
		const getMessageFilterandAutoWarn = await Systems.findOne({
			where: { system: "Message Filter & Auto Warn" },
		})

		if (getMessageFilterandAutoWarn.online === false) return

		if (message.channel.type === ChannelType.DM) return
		if (
			message.author.id === "527285622809952256" || // mezmer
			message.author.id === "956345939130482750" // dashi
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

		const currenttime = Date.now()

		const randomid = Math.floor(Math.random() * 8989000) + 1010000

		await Infraction.create({
			memberid: member.id,
			infractionid: randomid,
			warnerid: "956345939130482750",
			time: currenttime,
			nature: "Bad word usage",
		})

		await member
			.send(
				`<@${member.id}> Warning! The message you just sent contains a word/phrase not allowed in Eoic Gamer Server. This is the message you sent:\n${message.content}`
			)
			.catch((err) => {
				console.log(err)
			})

		const Embed = new EmbedBuilder()
			.setColor("Red")
			.setAuthor({
				name: `${user.tag} has been warned`,
				iconURL: member.displayAvatarURL(),
			})
			.setDescription(
				`Reason: **Bad word usage**\nMessage content: ${message.content}\nIssued By: <@956345939130482750>`
			)
			.setThumbnail(
				"https://images.emojiterra.com/twitter/v14.0/512px/26a0.png"
			)
			.setFooter({ text: `Infraction ID: ${randomid}` })
			.setTimestamp()

		const logs = await client.channels.cache.get("955948174894325782")

		return logs
			.send({
				embeds: [Embed],
			})
			.catch((err) => {
				console.log(err)
			})
	})
}
