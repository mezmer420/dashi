module.exports = {
    callback: async (client, message, args) => {
        if(message.author.id == "527285622809952256"){
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("sowwy")
        }

        else {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("no")
        }
    }
}