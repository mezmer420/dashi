module.exports = {
    callback: (client, message, args) => {
        if(message.author.id == "527285622809952256" || message.author.id == "826841451945787412"){
            if(message.channel.id == "945527434655187006"){
                switch (message.content) {
                    case "!spamvcash":
                        message.channel.send("<@762133129209053244>")
                        interval = setInterval (function () {
                        message.channel.send("<@762133129209053244>")
                        .catch(console.error)
                    }, 2000) // send every 2 seconds; don't recommend going below 2 seconds for stability
                    break
                }
            }
            
            else {
                message.reply("you can only use that command in <#945527434655187006>! (these messages will autodelete)")
                .catch((err) => {
                    return
                })
                .then(msg => {
                    setTimeout(() => message.delete()
                    .catch((err) => {
                        return
                    }), 6000)
                    if(msg){
                        setTimeout(() => msg.delete()
                        .catch((err) => {
                            return
                        }), 6000)
                    }
                  })
            }
        }

        else {
            message.reply("only mezmer420 and choc can use that command! (these messages will autodelete)")
            .catch((err) => {
                return
            })
            .then(msg => {
                setTimeout(() => message.delete()
                .catch((err) => {
                    return
                }), 6000)
                if(msg){
                    setTimeout(() => msg.delete()
                    .catch((err) => {
                        return
                    }), 6000)
                }
              })
        }
    }
}