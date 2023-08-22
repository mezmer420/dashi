module.exports = {
	name: "messageReactionRemove",
	async run(client, reaction, user, defaultColor) {
		if (reaction.partial) {
			try {
				await reaction.fetch()
			} catch (error) {
				return console.error(
					"Something went wrong fetching reaction: ",
					error
				)
			}
		}

		if (user.bot) return

		const member = reaction.message.guild.members.cache.get(user.id)

		// if (reaction.message.id === "963931617276071946") {
		// 	let roleID

		// 	// if (reaction.emoji.name === "1️⃣") {
		// 	// 	roleID = "956642101653827674"
		// 	// } else if (reaction.emoji.name === "2️⃣") {
		// 	// 	roleID = "953099131797270588"
		// 	// } else if (reaction.emoji.name === "3️⃣") {
		// 	// 	roleID = "952349639426854973"
		// 	// } else if (reaction.emoji.name === "4️⃣") {
		// 	// 	roleID = "963928836356051025"
		// 	// } else if (reaction.emoji.name === "5️⃣") {
		// 	// 	roleID = "963933396227219497"
		// 	// }
		// 	if (reaction.emoji.name === "6️⃣") {
		// 		roleID = "964556786105475092"
		// 	}
		// 	// else if (reaction.emoji.name === "7️⃣") {
		// 	// 	roleID = "969432438516375603"
		// 	// } else if (reaction.emoji.name === "8️⃣") {
		// 	// 	roleID = "999905439615561828"
		// 	// }
		// 	else if (reaction.emoji.name === "9️⃣") {
		// 		roleID = "1000505530978152569"
		// 	} else return

		// 	if (!member.roles.cache.has(roleID)) return

		// 	member.roles.remove(roleID).catch((err) => {
		// 		console.log("Error removing role: ", err)
		// 	})
		// }
	},
}
