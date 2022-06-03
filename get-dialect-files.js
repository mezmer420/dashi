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

module.exports = getFiles