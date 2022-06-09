const {Economy, workCooldown, begCooldown, robCooldown, Waifus} = require("../database")

module.exports = {
    name: "ready",
    once: "true",
    async execute(client){
        let commandhandler = require("../command-handler")
        if (commandhandler.default) commandhandler = commandhandler.default
        commandhandler(client)
    
        let dialecthandler = require("../dialect-handler")
        if (dialecthandler.default) dialecthandler = dialecthandler.default
        dialecthandler(client)
    
        await Economy.sync()
        await workCooldown.sync()
        await begCooldown.sync()
        await robCooldown.sync()
        await Waifus.sync().then(console.log("Database synced"))
    
        const dashiuser = await Economy.findOne({where: {id: "956345939130482750"}})
        if (!dashiuser){
            await Economy.create({id: "956345939130482750", bank: 10000000, debitcard: true, motorcycle: true, superbike: true, wife: true, bailbonds: true})
        }
    
        // await Economy.update({bank: 10000000, debitcard: true, motorcycle: true, superbike: true, wife: true, bailbonds: true}, {where: {id: "956345939130482750"}}).then(console.log("dashi stats set"))
    
        console.log("dashi is on~")
    
        // workCooldown.destroy({truncate: true}).then(console.log("workCooldown destroyed"))
        // begCooldown.destroy({truncate: true}).then(console.log("begCooldown destroyed"))
        // robCooldown.destroy({truncate: true}).then(console.log("robCooldown destroyed"))
    
        // console.log("I am unable.")
        // client.destroy()
    
        // await Economy.destroy({where: {id: "762133129209053244"}})
        // const getUser = await Economy.findOne({where: {id: "826841451945787412"}})
        // console.log(getUser)
    }
}