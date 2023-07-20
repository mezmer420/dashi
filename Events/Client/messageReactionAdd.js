const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "messageReactionAdd",
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

		if (reaction.message.id === "964363343789961267") {
			if (reaction.emoji.name !== "✅") return

			const roleID = "957872601550716929"

			member.roles.add(roleID).catch((err) => {
				console.log("Error giving role: ", err)
			})

			// if (member.id === "527285622809952256") {
			// 	reaction.message
			// 		.edit(
			// 			`Welcome to our small friend server! Before you can start talking, please read the rules in the <#939675214600605757> channel below. Once you read and understand them, react to the ✅ emoji below to access the server.`
			// 		)
			// 		.catch((err) => {
			// 			console.log(err)
			// 		})
			// }
		}
		// else if (reaction.message.id === "963931617276071946") {
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
		// 	}
		// 	// else if (reaction.emoji.name === "😳") {
		// 	// 	if (member.id !== "527285622809952256") return
		// 	// 		return reaction.message
		// 	// 			.edit(
		// 	// 				`Use the reactions below to opt in and out of roles.\n>>>1️⃣ <@&id> — anime lovers\n<@&id> — people who procrastinate\n3️⃣ <@&id> — cooking experts\n4️⃣ <@&id> — pinged when a fun poll is posted in <#964714582402826280>\n5️⃣ <@&id> — pinged when someone is streaming\n6️⃣ <@&id> — not able to view <#947275856919810048>\n7️⃣ <@&id> — nerds who have access to <#969027553878749204>`
		// 	// 			)
		// 	// 			.catch((err) => {
		// 	// 				console.log(err)
		// 	// 			})
		// 	// }
		// 	else return

		// 	if (member.roles.cache.has(roleID)) return

		// 	member.roles.add(roleID).catch((err) => {
		// 		console.log("Error giving role: ", err)
		// 	})
		// }
		else if (reaction.message.id === "995384674383843358") {
			// reaction.message.pin().catch((err) => {
			// 	console.log(err)
			// })

			reaction.message.edit({
				embeds: [
					new EmbedBuilder()
						.setAuthor({
							name: "dashi",
							iconURL: client.user.displayAvatarURL({
								size: 4096,
								dynamic: true,
							}),
						})
						.setColor("#C04BF7")
						.setTitle("🎵 Music System 🎵")
						// .setDescription(
						// 	"I can play videos up to an hour in length"
						// )
						.addFields({
							name: "Commands",
							value: "`/play song` `/play playlisturl` `/stop` `/queue` `/pause` `/resume` `/loop` `/autoplay` `/skip` `/skipto` `/previous` `/remove` `/shuffle` `/seek` `/filter`",
							inline: false,
						})
						.setFooter({
							text: "Supported platforms for /play song (using a URL):\nYouTube, Spotify, SoundCloud",
						}),
				],
			})
		}
	},
}
