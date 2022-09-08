const {
	Systems,
	basicxp,
	Dialects,
	Tickets,
	Infraction,
	Economy,
	Items,
	dailyCooldown,
	workCooldown,
	begCooldown,
	robCooldown,
	Waifus,
	Birthday,
	Spam,
	Fricking,
	frickingCooldown,
	Suppress,
	Counting,
} = require("../../database")

module.exports = {
	name: "ready",
	once: "true",
	async execute(client) {
		await Systems.sync()
		await basicxp.sync()
		await Dialects.sync()
		await Tickets.sync()
		await Infraction.sync()
		await Economy.sync()
		await Items.sync()
		await dailyCooldown.sync()
		await workCooldown.sync()
		await begCooldown.sync()
		await robCooldown.sync()
		await Waifus.sync()
		await Birthday.sync()
		await Spam.sync()
		await Fricking.sync()
		await frickingCooldown.sync()
		await Suppress.sync()
		await Counting.sync()

		console.log("Database synced")

		await Spam.destroy({ truncate: true })
		await Spam.create({ starterid: "10", active: false })

		// await Systems.destroy({ truncate: true })
		// await Systems.create({ system: "XP", online: true })
		// await Systems.create({ system: "Dialects", online: true })
		// await Systems.create({ system: "General Responses", online: true })
		// await Systems.create({ system: "Economy", online: true })
		// await Systems.create({ system: "Music", online: true })
		// await Systems.create({ system: "Waifus", online: true })
		// await Systems.create({ system: "Birthdays", online: true })
		// await Systems.create({ system: "Fricking", online: true })
		// await Systems.create({
		// 	system: "Message Filter & Auto Warn",
		// 	online: true,
		// })
		// await Systems.create({ system: "Crazy Suppress", online: false })
		// await Systems.create({ system: "Anti-crash Logging", online: true })

		let commandhandler = require("../../text_command-handler")
		if (commandhandler.default) {
			commandhandler = commandhandler.default
		}
		commandhandler(client)

		const fs = require("fs")

		const utilityFiles = fs
			.readdirSync("./Utilities/")
			.filter((file) => file.endsWith(".js"))

		for (const file of utilityFiles) {
			const event = require(`../../Utilities/${file}`)

			// if (event.eoic_only) {
			// 	if
			// }

			event.run({
				client,
				Systems,
				basicxp,
				Dialects,
				Tickets,
				Infraction,
				Economy,
				Items,
				dailyCooldown,
				workCooldown,
				begCooldown,
				robCooldown,
				Waifus,
				Birthday,
				Spam,
				Fricking,
				frickingCooldown,
				Suppress,
				Counting,
			})
		}

		console.log("Successfully loaded utilities")

		const guild = client.guilds.resolve("939674946379083847")

		// await guild.commands.fetch({ force: true })
		await guild.members.fetch({ withPresences: true }, { force: true })
		await guild.scheduledEvents.fetch({ force: true })
		console.log("Guild data fetched")

		console.log("dashi is on~")

		const current = new Date()
		console.log(current.toLocaleString())

		// const tickets = await Birthday.findAll()
		// console.log(tickets)

		// Infraction.update(
		// 	{
		// 		nature: "Violating Article II, Section 7 — spammed sus amogus gifs in <#939674946953682976> (9 in a row)",
		// 	},
		// 	{ where: { infractionid: "4414342" } }
		// )

		// await Birthday.create({
		// 	Guild: "939674946379083847",
		// 	User: "527285622809952256",
		// 	Day: 8,
		// 	Month: 9,
		// 	Year: 2005,
		// })

		// await Birthday.create({
		// 	Guild: "939674946379083847",
		// 	User: "251778379211210755",
		// 	Day: 6,
		// 	Month: 11,
		// 	Year: 2008,
		// })

		// await Birthday.create({
		// 	Guild: "939674946379083847",
		// 	User: "762133129209053244",
		// 	Day: 3,
		// 	Month: 12,
		// 	Year: 2007,
		// })

		// Systems.destroy({ truncate: true }).then(console.log("Systems destroyed"))
		// basicxp.destroy({ truncate: true }).then(console.log("basicxp destroyed"))
		// Dialects.destroy({ truncate: true }).then(console.log("Dialects destroyed"))
		// Tickets.destroy({ truncate: true }).then(console.log("Tickets destroyed"))
		// Infraction.destroy({ truncate: true }).then(console.log("Infractions destroyed"))
		// Economy.destroy({ truncate: true }).then(console.log("Economy destroyed"))
		// Items.destroy({ truncate: true }).then(console.log("Items destroyed"))
		// dailyCooldown.destroy({ truncate: true }).then(console.log("dailyCooldown destroyed"))
		// workCooldown.destroy({ truncate: true }).then(console.log("workCooldown destroyed"))
		// begCooldown.destroy({ truncate: true }).then(console.log("begCooldown destroyed"))
		// robCooldown.destroy({ truncate: true }).then(console.log("robCooldown destroyed"))
		// Waifus.destroy({ truncate: true }).then(console.log("Waifus destroyed"))
		// Birthday.destroy({ truncate: true }).then(console.log("Birthdays destroyed"))
		// Fricking.destroy({ truncate: true }).then(console.log("Fricking destroyed"))
		// frickingCooldown.destroy({ truncate: true }).then(console.log("frickingCooldown destroyed"))
		// Suppress.destroy({ truncate: true }).then(console.log("Suppress destroyed"))
		// Counting.destroy({ truncate: true }).then(console.log("Counting destroyed"))

		// Items.destroy({where: {item: "Birth Control Pills"}})

		// await Items.update({ itemid: "8" }, { where: { item: "Bail Bonds" } }).then(console.log("updated bailbonds"))
		// await Items.update({ itemid: "6" }, { where: { itemid: "5" } }).then(console.log("updated wife"))
		// await Items.update({ itemid: "5" }, { where: { itemid: "4" } }).then(console.log("updated sickle"))
	},
}
