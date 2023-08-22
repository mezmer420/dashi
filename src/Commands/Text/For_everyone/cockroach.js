module.exports.run = async (client, message, args) => {
	message.channel
		.send(
			"https://i.pinimg.com/originals/a6/c7/7c/a6c77c6148c6f62354f07a1749685b65.gif"
		)
		.catch((err) => {
			console.log(err)
		})
}
