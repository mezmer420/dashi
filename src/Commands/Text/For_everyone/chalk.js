module.exports.run = async (client, message, args) => {
	await message.channel.send("<@826841451945787412>").catch((err) => {
		console.log(err)
	})

	message.channel
		.send(
			"https://tenor.com/view/groundhog-chicken-chalken-chalk-gh-gif-21808428"
		)
		.catch((err) => {
			console.log(err)
		})
}
