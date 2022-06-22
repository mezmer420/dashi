const fs = require("fs")

const getFiles = (dir, suffix) => {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    })

    let dialectFiles = []

    for (const file of files) {
        if (file.isDirectory()) {
            dialectFiles = [
                ...dialectFiles,
                ...getFiles(`${dir}/${file.name}`, suffix),
            ]
        } else if (file.name.endsWith(suffix)) {
            dialectFiles.push(`${dir}/${file.name}`)
        }
    }

    return dialectFiles
}

module.exports = (client) => {
    const dialects = {}

    const suffix = ".js"

    const dialectFiles = getFiles("./dialects", suffix)
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

        const args = message.content
        const dialectName = args.toLowerCase()

        if (!dialects[dialectName]) return

        // const choc = "choc dialect"
        // const delta = "delta airlines dialect"
        // const georgeerto = "georgeerto dialect"
        // const mezmer = "mezmer dialect"
        // const speedy = "speedy dialect uwu owu uwo ow- -w- -wu uWu"
        // const speedychocdelta = "speedychocdelta dialect"
        // const vcash = "vcash dialect"

        try {
            dialects[dialectName].callback(message, ...args)
        } catch (error) {
            console.error(error)
        }
    })
}