module.exports = {
    callback: (client, message, args) => {
        if(message.author.id == "762133129209053244" || message.author.id == "527285622809952256" || message.author.id == "826841451945787412"){
            if(message.channel.id == "973334244178919504"){
                message.channel.send("https://c.tenor.com/tKcnhoT4No8AAAAC/of-to-gulag.gif")
                .catch((err) => {
                    return console.log(err)
                })
            }

            else {
                message.reply("for safety, you can only use that command in <#973334244178919504>")
                .catch((err) => {
                    return
                })
            }
        }

        else {
            message.reply("only government officials can use that command! (these messages will autodelete)")
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