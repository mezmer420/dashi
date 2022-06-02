module.exports = {
    name: "saynerd",
    description: "says nerd",
    execute(message, sleep){
        async function nerd() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("nerd")
        }
        nerd()
    }
}