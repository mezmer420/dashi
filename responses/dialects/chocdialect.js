module.exports = {
    name: "chocdialect",
    description: "says choc dialect",
    execute(message, sleep){
        async function chocdialect() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("choc dialect")
        }
        chocdialect()
    }
}