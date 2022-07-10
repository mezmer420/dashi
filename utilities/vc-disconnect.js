module.exports = async ({ client }) => {
    client.player.on("botDisconnect", (queue) => {
        console.log("disconnected from voice channel")

        queue.destroy().then(console.log("cleared queue"))
    })
}
