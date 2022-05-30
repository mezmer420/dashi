module.exports = {
    name: "saywhynot",
    description: "says why not",
    execute(message, sleep){
        async function whynot() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 1000) + 1001)
            message.channel.send("why not")
        }
        whynot()
    }
}