module.exports = {
    name: "!france",
    description: "sends france flag gif",
    execute(message){
        if(message.author.id == "762133129209053244" || message.author.id == "527285622809952256" || message.author.id == "826841451945787412"){
            message.channel.send("https://c.tenor.com/eUGNMYebEwoAAAAC/bleu-blanc-rouge-france.gif")
        }
        else {
            message.reply("only governmental officials can use that command! (these messages will autodelete)")
            .then(msg => {
                setTimeout(() => message.delete(), 6000)
                setTimeout(() => msg.delete(), 6000)
              })
              .catch()
        }
    }
}