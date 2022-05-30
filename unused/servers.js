module.exports = {
    name: "!servers",
    description: "sends server information",
    execute(client, message){
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `"${guild.name}" has ${guild.memberCount} members`
            )
        })
    }
}