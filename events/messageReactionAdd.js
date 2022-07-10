module.exports = {
	name: "messageReactionAdd",
	async execute(client, reaction, user) {
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
				(member) => member.id == user.id
			)

			// if (reaction.message.id == "991347311278030920") {
			// 	// reaction.message.edit(
			// 	// 	"New slash command: `/pokemon`\nRestrictions: <#939674946953682976>, <#939686071241949205>, <#945527434655187006>, <#969027553878749204>"
			// 	// )

			// 	reaction.message.pin().catch((err) => {
			// 		console.log(err)
			// 	})
			// }

			if (reaction.message.id == "964363343789961267") {
				if (reaction.emoji.name == "✅") {
					const eoicrole = reaction.message.guild.roles.cache.find(
						(r) => r.id == "957872601550716929"
					)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.add(eoicrole).catch((err) => {
						console.log(err)
					})

					// if (member.id == "527285622809952256") {
					// 	reaction.message
					// 		.edit(
					// 			`Welcome to our small friend server! Before you can start talking, please read the rules in the <#939675214600605757> channel below. Once you read and understand them, react to the ✅ emoji below to access the server.`
					// 		)
					// 		.catch((err) => {
					// 			console.log(err)
					// 		})
					// }
				}
			} else if (reaction.message.id == "963931617276071946") {
				if (reaction.emoji.name == "1️⃣") {
					const weeb = reaction.message.guild.roles.cache.find(
						(r) => r.id == "956642101653827674"
					)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.add(weeb).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name == "2️⃣") {
					const procrastinator =
						reaction.message.guild.roles.cache.find(
							(r) => r.id == "953099131797270588"
						)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.add(procrastinator).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name == "3️⃣") {
					const gordon = reaction.message.guild.roles.cache.find(
						(r) => r.id == "952349639426854973"
					)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.add(gordon).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name == "4️⃣") {
					const funque = reaction.message.guild.roles.cache.find(
						(r) => r.id == "963928836356051025"
					)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.add(funque).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name == "5️⃣") {
					const streams = reaction.message.guild.roles.cache.find(
						(r) => r.id == "963933396227219497"
					)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.add(streams).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name == "6️⃣") {
					const innoc = reaction.message.guild.roles.cache.find(
						(r) => r.id == "964556786105475092"
					)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.add(innoc).catch((err) => {
						console.log(err)
					})
				} else if (reaction.emoji.name == "7️⃣") {
					const nerd = reaction.message.guild.roles.cache.find(
						(r) => r.id == "969432438516375603"
					)

					// console.log(
					// 	`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`
					// )

					member.roles.add(nerd).catch((err) => {
						console.log(err)
					})
				}
                
                // else if (reaction.emoji.name == "8️⃣") {
				// 	if (member.id !== "527285622809952256")
				// 		reaction.message
				// 			.edit(
				// 				`Use the reactions below to opt in and out of roles.\n>>>1️⃣ <@&id> — anime lovers\n<@&id> — people who procrastinate\n3️⃣ <@&id> — cooking experts\n4️⃣ <@&id> — pinged when a fun poll is posted in <#964714582402826280>\n5️⃣ <@&id> — pinged when someone is streaming\n6️⃣ <@&id> — not able to view <#947275856919810048>\n7️⃣ <@&id> — nerds who have access to <#969027553878749204>`
				// 			)
				// 			.catch((err) => {
				// 				console.log(err)
				// 			})

				// 	// Use the reactions below to opt in and out of roles.
				// 	// > 1️⃣ <@&956642101653827674> — anime lovers
				// 	// > 2️⃣ <@&953099131797270588> — people who procrastinate
				// 	// > 3️⃣ <@&952349639426854973> — cooking experts
				// 	// > 4️⃣ <@&963928836356051025> — pinged when a fun poll is posted in <#964714582402826280>
				// 	// > 5️⃣ <@&963933396227219497> — pinged when someone is streaming
				// 	// > 6️⃣ <@&964556786105475092> — not able to view <#947275856919810048>
				// 	// > 7️⃣ <@&969432438516375603> — nerds who have access to <#969027553878749204>
				// }
			}
		}
	},
}
