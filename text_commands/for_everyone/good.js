function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    callback: async (client, message, args) => {
        message.channel.sendTyping()
        .catch((err) => {
            return console.log(err)
        })

        await sleep(Math.floor(Math.random() * 0) + 1001)
        
        message.channel.send(">;)")
        .catch((err) => {
            return console.log(err)
        })
    }
}