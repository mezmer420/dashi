module.exports = {
    callback: (client, message, args) => {
        if(message.author.id == "527285622809952256" || message.author.id == "762133129209053244"){
            if(message.channel.id == "945527434655187006"){
                switch (message.content) {
                    case "!stopspamspedy":
                        clearInterval(interval)
                        message.channel.send("speedy spam is stopped")
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
            message.reply("only mezmer420 and vcashy can use that command! (these messages will autodelete)")
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