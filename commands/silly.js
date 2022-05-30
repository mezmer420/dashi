module.exports = {
    name: "silly",
    description: "says silly qilly willy rilly tilly yilly pilly dilly filly gilly hilly jilly killy lilly zilly xilly cilly villy billy nilly milly",
    execute(message, sleep){
        async function silly() {
            message.channel.sendTyping()
            await sleep(Math.floor(Math.random() * 1000) + 1001)
            message.channel.send("silly qilly willy rilly tilly yilly pilly dilly filly gilly hilly jilly killy lilly zilly xilly cilly villy billy nilly milly")
        }
        silly()
    }
}