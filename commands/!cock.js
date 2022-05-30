module.exports = {
    name: "!cock",
    description: "spam choc script, vcash and i can use",
    execute(message, command){
        if(message.channel.id == "945527434655187006"){
            switch (message.content) {
                case "!cock":
                    message.channel.send("<@826841451945787412>")
                    interval = setInterval (function () {
                    message.channel.send("<@826841451945787412>")
                    .catch(console.error)
                }, 2000) // send every 2 seconds; don't recommend going below 2 seconds for stability
                break
            
                case "!stopcock":
                    clearInterval(interval)
                    message.channel.send("choc spam is stopped")
                break
            }
        }
        else {
            if(command == "!cock" || command == "!stopcock")
            message.reply(`you can only use that command in ${message.guild.channels.cache.get("945527434655187006").toString()}! (these messages will autodelete)`)
            .then(msg => {
                setTimeout(() => message.delete(), 6000)
                setTimeout(() => msg.delete(), 6000)
              })
              .catch()
        }
    }
}