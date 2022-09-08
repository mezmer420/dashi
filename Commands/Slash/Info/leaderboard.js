const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("leaderboard")
	.setDescription("View a leaderboard")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("economy")
			.setDescription(
				"Sort users by their total Dashcoins (sum of wallet and bank)"
			)
	)
	.addSubcommand((subcommand) =>
		subcommand.setName("rank").setDescription("Sort users by their rank")
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("children")
			.setDescription("Sort users by their children")
	)

module.exports.category = "Info"

module.exports.run = async ({
	client,
	interaction,
	Systems,
	basicxp,
	Economy,
	Fricking,
	defaultColor,
}) => {
	const Options = interaction.options.getSubcommand()

	switch (Options) {
		case "economy": {
			const getEconomy = await Systems.findOne({
				where: { system: "Economy" },
			})

			if (getEconomy.online === false) {
				return await interaction
					.editReply({
						content: "The Economy system is currently disabled",
					})
					.catch((err) => {})
			}

			const data = await Economy.findAll({})

			let members = []

			for (let obj of data) {
				if (
					interaction.guild.members.cache
						.map((member) => member.id)
						.includes(obj.id)
				) {
					members.push(obj)
				}
			}

			if (!members[0]) {
				return await interaction
					.editReply({
						content: "everybody here is broke lol",
					})
					.catch((err) => {})
			}

			const Embed = new EmbedBuilder()
				.setTitle("Dashcoins:tm: Leaderboard 🏆")
				.setColor(defaultColor)
				.setFooter({
					text: "You're not on the leaderboard\nTop 10 Displayed",
				})
				.setTimestamp()

			members = members.sort(function (b, a) {
				return a.bank + a.wallet - (b.bank + b.wallet)
			})

			members = members.filter(function BigEnough(value) {
				return value.bank + value.wallet !== 0
			})

			let pos = 0

			for (let obj of members) {
				pos++

				if (obj.id === interaction.user.id) {
					Embed.setFooter({
						text: `Your position is #${pos}\nTop 10 Displayed`,
					})
				}
			}

			members = members.slice(0, 10)

			let desc = ""

			for (let i = 0; i < members.length; i++) {
				const user = client.users.cache.get(members[i].id)

				if (!user) return

				const bal = members[i].bank + members[i].wallet

				let rank = `${i + 1}`

				if (rank === "1") {
					rank = "🥇"
				} else if (rank === "2") {
					rank = "🥈"
				} else if (rank === "3") {
					rank = "🥉"
				} else if (rank === "4") {
					rank = "4️⃣"
				} else if (rank === "5") {
					rank = "5️⃣"
				} else if (rank === "6") {
					rank = "6️⃣"
				} else if (rank === "7") {
					rank = "7️⃣"
				} else if (rank === "8") {
					rank = "8️⃣"
				} else if (rank === "9") {
					rank = "9️⃣"
				} else if (rank === "10") {
					rank = "🔟"
				}

				desc += `${rank} <@${user.id}> — ${bal} Dashcoins:tm:\n`
			}

			Embed.setDescription(desc)

			return await interaction
				.editReply({
					embeds: [Embed],
				})
				.catch((err) => {})
		}

		case "rank": {
			const getXP = await Systems.findOne({
				where: { system: "XP" },
			})

			if (getXP.online === false) {
				return await interaction
					.editReply({
						content: "The XP system is currently disabled",
					})
					.catch((err) => {})
			}

			const data = await basicxp.findAll({})

			let members = []

			for (let obj of data) {
				if (
					interaction.guild.members.cache
						.map((member) => member.id)
						.includes(obj.memberid)
				) {
					members.push(obj)
				}
			}

			if (!members[0]) {
				return await interaction
					.editReply({
						content: "everybody here is dead lol",
					})
					.catch((err) => {})
			}

			const Embed = new EmbedBuilder()
				.setTitle("Rank Leaderboard 🏆")
				.setColor(defaultColor)
				.setFooter({
					text: "You're not on the leaderboard\nTop 10 Displayed",
				})
				.setTimestamp()

			members = members.sort(function (b, a) {
				return a.level - b.level
			})

			// members = members.filter(function BigEnough(value) {
			// 	return value.level > 1
			// })

			let pos = 0

			for (let obj of members) {
				pos++

				if (obj.memberid === interaction.user.id) {
					Embed.setFooter({
						text: `Your position is #${pos}\nTop 10 Displayed`,
					})
				}
			}

			members = members.slice(0, 10)

			let desc = ""

			for (let i = 0; i < members.length; i++) {
				const user = client.users.cache.get(members[i].memberid)

				if (!user) return

				const level = members[i].level

				let rank = `${i + 1}`

				if (rank === "1") {
					rank = "🥇"
				} else if (rank === "2") {
					rank = "🥈"
				} else if (rank === "3") {
					rank = "🥉"
				} else if (rank === "4") {
					rank = "4️⃣"
				} else if (rank === "5") {
					rank = "5️⃣"
				} else if (rank === "6") {
					rank = "6️⃣"
				} else if (rank === "7") {
					rank = "7️⃣"
				} else if (rank === "8") {
					rank = "8️⃣"
				} else if (rank === "9") {
					rank = "9️⃣"
				} else if (rank === "10") {
					rank = "🔟"
				}

				desc += `${rank} <@${user.id}> — Level ${level} \n`
			}

			Embed.setDescription(desc)

			return await interaction
				.editReply({
					embeds: [Embed],
				})
				.catch((err) => {})
		}

		case "children": {
			const getFricking = await Systems.findOne({
				where: { system: "Fricking" },
			})

			if (getFricking.online === false) {
				return await interaction
					.editReply({
						content: "The Fricking system is currently disabled",
					})
					.catch((err) => {})
			}

			const data = await Fricking.findAll({})

			let members = []

			for (let obj of data) {
				if (
					interaction.guild.members.cache
						.map((member) => member.id)
						.includes(obj.memberid)
				) {
					members.push(obj)
				}
			}

			if (!members[0]) {
				return await interaction
					.editReply({
						content: "nobody here has kids lol",
					})
					.catch((err) => {})
			}

			const Embed = new EmbedBuilder()
				.setTitle("Children Leaderboard 🏆")
				.setColor(defaultColor)
				.setFooter({
					text: "You're not on the leaderboard\nTop 10 Displayed",
				})
				.setTimestamp()

			members = members.sort(function (b, a) {
				return a.children - b.children
			})

			members = members.filter(function BigEnough(value) {
				return value.children > 0
			})

			let pos = 0

			for (let obj of members) {
				pos++

				if (obj.memberid === interaction.user.id) {
					Embed.setFooter({
						text: `Your position is #${pos}\nTop 10 Displayed`,
					})
				}
			}

			members = members.slice(0, 10)

			let desc = ""

			for (let i = 0; i < members.length; i++) {
				const user = client.users.cache.get(members[i].memberid)

				if (!user) return

				const children = members[i].children

				let rank = `${i + 1}`

				if (rank === "1") {
					rank = "🥇"
				} else if (rank === "2") {
					rank = "🥈"
				} else if (rank === "3") {
					rank = "🥉"
				} else if (rank === "4") {
					rank = "4️⃣"
				} else if (rank === "5") {
					rank = "5️⃣"
				} else if (rank === "6") {
					rank = "6️⃣"
				} else if (rank === "7") {
					rank = "7️⃣"
				} else if (rank === "8") {
					rank = "8️⃣"
				} else if (rank === "9") {
					rank = "9️⃣"
				} else if (rank === "10") {
					rank = "🔟"
				}

				desc += `${rank} <@${user.id}> — ${children} Children\n`
			}

			Embed.setDescription(desc)

			return await interaction
				.editReply({
					embeds: [Embed],
				})
				.catch((err) => {})
		}
	}
}
