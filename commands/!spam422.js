module.exports = {
    name: "!spam422",
    description: "spam mezmer422 script, only i can use",
    execute(message, command){
        if(message.channel.id == "945527434655187006"){
            switch (message.content) {
                case "!spam422":
                    message.channel.send("<@842775855632744478>")
                    interval = setInterval (function () {
                    message.channel.send("<@842775855632744478>")
                    .catch(console.error)
                }, 2000) // send every 2 seconds; don't recommend going below 2 seconds for stability
                break
            
                case "!stopspam422":
                    clearInterval(interval)
                    message.channel.send("mezmer422 spam is stopped")
                break
            }
        }
        else {
            if(command == "!spam422" || command == "!stopspam422")
            message.reply(`you can only use that command in ${message.guild.channels.cache.get("945527434655187006").toString()}! (these messages will autodelete)`)
            .then(msg => {
                setTimeout(() => message.delete(), 6000)
                setTimeout(() => msg.delete(), 6000)
              })
              .catch()
        }
    }
}