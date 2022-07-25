module.exports = {
	name: "messageReactionRemove",
	async execute(client, reaction, user, defaultColor) {
		if (reaction.partial) {
			try {
				await reaction.fetch()
			} catch (error) {
				return console.error(
					"Something went wrong when fetching the message:",
					error
				)
			}
		} else {
			if (user.bot) return

			const member = reaction.message.guild.members.cache.find(
				(member) => member.id === user.id
			)

			if (reaction.message.id === "963931617276071946") {
				if (reaction.emoji.name === "1️⃣") {
					const weeb = reaction.message.guild.roles.cache.find(
						(r) => r.id === "956642101653827674"
					)

					// console.log(
					// 	`${user.username} unreacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.remove(weeb).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name == "2️⃣") {
					const procrastinator =
						reaction.message.guild.roles.cache.find(
							(r) => r.id === "953099131797270588"
						)

					// console.log(
					// 	`${user.username} unreacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.remove(procrastinator).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name === "3️⃣") {
					const gordon = reaction.message.guild.roles.cache.find(
						(r) => r.id === "952349639426854973"
					)

					// console.log(
					// 	`${user.username} unreacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.remove(gordon).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name === "4️⃣") {
					const funque = reaction.message.guild.roles.cache.find(
						(r) => r.id === "963928836356051025"
					)

					// console.log(
					// 	`${user.username} unreacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.remove(funque).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name === "5️⃣") {
					const streams = reaction.message.guild.roles.cache.find(
						(r) => r.id === "963933396227219497"
					)

					// console.log(
					// 	`${user.username} unreacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.remove(streams).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name === "6️⃣") {
					const innoc = reaction.message.guild.roles.cache.find(
						(r) => r.id === "964556786105475092"
					)

					// console.log(
					// 	`${user.username} unreacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.remove(innoc).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name === "7️⃣") {
					const nerd = reaction.message.guild.roles.cache.find(
						(r) => r.id === "969432438516375603"
					)

					// console.log(
					// 	`${user.username} unreacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.remove(nerd).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name === "8️⃣") {
					const anyone = reaction.message.guild.roles.cache.find(
						(r) => r.id === "999905439615561828"
					)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.remove(anyone).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name === "9️⃣") {
					const anyone = reaction.message.guild.roles.cache.find(
						(r) => r.id === "1000505530978152569"
					)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.remove(anyone).catch((err) => {
						console.log(err)
					})
				}
			}
		}
	},
}
