module.exports = {
    name: "TwilightSparkle",
    description: "Twilight Sparkle embed",
    execute(message, Discord){
        const twilightsparkleEmbed = new Discord.MessageEmbed()
        .setColor("#CC9CDF")
        .setTitle("Twilight Sparkle")
        .setDescription("book horse")
        .setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ea656545-c0c2-426c-bc41-e47ce5c7a0c9/ddx441e-7ec94165-cf65-48f7-a15b-14ae1f30c8df.png/v1/fill/w_1280,h_1716,strp/twilight_sparkle_a_true_princess_by_andoanimalia_ddx441e-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTcxNiIsInBhdGgiOiJcL2ZcL2VhNjU2NTQ1LWMwYzItNDI2Yy1iYzQxLWU0N2NlNWM3YTBjOVwvZGR4NDQxZS03ZWM5NDE2NS1jZjY1LTQ4ZjctYTE1Yi0xNGFlMWYzMGM4ZGYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.N96lZelDRuUdr6NzE8OSTIU8tocBI3MQVAHsgqoQAEI")
        message.channel.send({embeds: [twilightsparkleEmbed]})
    }
}