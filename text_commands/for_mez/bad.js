module.exports = {
    callback: async (client, message, args) => {
        if(message.author.id == "527285622809952256"){
            message.channel.sendTyping()
            .catch((err) => {
                return console.log(err)
            })

            await sleep(Math.floor(Math.random() * 0) + 1001)
            
            message.channel.send("sowwy")
            .catch((err) => {
                return console.log(err)
            })
        }

        else {
            message.channel.sendTyping()
            .catch((err) => {
                return console.log(err)
            })

            await sleep(Math.floor(Math.random() * 0) + 1001)
            
            message.channel.send("no")
            .catch((err) => {
                return console.log(err)
            })
        }
    }
}