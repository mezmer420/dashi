const { blacklistedchannels, blacklistedcategories } = require("../../blacklisted-channels-and-categories")

const wait = require("node:timers/promises").setTimeout

module.exports = {
    callback: async (message, args) => {
        if(blacklistedchannels.includes(message.channel.id) || blacklistedcategories.includes(message.channel.parent.id)) return

        message.channel.sendTyping()
        .catch((err) => {
            return console.log(err)
        })

        await wait(Math.floor(Math.random() * 0) + 1001)

        message.channel.send("delta airlines dialect")
        .catch((err) => {
            return console.log(err)
        })
    }
}