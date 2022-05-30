module.exports = {
    name: "Yuri2",
    description: "Yuri 2 embed",
    execute(message, Discord){
        const yuri2Embed = new Discord.MessageEmbed()
        .setColor("#A020F0")
        .setTitle("Yuri")
        .setDescription("Doki Doki Literature Club!")
        .setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9f1a633b-231d-4b77-9c14-5ce67d4f0917/dby7b7r-32eeabbd-0bb3-4c82-8790-89258f5e31f6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlmMWE2MzNiLTIzMWQtNGI3Ny05YzE0LTVjZTY3ZDRmMDkxN1wvZGJ5N2I3ci0zMmVlYWJiZC0wYmIzLTRjODItODc5MC04OTI1OGY1ZTMxZjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2EwAYyQ9l_06CzOTGD3EVlxok7AKpW9NLroKsPo_z_I")
        message.channel.send({embeds: [yuri2Embed]})
    }
}