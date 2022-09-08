const { EmbedBuilder } = require("discord.js")

module.exports.run = async ({ client, Systems }) => {
	const errChannel = "995340958096969869" // dashi anti-crash log dump

	const me = await client.users
		.fetch("527285622809952256")
		.catch(console.error)

	process.on("unhandledRejection", async (reason, p) => {
		const getAnticrash = await Systems.findOne({
			where: { system: "Anti-crash Logging" },
		})

		if (getAnticrash.online === false) return

		console.log("  [Anti-crash] :: Unhandled Rejection/Catch")
		const current = new Date()
		console.log(`  ${current.toLocaleString()}`)
		return console.log(reason, p)

		const errEmbed = new EmbedBuilder()
			.setColor("Red")
			.setTitle("⚠ New Error")
			.setDescription(
				"An unhandledRejection error just occured in the bot console**\n\nERROR:\n** ```" +
					reason +
					"\n\n" +
					p +
					"```"
			)
			.setTimestamp()
			.setFooter({ text: "Anti-Crash System" })

		const getErrChannel = await client.channels.cache.get(errChannel)

		getErrChannel
			.send({
				content: "<@527285622809952256>",
				embeds: [errEmbed],
			})
			.catch((err) => {
				console.log(err)
			})
	})

	process.on("uncaughtException", async (err, origin) => {
		const getAnticrash = await Systems.findOne({
			where: { system: "Anti-crash Logging" },
		})

		if (getAnticrash.online === false) return

		console.log("  [Anti-crash] :: Uncaught Exception/Catch")
		const current = new Date()
		console.log(`  ${current.toLocaleString()}`)
		return console.log(err, origin)

		const errEmbed = new EmbedBuilder()
			.setColor("Red")
			.setTitle("⚠ New Error")
			.setDescription(
				"An uncaughtException error just occured in the bot console**\n\nERROR:\n** ```" +
					err +
					"\n\n" +
					origin +
					"```"
			)
			.setTimestamp()
			.setFooter({ text: "Anti-Crash System" })

		const getErrChannel = await client.channels.cache.get(errChannel)

		getErrChannel
			.send({
				content: "<@527285622809952256>",
				embeds: [errEmbed],
			})
			.catch((err) => {
				console.log(err)
			})
	})

	process.on("uncaughtExceptionMonitor", async (err, origin) => {
		const getAnticrash = await Systems.findOne({
			where: { system: "Anti-crash Logging" },
		})

		if (getAnticrash.online === false) return

		console.log("  [Anti-crash] :: Unhandled Exception/Catch (MONITOR)")
		const current = new Date()
		console.log(`  ${current.toLocaleString()}`)
		return console.log(err, origin)

		const errEmbed = new EmbedBuilder()
			.setColor("Red")
			.setTitle("⚠ New Error")
			.setDescription(
				"An uncaughtExceptionMonitor error just occured in the bot console**\n\nERROR:\n** ```" +
					err +
					"\n\n" +
					origin +
					"```"
			)
			.setTimestamp()
			.setFooter({ text: "Anti-Crash System" })

		const getErrChannel = await client.channels.cache.get(errChannel)

		getErrChannel
			.send({
				content: "<@527285622809952256>",
				embeds: [errEmbed],
			})
			.catch((err) => {
				console.log(err)
			})
	})
}
