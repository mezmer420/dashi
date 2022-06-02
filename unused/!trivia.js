const { MessageEmbed } = require("discord.js")

let questions = [
    {
        title: "Best programming language",
        options: ["JavaScript/TypeScript", "Python", "Ruby", "Rust"],
        correct: 1
    },

    {
        title: "Best NPM package",
        options: ["int.enginge", "ms", "ws", "discord.js"],
        correct: 4
    },

    {
        title: "Which command is better",
        options: ["8ball", "catsay", "rob", "pony"],
        correct: 3
    }
]

module.exports = {
    name: "!trivia",
    description: "Test your knowledge",
    execute(message){
        async function trivia() {
            let q = questions[Math.floor(Math.random() * questions.length)]
            let i = 0

            const Embed = new MessageEmbed()
            .setTitle(q.title)
            .setDescription(
"test"
                
            )
            .setColor("GREEN")
            .setFooter("Reply to this message with the correct question number! You have 15 seconds.")
            message.chanel.send({embeds: [Embed]})
            try {
                let msgs = await message.channel.awaitMessages(
                    (u2) => u2.author.id == message.author.id,
                    {time: 1500, max: 1, errors: ["time"]}
                )
                if (parseInt(msgs.first().content) == q.correct){
                    return message.chanel.send("You got it correct!")
                } else {
                    return message.channel.send("You got it incorrect.")
                }
            } catch (e) {
                return message.chanel.send("You did not answer!")
            }
        }

    //     async function trivia() {
    //         let q = questions[Math.floor(Math.random() * questions.length)];
    // let i = 0;
    // const Embed = new MessageEmbed()
    //   .setTitle(q.title)
    //   .setDescription(
    //     q.options.map((opt) => {
    //       i++;
    //       return `${i} - ${opt}\n`;
    //     })
    //   )
    //   .setColor(`GREEN`)
    //   .setFooter(
    //     `Reply to this message with the correct question number! You have 15 seconds.`
    //   );
    // message.channel.send({ embeds: [Embed] });
    // try {
    //   let msgs = await message.channel.awaitMessages(
    //     (u2) => u2.author.id === message.author.id,
    //     { time: 15000, max: 1, errors: ["time"] }
    //   );
    //   if (parseInt(msgs.first().content) == q.correct) {
    //     return message.channel.send(`You got it correct!`);
    //   } else {
    //     return message.channel.send(`You got it incorrect.`);
    //   }
    // } catch (e) {
    //   return message.channel.send(`You did not answer!`);
    // }
    //     }

        trivia()
    }
}