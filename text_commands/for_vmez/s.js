const sayWord = "!s"

module.exports = {
    callback: (message, args) => {
        if(message.author.id == "527285622809952256" || message.author.id == "762133129209053244"){
            for (var i = 0; i < sayWord.length; i++) {
                const index = message.content.indexOf(sayWord[i])
                if (index !== -1) {
                    // add one to include the space
                    const messagetosend = message.content.slice(index + sayWord[i].length + 1)
                    const empty = ""
                    if(messagetosend == empty){
                        message.reply('specify what you want me to say! command format is "!s [message]"')
                    }
                    else {
                        message.channel.send(`${messagetosend}`)
                        // message.channel.send(`${messagetosend}`).then(sentMessage =>{
                        //     sentMessage.react("1️⃣")
                        //     sentMessage.react("2️⃣")
                        //     sentMessage.react("3️⃣")
                        //     sentMessage.react("4️⃣")
                        //     sentMessage.react("5️⃣")
                        //     sentMessage.react("6️⃣")
                        //     sentMessage.react("7️⃣")
                        // })
                        message.delete()
                    }
                    break
                }
            }
        }

        else {
            message.reply("only mezmer420 and vcash can use that command! (these messages will autodelete)")
            .then(msg => {
                setTimeout(() => message.delete()
                .catch((err) => {
                    return
                }), 6000)
                setTimeout(() => msg.delete()
                .catch((err) => {
                    return
                }), 6000)
              })
        }
    }
}