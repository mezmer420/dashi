module.exports = {
    name: "saybruhmoment",
    description: "says bruh moment",
    execute(message, sleep){
        async function bruhmoment() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 1000) + 1001)
            message.channel.send("bruh moment")
        }
        bruhmoment()
    }
}