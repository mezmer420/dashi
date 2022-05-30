module.exports = {
    name: "!good",
    description: "says >;)",
    execute(message, sleep){
        async function good() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 1000) + 1001)
            message.channel.send(">;)")
        }
        good()
    }
}