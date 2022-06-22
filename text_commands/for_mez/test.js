module.exports = {
    callback: async (client, message, args) => {
        if(message.author.id == "527285622809952256"){
            message.channel.send(`Use the reactions below to opt in and out of roles.\n>>> 1️⃣ <@&id> — anime lovers\n2️⃣ <@&id> — people who procrastinate\n3️⃣ <@&id> — cooking experts\n4️⃣ <@&id> — pinged when a fun poll is posted in <#964714582402826280>\n5️⃣ <@&id> — pinged when someone is streaming\n6️⃣ <@&id> — not able to view <#947275856919810048>\n7️⃣ <@&id> — nerds who have access to <#969027553878749204>`)
        }

        else {
            message.reply("only mezmer420 can use that command! (these messages will autodelete)")
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