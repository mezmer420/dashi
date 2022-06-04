module.exports = {
    name: "messageReactionRemove",
    async execute(reaction, user){
        // When a reaction is received, check if the structure is partial
        if(reaction.partial){
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch()
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error)
                // Return as `reaction.message.author` may be undefined/null
                return
            }
        }
    
        else {
            if(user.bot) return
            if(reaction.message.channel.id == "963930001303015495"){
                if(reaction.emoji.name == "1️⃣"){
                    const weeb = reaction.message.guild.roles.cache.find(r => r.id == "956642101653827674")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.remove(weeb)
                    // console.log(`${user.username} removed ${weeb.name}`)
                }
        
                else if(reaction.emoji.name == "2️⃣"){
                    const procrastinator = reaction.message.guild.roles.cache.find(r => r.id == "953099131797270588")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.remove(procrastinator)
                    // console.log(`${user.username} removed ${procrastinator.name}`)
                }
        
                else if(reaction.emoji.name == "3️⃣"){
                    const gordon = reaction.message.guild.roles.cache.find(r => r.id == "952349639426854973")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.remove(gordon)
                    // console.log(`${user.username} removed ${gordon.name}`)
                }
        
                else if(reaction.emoji.name == "4️⃣"){
                    const funque = reaction.message.guild.roles.cache.find(r => r.id == "963928836356051025")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.remove(funque)
                    // console.log(`${user.username} removed ${funque.name}`)
                }
        
                else if(reaction.emoji.name == "5️⃣"){
                    const streams = reaction.message.guild.roles.cache.find(r => r.id == "963933396227219497")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.remove(streams)
                    // console.log(`${user.username} removed ${streams.name}`)
                }
        
                else if(reaction.emoji.name == "6️⃣"){
                    const innoc = reaction.message.guild.roles.cache.find(r => r.id == "964556786105475092")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.remove(innoc)
                    // console.log(`${user.username} removed ${innoc.name}`)
                }
        
                else if(reaction.emoji.name == "7️⃣"){
                    const nerd = reaction.message.guild.roles.cache.find(r => r.id == "969432438516375603")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.remove(nerd)
                    // console.log(`${user.username} removed ${nerd.name}`)
                }
            }
        }
    }
}