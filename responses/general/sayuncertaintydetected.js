module.exports = {
    name: "sayuncertaintydetected",
    description: "says uncertainty detected",
    execute(message, sleep){
        async function uncertaintydetected() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("uncertainty detected")
        }
        uncertaintydetected()
    }
}