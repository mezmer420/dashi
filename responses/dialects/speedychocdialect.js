module.exports = {
    name: "speedychocdialect",
    description: "says speedychoc dialect",
    execute(message, sleep){
        async function speedychocdialect() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("speedychoc dialect")
        }
        speedychocdialect()
    }
}