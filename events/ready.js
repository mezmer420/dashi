const {
	basicxp,
	Dialects,
	Tickets,
	Infractions,
	Economy,
	Items,
	dailyCooldown,
	workCooldown,
	begCooldown,
	robCooldown,
	Waifus,
	Birthday,
	Spam,
} = require("../database")

module.exports = {
	name: "ready",
	once: "true",
	async execute(client) {
		let commandhandler = require("../text_command-handler")
		if (commandhandler.default) {
			commandhandler = commandhandler.default
		}
		commandhandler(client)

		const fs = require("fs")

		const utilityFiles = fs
			.readdirSync("./utilities/")
			.filter((file) => file.endsWith(".js"))

		for (const file of utilityFiles) {
			const event = require(`../utilities/${file}`)

			event({
				client,
				basicxp,
				Dialects,
				Tickets,
				Infractions,
				Economy,
				Items,
				dailyCooldown,
				workCooldown,
				begCooldown,
				robCooldown,
				Waifus,
				Birthday,
				Spam,
			})
		}

		console.log("Successfully loaded utilities")

		await basicxp.sync()
		await Dialects.sync()
		await Tickets.sync()
		await Infractions.sync()
		await Economy.sync()
		await Items.sync()
		await dailyCooldown.sync()
		await workCooldown.sync()
		await begCooldown.sync()
		await robCooldown.sync()
		await Waifus.sync()
		await Birthday.sync()
		await Spam.sync()

		console.log("Database synced")

		await Spam.destroy({ truncate: true })
		await Spam.create({ starterid: "10", active: false })

		const guild = client.guilds.resolve("939674946379083847")

		// await guild.commands.fetch({ force: true })
		await guild.members.fetch({ withPresences: true }, { force: true })
		await guild.scheduledEvents.fetch({ force: true })
		console.log("Guild data fetched")

		console.log("dashi is on~")

		const current = new Date()
		console.log(current.toLocaleString())

		// basicxp.destroy({ truncate: true }).then(console.log("basicxp destroyed"))
		// Dialects.destroy({ truncate: true }).then(console.log("Dialects destroyed"))
		// Tickets.destroy({ truncate: true }).then(console.log("Tickets destroyed"))
		// Infractions.destroy({ truncate: true }).then(console.log("Infractions destroyed"))
		// Economy.destroy({ truncate: true }).then(console.log("Economy destroyed"))
		// Items.destroy({ truncate: true }).then(console.log("Items destroyed"))
		// dailyCooldown.destroy({ truncate: true }).then(console.log("dailyCooldown destroyed"))
		// workCooldown.destroy({ truncate: true }).then(console.log("workCooldown destroyed"))
		// begCooldown.destroy({ truncate: true }).then(console.log("begCooldown destroyed"))
		// robCooldown.destroy({ truncate: true }).then(console.log("robCooldown destroyed"))
		// Waifus.destroy({ truncate: true }).then(console.log("Waifus destroyed"))
		// Birthday.destroy({ truncate: true }).then(console.log("Birthdays destroyed"))

		// await Items.update({ itemid: "7" }, { where: { itemid: "6" } }).then(console.log("updated bailbonds"))
		// await Items.update({ itemid: "6" }, { where: { itemid: "5" } }).then(console.log("updated wife"))
		// await Items.update({ itemid: "5" }, { where: { itemid: "4" } }).then(console.log("updated sickle"))
	},
}
