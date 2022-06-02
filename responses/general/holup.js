module.exports = {
    name: "holup",
    description: "sends r/holup",
    execute(message){
        message.channel.send("https://www.reddit.com/r/HolUp/")
    }
}