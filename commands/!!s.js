module.exports = {
    name: "!!s",
    description: "say anything (only i can use), can be used in any channel",
    execute(message, sayWord){
        // const he = ["@everyone", "@here"]

        // if(message.author.id == "251778379211210755"){
        //     if(he.some(word => message.content.includes(word))){
        //         message.reply("nice try at bypassing your pinging restrictions through me")
        //     }
        //     else {
        //     for (var i = 0; i < sayWord.length; i++) {
        //         const index = message.content.indexOf(sayWord[i])
        //         if (index !== -1) {
        //             // add one to include the space
        //             const messagetosend = message.content.slice(index + sayWord[i].length + 3)
        //             const empty = ""
        //             if(messagetosend == empty){
        //                 message.reply('specify what you want me to say! command format is "!!s [message]"')
        //             }
        //             else {
        //                 message.channel.send(`${messagetosend}`)
        //                 message.delete()
        //             }
        //             break
        //         }
        //     }
        // }
        // }

        if(message.author.id == "527285622809952256"){
            for (var i = 0; i < sayWord.length; i++) {
                const index = message.content.indexOf(sayWord[i])
                if (index !== -1) {
                    // add one to include the space
                    const messagetosend = message.content.slice(index + sayWord[i].length + 2)
                    const empty = ""
                    if(messagetosend == empty){
                        message.reply('specify what you want me to say! command format is "!!s [message]"')
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

        // response to non-me who try to use !!s
        if(message.author.id == "527285622809952256") return
        // if(message.author.id == "251778379211210755") return
            message.reply("only mezmer420 can use that command! (these messages will autodelete)")
            .then(msg => {
              setTimeout(() => message.delete(), 6000)
              setTimeout(() => msg.delete(), 6000)
            })
            .catch()
    }
}