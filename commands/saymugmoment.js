module.exports = {
    name: "saymugmoment",
    description: "says mug moment",
    execute(message, sleep){
        async function mugmoment() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("mug moment")
        }
        mugmoment()
    }
}