function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    callback: async (client, message, args) => {
        message.channel.sendTyping()
        await sleep(Math.floor(Math.random() * 0) + 1001)
        message.channel.send(">;)")
    }
}