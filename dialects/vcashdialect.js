module.exports = {
    name: "vcashdialect",
    description: "says vcashy dialect",
    execute(message, sleep){
        async function vcashdialect() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 1000) + 1001)
            message.channel.send("vcash dialect")
        }
        vcashdialect()
    }
}