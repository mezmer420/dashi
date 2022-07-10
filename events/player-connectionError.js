module.exports = {
	name: "connectionError",
	async execute(client, queue, error) {
		console.log(
			`Discord Player—Error emitted from the connection: ${error.message}`
		)
	},
}
