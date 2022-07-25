module.exports = {
	callback: (client, message, args) => {
		if (
			message.author.id !== "527285622809952256" && // mezmer
			message.author.id !== "826841451945787412" // choc
		) {
			return message
				.reply(
					"Only government officials can use that command! (these messages will autodelete)"
				)
				.catch((err) => {})
				.then((msg) => {
					setTimeout(() => message.delete().catch((err) => {}), 6000)
					setTimeout(() => msg.delete().catch((err) => {}), 6000)
				})
		}

		if (message.channel.id !== "973334244178919504") {
			return message
				.reply(
					"For safety, you can only use that command in <#973334244178919504>"
				)
				.catch((err) => {})
		}

		message.channel
			.send(
				"https://c.tenor.com/eUGNMYebEwoAAAAd/bleu-blanc-rouge-france.gif"
			)
			.catch((err) => {
				console.log(err)
			})
	},
}
