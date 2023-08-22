const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const path = require("path")
const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
const { token } = process.env

module.exports.category = "mezmer420"

module.exports.data = new SlashCommandBuilder()
	.setName("reload")
	.setDescription("Reload application commands")
	.addStringOption((option) =>
		option
			.setName("command")
			.setDescription(
				"The application command to reload; skip to reload all"
			)
			.setRequired(false)
	)
	.addBooleanOption((option) =>
		option
			.setName("redeploy")
			.setDescription(
				"Redeploy application commands? (only if reloading all)"
			)
			.setRequired(false)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports.run = async ({ client, interaction }) => {
	const commandName = interaction.options.getString("command")

	if (commandName) {
		const command = await client.commands.get(commandName)

		if (!command) {
			return await interaction
				.editReply({
					content: `There is no command with name \`${commandName}\``,
				})
				.catch((err) => {})
		}

		const commandBaseDir = path.join(__dirname, "..")

		const commandPath = path.join(
			commandBaseDir,
			command.category,
			`${command.data.name}.js`
		)

		delete require.cache[require.resolve(commandPath)]

		const newCommand = require(commandPath)

		if (!newCommand.data || !newCommand.run) {
			return await interaction
				.editReply({
					content: `❌ | The command at ${commandPath} is missing required category/data/run property(ies); command not reloaded.`,
				})
				.catch((err) => {})
		}

		try {
			await client.commands.delete(command.data.name)
			await client.commands.set(newCommand.data.name, newCommand)
			await interaction
				.editReply({
					content: `✅ | Command \`${newCommand.data.name}\` was reloaded!`,
				})
				.catch((err) => {})
		} catch (error) {
			console.error(error)
			await interaction
				.editReply({
					content: `❌ | There was an error while reloading the command \`${command.data.name}\`:\n\`${error.message}\``,
				})
				.catch((err) => {})
		}
	} else {
		let commands = []

		handleCommands = async (commandFolders, foldersPath) => {
			for (const folder of commandFolders) {
				const commandsPath = path.join(foldersPath, folder)
				const commandFiles = fs
					.readdirSync(commandsPath)
					.filter((file) => file.endsWith(".js"))

				for (const file of commandFiles) {
					const commandPath = path.join(commandsPath, file)

					delete require.cache[require.resolve(commandPath)]

					const command = require(commandPath)

					if (command.category && command.data && command.run) {
						// console.log(newCommand)

						await client.commands.delete(command.data.name)
						client.commands.set(command.data.name, command)
						commands.push(command.data.toJSON())
					} else {
						await interaction.channel
							.send({
								content: `⚠ | The command at ${commandPath} is missing required category/data/run property(ies); command not reloaded.`,
							})
							.catch((err) => {})
					}
				}
			}
		}

		const foldersPath = path.join(__dirname, "..")
		const commandFolders = fs.readdirSync(foldersPath)

		try {
			await handleCommands(commandFolders, foldersPath)
		} catch (error) {
			console.error(error)
			return await interaction
				.editReply({
					content: `❌ | There was an error while reloading the commands:\n\`${error.message}\``,
				})
				.catch((err) => {})
		}

		// console.log(client.commands)

		const redeploy = interaction.options.getBoolean("redeploy")

		if (redeploy === true) {
			try {
				const rest = new REST({ version: "10" }).setToken(token)
				const clientId = "956345939130482750"
				const guildId = "939674946379083847"

				await rest.put(Routes.applicationCommands(clientId), {
					body: commands,
				})

				// await rest.put(
				// 	Routes.applicationGuildCommands(clientId, guildId),
				// 	{ body: commands }
				// )

				return await interaction
					.editReply({
						content: `✅ | ${commands.length} commands reloaded and redeployed!`,
					})
					.catch((err) => {})
			} catch (error) {
				console.error(error)
				await interaction.channel
					.send({
						content: `⚠ | There was an error redeploying the commands:\n\`${error.message}\``,
					})
					.catch((err) => {})
			}
		}

		await interaction
			.editReply({
				content: "✅ | Commands reloaded!",
			})
			.catch((err) => {})
	}
}
