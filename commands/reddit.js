module.exports = {
    name: "reddit",
    description: "send subreddit",
    execute(message, reddit){
        for (var i = 0; i < reddit.length; i++) {
            const index = message.content.indexOf(reddit[i])
            if (index !== -1) {
                // add one to include the space
                const subreddit = message.content.slice(index + reddit[i].length + 1)
                const empty = ""
                if(subreddit == empty){
                    message.reply('specify what the subreddit is! format is "r/[subreddit]"')
                }
                else {
                    message.channel.send(`https://www.reddit.com/r/${subreddit}/`)
                }
                break
            }
        }
    }
}