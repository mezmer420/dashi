const fs = require("fs")
const getFiles = require("./get-dialect-files")

module.exports = (client) => {
    const dialects = {}

    const suffix = ".js"

    const dialectFiles = getFiles("./responses/dialects", suffix)
    // console.log(dialectFiles)

    for (const dialect of dialectFiles) {
        let dialectFile = require(dialect)
        if (dialectFile.default) dialectFile = dialectFile.default

        const split = dialect.replace(/\\/g, "/").split("/")
        const dialectName = split[split.length - 1].replace(suffix, "")

        dialects[dialectName.toLowerCase()] = dialectFile
    }

    // console.log(dialects)
    console.log("Successfully loaded dialects.")

    client.on("messageCreate", (message) => {
        if(message.channel.type == "DM" || message.author.bot) return

        const args = message.content.split(/ +/)
        const dialectName = args.shift().toLowerCase()

        if (!dialects[dialectName]) return

        try {
            dialects[dialectName].callback(message)
        } catch (error) {
            console.error(error)
        }
    })
}