module.exports = {
    name: "mezmerdialect",
    description: "says mezmer dialect",
    execute(message, sleep){
        async function mezmerdialect() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 1000) + 1001)
            message.channel.send("mezmer dialect")
        }
        mezmerdialect()
    }
}