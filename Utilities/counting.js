const { ChannelType, MessageType } = require("discord.js")

module.exports.run = async ({ client, Counting }) => {
	client.on("messageCreate", async (message) => {
		if (message.channel.type === ChannelType.DM) return
		if (message.channel.id !== "1003814223845015702") return
		if (message.author.id === "956345939130482750") return

		let getCount = await Counting.findOne()

		if (!getCount) {
			getCount = await Counting.create({ number: 1 })
		}

		const number = getCount.number

		if (message.content !== `${number}`) {
			return message.delete().catch((err) => {})
		}

		await Counting.update(
			{ number: number + 1 },
			{ where: { number: number } }
		)
	})
}
