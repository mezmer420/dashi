module.exports = {
    name: "guildMemberAdd",
    async execute(client, member){
        member.send(`${member.user.username}, welcome to Eoic Gamer Server!`)
        .catch((err) => {
            return
        })
    }
}