const {Dialects, Tickets, Infractions, Economy, Items, dailyCooldown, workCooldown, begCooldown, robCooldown, Waifus, Birthdays, Spam} = require("../database")

module.exports = {
    name: "ready",
    once: "true",
    async execute(client){
        let commandhandler = require("../text_command-handler")

        if(commandhandler.default){
            commandhandler = commandhandler.default
        }

        commandhandler(client)
    
        // let dialecthandler = require("../dialect-handler")

        // if(dialecthandler.default){
        //     dialecthandler = dialecthandler.default
        // }

        // dialecthandler(client)
    
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
        await Birthdays.sync()
        await Spam.sync()
        console.log("Database synced")

        await Spam.destroy({truncate: true})
        await Spam.create({starterid: "10", active: false})

        const guild = client.guilds.resolve("939674946379083847")

        // await guild.commands.fetch({force: true})
        await guild.members.fetch({force: true})
        await guild.scheduledEvents.fetch({force: true})
        console.log("Guild data fetched")

        console.log("dashi is on~")

        const current = new Date()
        console.log(current.toLocaleString())
        
        // Infractions.destroy({truncate: true}).then(console.log("Infractions destroyed"))
        // Economy.destroy({truncate: true}).then(console.log("Economy destroyed"))
        // Items.destroy({truncate: true}).then(console.log("Items destroyed"))
        // dailyCooldown.destroy({truncate: true}).then(console.log("dailyCooldown destroyed"))
        // workCooldown.destroy({truncate: true}).then(console.log("workCooldown destroyed"))
        // begCooldown.destroy({truncate: true}).then(console.log("begCooldown destroyed"))
        // robCooldown.destroy({truncate: true}).then(console.log("robCooldown destroyed"))
        // Waifus.destroy({truncate: true}).then(console.log("Waifus destroyed"))

        // await Items.update({itemid: "7"}, {where: {itemid: "6"}}).then(console.log('updated bailbonds'))
        // await Items.update({itemid: "6"}, {where: {itemid: "5"}}).then(console.log('updated wife'))
        // await Items.update({itemid: "5"}, {where: {itemid: "4"}}).then(console.log('updated sickle'))
    }
}