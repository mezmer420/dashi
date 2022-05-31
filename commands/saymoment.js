module.exports = {
    name: "saymoment",
    description: "says moment",
    execute(message, sleep){
        async function moment() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("moment")
        }
        moment()
    }
}