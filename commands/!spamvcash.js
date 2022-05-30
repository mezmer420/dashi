module.exports = {
    name: "!spamvcash",
    description: "spam vcash script, only i can use",
    execute(message, command){
        if(message.channel.id == "945527434655187006"){
            switch (message.content) {
                case "!spamvcash":
                    message.channel.send("<@762133129209053244>")
                    interval = setInterval (function () {
                    message.channel.send("<@762133129209053244>")
                    .catch(console.error)
                }, 2000) // send every 2 seconds; don't recommend going below 2 seconds for stability
                break
            
                case "!stopspamvcash":
                    clearInterval(interval)
                    message.channel.send("vcash spam is stopped")
                break
            }
        }
        else {
            if(command == "!spamvcash" || command == "!stopspamvcash")
            message.reply(`you can only use that command in ${message.guild.channels.cache.get("945527434655187006").toString()}! (these messages will autodelete)`)
            .then(msg => {
                setTimeout(() => message.delete(), 6000)
                setTimeout(() => msg.delete(), 6000)
              })
              .catch()
        }
    }
}