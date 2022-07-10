const { MessageEmbed } = require("discord.js")

module.exports = async ({ client }) => {
	const errChannel = "995340958096969869" // dashi anti-crash log dump

	const me = await client.users
		.fetch("527285622809952256")
		.catch(console.error)

	process.on("unhandledRejection", async (reason, p) => {
		console.log("  [Anti-crash] :: Unhandled Rejection/Catch")
		return console.log(reason, p)

		const errEmbed = new MessageEmbed()
			.setColor("RED")
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
		console.log("  [Anti-crash] :: Uncaught Exception/Catch")
		return console.log(err, origin)

		const errEmbed = new MessageEmbed()
			.setColor("RED")
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
		console.log("  [Anti-crash] :: Unhandled Exception/Catch (MONITOR)")
		return console.log(err, origin)

		const errEmbed = new MessageEmbed()
			.setColor("RED")
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

	process.on("multipleResolves", async (type, promise, reason) => {
		console.log("  [Anti-crash] :: Multiple Resolves")
		return console.log(type, promise, reason)

		const errEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("⚠ New Error")
			.setDescription(
				"A multipleResolves error just occured in the bot console**\n\nERROR:\n** ```" +
					type +
					"\n\n" +
					promise +
					"\n\n" +
					reason +
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
