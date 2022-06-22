const {Infractions, Economy, dailyCooldown, workCooldown, begCooldown, robCooldown, Waifus} = require("../database")

module.exports = {
    name: "ready",
    once: "true",
    async execute(client){
        let commandhandler = require("../text_command-handler")

        if(commandhandler.default){
            commandhandler = commandhandler.default
        }

        commandhandler(client)
    
        let dialecthandler = require("../dialect-handler")

        if(dialecthandler.default){
            dialecthandler = dialecthandler.default
        }

        dialecthandler(client)
    
        await Infractions.sync()
        await Economy.sync()
        await dailyCooldown.sync()
        await workCooldown.sync()
        await begCooldown.sync()
        await robCooldown.sync()
        await Waifus.sync()
        console.log("Database synced")
    
        const dashiuser = await Economy.findOne({where: {id: "956345939130482750"}})
        if(!dashiuser){
            Economy.create({id: "956345939130482750", bank: 10000000, debitcard: true, motorcycle: true, superbike: true, wife: true, bailbonds: true})
        }

        const guild = client.guilds.resolve("939674946379083847")

        // await guild.commands.fetch({force: true})
        await guild.members.fetch({force: true})
        await guild.scheduledEvents.fetch({force: true})
        console.log("Guild data fetched")

        console.log("dashi is on~")

        const current = new Date()
        console.log(current.toLocaleString())
    
        // await Economy.update({bank: 10000000, debitcard: true, motorcycle: true, superbike: true, wife: true, bailbonds: true}, {where: {id: "956345939130482750"}}).then(console.log("dashi stats set"))

        // Infractions.destroy({truncate: true}).then(console.log("Infractions destroyed"))
        // Economy.destroy({truncate: true}).then(console.log("Economy destroyed"))
        // dailyCooldown.destroy({truncate: true}).then(console.log("dailyCooldown destroyed"))
        // workCooldown.destroy({truncate: true}).then(console.log("workCooldown destroyed"))
        // begCooldown.destroy({truncate: true}).then(console.log("begCooldown destroyed"))
        // robCooldown.destroy({truncate: true}).then(console.log("robCooldown destroyed"))
        // Waifus.destroy({truncate: true}).then(console.log("Waifus destroyed"))

        // await Economy.destroy({where: {id: "762133129209053244"}})
        // const getUser = await Economy.findOne({where: {id: "826841451945787412"}})
        // console.log(getUser)
    
        // console.log("I am unable.")
        // client.destroy()
    }
}