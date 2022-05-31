module.exports = {
    name: "saylackcare",
    description: "says lack care",
    execute(message, sleep){
        async function lackcare() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("lack care")
        }
        lackcare()
    }
}