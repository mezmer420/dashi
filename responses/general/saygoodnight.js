module.exports = {
    name: "saygoodnight",
    description: "says goodnight 😴 🛌 💤 🌛 don't let the bed bugs bite",
    execute(message, sleep){
        async function goodnight() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("goodnight 😴 🛌 💤 🌛 don't let the bed bugs bite")
        }
        goodnight()
    }
}