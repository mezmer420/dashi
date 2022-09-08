const { ChannelType } = require("discord.js")

const blacklistedchannels = [
	"945527434655187006", // #spam
	"1003814223845015702", // #counting
	"947275856919810048", // #unpure
	// "969027553878749204", // #nerd
	// "970812606287859722", // #weeb
	// "970859343849349160", // #og
	"964714582402826280", // #fun-questions
	"983507823965114378", // #bot-suggestions
	"992630810186367016", // #song-requests
]

const {
	blacklistedcategories,
} = require("../blacklisted-channels-and-categories")

module.exports.run = async ({ client, basicxp, Systems }) => {
	client.on("messageCreate", async (message) => {
		const getXP = await Systems.findOne({
			where: { system: "XP" },
		})

		if (getXP.online === false) return

		if (message.channel.type === ChannelType.DM) return
		if (message.author.bot) return
		if (message.channel.id === "945527434655187006") return
		if (
			blacklistedchannels.includes(message.channel.id) ||
			blacklistedcategories.includes(message.channel.parent.id) ||
			message.channel.type === "GUILD_PUBLIC_THREAD"
		)
			return

		const { member } = message

		function getNeededXP(level) {
			return level * 100
		}

		async function addXP(memberID, xpToAdd, message) {
			try {
				let xpdata = await basicxp.findOne({
					where: { memberid: memberID },
				})

				if (!xpdata) {
					xpdata = await basicxp.create({
						memberid: memberID,
						xp: 0,
						level: 1,
					})
				}

				const newxp = xpdata.xp + xpToAdd

				await basicxp.update(
					{ xp: newxp },
					{ where: { memberid: memberID } }
				)

				const result = await basicxp.findOne({
					where: { memberid: memberID },
				})

				let { xp, level } = result

				const needed = getNeededXP(level)

				if (xp >= needed) {
					++level
					xp -= needed

					await basicxp.update(
						{ xp: xp, level: level },
						{ where: { memberid: memberID } }
					)

					message
						.reply(
							`You are now level **${level}** with **${xp}** experience! You now need **${getNeededXP(
								level
							)}** XP to level up again`
						)
						.catch((err) => {})
				}
			} catch (err) {
				console.log(err)
			}
		}

		let XPtoaddUncurved
		let XPtoadd

		if (message.content.length < 2) {
			XPtoaddUncurved = Math.floor(Math.random() * 3) + 1 // 1-3
		} else if (message.content.length <= 5) {
			XPtoaddUncurved = Math.floor(Math.random() * 7) + 1 // 1-7
		} else if (message.content.length <= 10) {
			XPtoaddUncurved = Math.floor(Math.random() * 15) + 6 // 5-20
		} else if (message.content.length > 10) {
			XPtoaddUncurved = Math.floor(Math.random() * 25) + 9 // 8-33
		}

		if (message.channel.id !== "939674946953682976") {
			// not #general
			XPtoadd = Math.round(XPtoaddUncurved * 1.3)
		} else {
			XPtoadd = XPtoaddUncurved
		}

		addXP(member.id, XPtoadd, message)
	})
}
