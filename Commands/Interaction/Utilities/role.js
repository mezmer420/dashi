const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports.category = "Utilities"

module.exports.data = new SlashCommandBuilder()
	.setName("role")
	.setDescription("Configure your unique role")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("name")
			.setDescription("Set your unique role's name")
			.addStringOption((option) =>
				option
					.setName("name")
					.setDescription("The name to set your unique role to")
					.setRequired(true)
			)
			.addStringOption((option) =>
				option
					.setName("id")
					.setDescription("ID of role to configure (mezmer420 only!)")
					.setRequired(false)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("color")
			.setDescription("Set your unique role's color")
			.addStringOption((option) =>
				option
					.setName("hex-code")
					.setDescription(
						"The hex code to set your unique role's color to"
					)
					.setRequired(true)
			)
			.addStringOption((option) =>
				option
					.setName("id")
					.setDescription("ID of role to configure (mezmer420 only!)")
					.setRequired(false)
			)
	)

module.exports.run = async ({ client, interaction }) => {
	if (
		interaction.member.id !== "527285622809952256" && // mezmer
		interaction.member.id !== "762133129209053244" && // vcash
		interaction.member.id !== "826841451945787412" && // choc
		interaction.member.id !== "1030771237808517170" && // tree
		interaction.member.id !== "691727350051635262" // speedy
	) {
		return await interaction
			.editReply({
				content: "Only core members have a unique role!",
			})
			.catch((err) => {})
	}

	if (
		interaction.options.getString("ID") &&
		interaction.member.id !== "527285622809952256"
	) {
		return await interaction
			.editReply({
				content: "Only mezmer420 can use this subcommand!",
			})
			.catch((err) => {})
	}

	let roleID

	if (interaction.member.id === "527285622809952256") {
		// mezmer
		roleID = "1113944873574346783"
	} else if (interaction.member.id === "762133129209053244") {
		// vcash
		roleID = "1113945182212206653"
	} else if (interaction.member.id === "826841451945787412") {
		// choc
		roleID = "1113946752769331270"
	} else if (interaction.member.id === "1030771237808517170") {
		// tree
		roleID = "1141429591710376057"
	} else if (interaction.member.id === "691727350051635262") {
		// speedy
		roleID = "1113945400802549791"
	}

	if (interaction.options.getString("id")) {
		roleID = interaction.options.getString("id")
	}

	const role = await interaction.guild.roles.cache.get(roleID)

	if (!role) {
		return await interaction
			.editReply({
				content: `❌ | Couldn't find role with ID **${roleID}**`,
			})
			.catch((err) => {})
	}

	const options = interaction.options.getSubcommand()

	switch (options) {
		case "name": {
			const name = interaction.options.getString("name")

			try {
				await role.edit({ name: name })
				return await interaction
					.editReply(`✅ | Role name is now **${name}**`)
					.catch((err) => {})
			} catch (err) {
				console.log(err)
				return await interaction
					.editReply({ content: "❌ | Error" })
					.catch((err) => {})
			}
		}

		case "color": {
			const color = interaction.options.getString("hex-code")

			try {
				await role.edit({ color: color })
				return await interaction
					.editReply(`✅ | Updated role color`)
					.catch((err) => {})
			} catch (err) {
				console.log(err)
				return await interaction
					.editReply({ content: "❌ | Error" })
					.catch((err) => {})
			}
		}
	}
}
