module.exports = {
    name: "guildMemberAdd",
    async execute(member){
        member.send(`${member.user.username}, welcome to Eoic Gamer Server!`)
    }
}