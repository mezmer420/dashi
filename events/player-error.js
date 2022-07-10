module.exports = {
	name: "error",
	async execute(client, queue, error) {
		console.log(
			`Discord Player—Error emitted from the queue: ${error.message}`
		)
	},
}
