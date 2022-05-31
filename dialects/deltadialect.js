module.exports = {
    name: "deltadialect",
    description: "says delta dialect",
    execute(message, sleep){
        async function deltadialect() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("delta airlines dialect")
        }
        deltadialect()
    }
}