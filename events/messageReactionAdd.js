module.exports = {
    name: "messageReactionAdd",
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
            if(reaction.message.channel.id == "964361642668343376"){
                if(reaction.emoji.name == "✅"){
                    const eoicrole = reaction.message.guild.roles.cache.find(r => r.id == "957872601550716929")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.add(eoicrole)
                    // console.log(`${user.username} verified`)
        
                    // console.log(`${eoicrole.name}, ${member}, test`)
        
                    // if(member.roles.has(eoicrole)){
                    //     console.log("has eoic gamer")
                    // }
                    // else {
                    //     console.log("doesn't have eoic gamer")
                    // }
                }
            }
    
            else if(reaction.message.channel.id == "963930001303015495"){
                if(reaction.emoji.name == "1️⃣"){
                    const weeb = reaction.message.guild.roles.cache.find(r => r.id == "956642101653827674")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.add(weeb)
                    // console.log(`${user.username} got ${weeb.name}`)
                }
    
                else if(reaction.emoji.name == "2️⃣"){
                    const procrastinator = reaction.message.guild.roles.cache.find(r => r.id == "953099131797270588")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.add(procrastinator)
                    // console.log(`${user.username} got ${procrastinator.name}`)
                }
    
                else if(reaction.emoji.name == "3️⃣"){
                    const gordon = reaction.message.guild.roles.cache.find(r => r.id == "952349639426854973")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.add(gordon)
                    // console.log(`${user.username} got ${gordon.name}`)
                }
    
                else if(reaction.emoji.name == "4️⃣"){
                    const funque = reaction.message.guild.roles.cache.find(r => r.id == "963928836356051025")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.add(funque)
                    // console.log(`${user.username} got ${funque.name}`)
                }
    
                else if(reaction.emoji.name == "5️⃣"){
                    const streams = reaction.message.guild.roles.cache.find(r => r.id == "963933396227219497")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.add(streams)
                    // console.log(`${user.username} got ${streams.name}`)
                }
    
                else if(reaction.emoji.name == "6️⃣"){
                    const innoc = reaction.message.guild.roles.cache.find(r => r.id == "964556786105475092")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.add(innoc)
                    // console.log(`${user.username} got ${innoc.name}`)
                }
    
                else if(reaction.emoji.name == "7️⃣"){
                    const nerd = reaction.message.guild.roles.cache.find(r => r.id == "969432438516375603")
                    const {guild} = reaction.message
                    const member = guild.members.cache.find(member => member.id == user.id)
        
                    // console.log(`${user.username} reacted to ${reaction.message.author.username}'s message "${reaction.message.content}" with ${reaction.emoji.name}`)
        
                    member.roles.add(nerd)
                    // console.log(`${user.username} got ${nerd.name}`)
                }
            }
        }
    
        // Now the message has been cached and is fully available
        // console.log(`${reaction.message.author.username}'s message "${reaction.message.content}" gained a reaction!`)
        // const member = reaction.message.guild.members.get(user.id)
        // The reaction is now also fully available and the properties will be reflected accurately:
        // console.log(`${reaction.count} user(s) have given the same reaction to this message!`)
    }
}