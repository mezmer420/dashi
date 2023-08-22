const wait = require("node:timers/promises").setTimeout

module.exports.run = async (client, message, args) => {
	if (message.author.id !== "527285622809952256") {
		message.channel.sendTyping().catch((err) => {
			console.log(err)
		})

		await wait(Math.floor(Math.random() * 0) + 1001)

		return message.channel.send("no").catch((err) => {
			console.log(err)
		})
	}

	try {
		const roles = await message.guild.roles.fetch()
		const roleToMove = roles.get("1118081712447037463")

		if (!roleToMove) {
			return message.reply("Role not found.")
		}

		// console.log(roleToMove)

		await roleToMove.setPosition(15)

		message.reply("Done.")
	} catch (error) {
		console.error(error)
		message.reply("An error occurred while moving the role.")
	}
}
