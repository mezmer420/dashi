module.exports = {
    name: "speedydialect",
    description: "says speedy dialect",
    execute(message, sleep){
        async function speedydialect() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 0) + 1001)
            message.channel.send("speedy dialect uwu owu uwo ow- -w- -wu uWu")
        }
        speedydialect()
    }
}