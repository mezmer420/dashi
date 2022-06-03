// index.js

// dad bot (anywhere in message)
// client.on("messageCreate", message =>{

//     const args = message.content.split(/ +/)
//     const command = args.shift().toLowerCase()

//     const imWord = ["i'm", "im"]

//     if(message.author.id == "956345939130482750") return
//     for (var i = 0; i < imWord.length; i++) {
//         const index = message.content.toLowerCase().indexOf(imWord[i])
//         if (index !== -1) {
//             // add one to include the space
//             const name = message.content.slice(index + imWord[i].length + 1)

//             message.channel.send(`hi ${name}`)
//             break
//         }
//     }
// })

// bad language response from anywhere in message
// client.on("messageCreate", message =>{
//     if(message.channel.id == semi || message.channel.id == gove || message.channel.id == mee6 || message.channel.id == vtts || message.channel.id == mtts || message.channel.id == ctts || message.channel.id == role || message.channel.id == funq || message.channel.id == hydr) return
//     if(message.author.id == "956345939130482750") return

//     const badWord = ["fuck", "bitch", "damn", "shit"]

//     for (var i = 0; i < badWord.length; i++) {
//         const index = message.content.toLowerCase().indexOf(badWord[i])
//         if (index !== -1) {
//             message.reply("language!")
//             break
//         }
//     }
// })

// dm winner
// client.on("messageCreate", message =>{
//     if(message.author.bot || message.author.id == "762133129209053244") return

//     const args = message.content.split(/ +/)
//     const command = args.shift().toLowerCase()

//     if(command == "idecay"){
//         message.author.send('Congratulations! You won the secret contest of mezmer420 (to say "idecay")! DO NOT tell anyone you have won until mezmer420 gives you the winner role.')
//         message.channel.send("<@527285622809952256>")
//     }
// })