const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js")

module.exports.category = "Government"

module.exports.data = new SlashCommandBuilder()
	.setName("embed")
	.setDescription(
		"Create and have me send an embed (recommended to copy entire thing before sending)"
	)
	.addChannelOption((option) =>
		option
			.setName("channel")
			.setDescription(
				"Channel to send the embed to; default current channel"
			)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("description")
			.setDescription("Description, char lim: 4096")
			.setMaxLength(4096)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("color")
			.setDescription(
				`Strip color—hex code (including the #), a predefined color, "default" for dashi's cyan, or "random"`
			)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("title")
			.setDescription("Title, char lim: 256")
			.setMaxLength(256)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("authorname")
			.setDescription("Name of author, char lim: 256")
			.setMaxLength(256)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("authoriconurl")
			.setDescription(
				'URL for author icon, can be "dashi"; authorname MUST be included'
			)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("authorurl")
			.setDescription(
				"Redirect URL for author; authorname MUST be included"
			)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("thumbnailurl")
			.setDescription("URL for thumbnail")
			.setRequired(false)
	)

	.addStringOption((option) =>
		option
			.setName("field1name-split-field1value")
			.setDescription(
				'Name, value of field 1, char lims: 256, 1024; split with "-split-"'
			)
			.setMaxLength(1287)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field1inline")
			.setDescription(
				"Skip to set inline false; field1name-split-field1value MUST be included"
			)
			.addChoices({ name: "Yes", value: "Yes" })
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field2name-split-field2value")
			.setDescription(
				'Name, value of field 2, char lims: 256, 1024; split with "-split-"'
			)
			.setMaxLength(1287)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field2inline")
			.setDescription(
				"Skip to set inline false; field2name-split-field2value MUST be included"
			)
			.addChoices({ name: "Yes", value: "Yes" })
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field3name-split-field3value")
			.setDescription(
				'Name, value of field 3, char lims: 256, 1024; split with "-split-"'
			)
			.setMaxLength(1287)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field3inline")
			.setDescription(
				"Skip to set inline false; field3name-split-field3value MUST be included"
			)
			.addChoices({ name: "Yes", value: "Yes" })
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field4name-split-field4value")
			.setDescription(
				'Name, value of field 4, char lims: 256, 1024; split with "-split-"'
			)
			.setMaxLength(1287)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field4inline")
			.setDescription(
				"Skip to set inline false; field4name-split-field4value MUST be included"
			)
			.addChoices({ name: "Yes", value: "Yes" })
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field5name-split-field5value")
			.setDescription(
				'Name, value of field 5, char lims: 256, 1024; split with "-split-"'
			)
			.setMaxLength(1287)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field5inline")
			.setDescription(
				"Skip to set inline false; field5name-split-field5value MUST be included"
			)
			.addChoices({ name: "Yes", value: "Yes" })
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field6name-split-field6value")
			.setDescription(
				'Name, value of field 6, char lims: 256, 1024; split with "-split-"'
			)
			.setMaxLength(1287)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("field6inline")
			.setDescription(
				"Skip to set inline false; field6name-split-field6value MUST be included"
			)
			.addChoices({ name: "Yes", value: "Yes" })
			.setRequired(false)
	)

	.addStringOption((option) =>
		option
			.setName("imageurl")
			.setDescription("URL for image")
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("timestamp")
			.setDescription("Skip to not include")
			.addChoices({ name: "Yes", value: "Yes" })
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("footertext")
			.setDescription(
				"Footer text, char lim: 2048; required to use footericonurl"
			)
			.setMaxLength(2048)
			.setRequired(false)
	)
	.addStringOption((option) =>
		option
			.setName("footericonurl")
			.setDescription("URL for footer icon; footertext MUST be included")
			.setRequired(false)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

module.exports.run = async ({ client, interaction, defaultColor }) => {
	const targetChannel =
		interaction.options.getChannel("channel") || interaction.channel
	const colorInput = interaction.options.getString("color")
	const title = interaction.options.getString("title")
	const description = interaction.options.getString("description")
	const authorName = interaction.options.getString("authorname")
	const authorIconURL = interaction.options.getString("authoriconurl")
	const authorURL = interaction.options.getString("authorurl")
	const thumbnailURL = interaction.options.getString("thumbnailurl")

	const field1namefield1value = interaction.options.getString(
		"field1name-split-field1value"
	)
	const field1inline = interaction.options.getString("field1inline")
	const field2namefield2value = interaction.options.getString(
		"field2name-split-field2value"
	)
	const field2inline = interaction.options.getString("field2inline")
	const field3namefield3value = interaction.options.getString(
		"field3name-split-field3value"
	)
	const field3inline = interaction.options.getString("field3inline")
	const field4namefield4value = interaction.options.getString(
		"field4name-split-field4value"
	)
	const field4inline = interaction.options.getString("field4inline")
	const field5namefield5value = interaction.options.getString(
		"field5name-split-field5value"
	)
	const field5inline = interaction.options.getString("field5inline")
	const field6namefield6value = interaction.options.getString(
		"field6name-split-field6value"
	)
	const field6inline = interaction.options.getString("field6inline")
	// const field7namefield7value = interaction.options.getString(
	// 	"field7name-split-field7value"
	// )
	// const field7inline = interaction.options.getString("field7inline")

	const imageURL = interaction.options.getString("imageurl")
	const timestamp = interaction.options.getString("timestamp")
	const footerText = interaction.options.getString("footertext")
	const footerIconURL = interaction.options.getString("footericonurl")

	const embed = new EmbedBuilder()

	if (description) {
		try {
			embed.setDescription(description)
		} catch (err) {
			await interaction
				.editReply({
					content: `Failed to create your embed; make sure you're using the options correctly`,
				})
				.catch((err) => {})

			return console.log(
				`${interaction.member.user.username}'s embed failed: ${err}`
			)
		}
	}

	if (colorInput) {
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		}
		let color = colorInput.toLowerCase()
		color = capitalizeFirstLetter(color)
		if (color === "Default") {
			try {
				embed.setColor(defaultColor)
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		} else {
			try {
				embed.setColor(color)
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		}
	}

	if (title) {
		try {
			embed.setTitle(title)
		} catch (err) {
			await interaction
				.editReply({
					content: `Failed to create your embed; make sure you're using the options correctly`,
				})
				.catch((err) => {})

			return console.log(
				`${interaction.member.user.username}'s embed failed: ${err}`
			)
		}
	}

	if (authorName) {
		if (!authorIconURL && !authorURL) {
			try {
				embed.setAuthor({ name: authorName })
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		} else if (authorIconURL && authorURL) {
			if (authorIconURL.toLowerCase() === "dashi") {
				const dashi = client.user
				try {
					embed.setAuthor({
						name: authorName,
						iconURL: dashi.displayAvatarURL({
							size: 4096,
							dynamic: true,
						}),
						url: authorURL,
					})
				} catch (err) {
					await interaction
						.editReply({
							content: `Failed to create your embed; make sure you're using the options correctly`,
						})
						.catch((err) => {})

					return console.log(
						`${interaction.member.user.username}'s embed failed: ${err}`
					)
				}
			} else if (authorIconURL.toLowerCase() !== "dashi") {
				try {
					embed.setAuthor({
						name: authorName,
						iconURL: authorIconURL,
						url: authorURL,
					})
				} catch (err) {
					await interaction
						.editReply({
							content: `Failed to create your embed; make sure you're using the options correctly`,
						})
						.catch((err) => {})

					return console.log(
						`${interaction.member.user.username}'s embed failed: ${err}`
					)
				}
			}
		} else if (authorIconURL && !authorURL) {
			if (authorIconURL.toLowerCase() === "dashi") {
				const dashi = await client.user
				try {
					embed.setAuthor({
						name: authorName,
						iconURL: dashi.displayAvatarURL(),
					})
				} catch (err) {
					await interaction
						.editReply({
							content: `Failed to create your embed; make sure you're using the options correctly`,
						})
						.catch((err) => {})

					return console.log(
						`${interaction.member.user.username}'s embed failed: ${err}`
					)
				}
			} else if (authorIconURL.toLowerCase() !== "dashi") {
				try {
					embed.setAuthor({
						name: authorName,
						iconURL: authorIconURL,
					})
				} catch (err) {
					await interaction
						.editReply({
							content: `Failed to create your embed; make sure you're using the options correctly`,
						})
						.catch((err) => {})

					return console.log(
						`${interaction.member.user.username}'s embed failed: ${err}`
					)
				}
			}
		} else if (!authorIconURL && authorURL) {
			try {
				embed.setAuthor({ name: authorName, url: authorURL })
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		}
	}

	if (thumbnailURL) {
		try {
			embed.setThumbnail(thumbnailURL)
		} catch (err) {
			await interaction
				.editReply({
					content: `Failed to create your embed; make sure you're using the options correctly`,
				})
				.catch((err) => {})

			return console.log(
				`${interaction.member.user.username}'s embed failed: ${err}`
			)
		}
	}

	if (field1namefield1value) {
		const [field1name, field1value] = field1namefield1value.split("-split-")
		if (field1inline) {
			try {
				embed.addFields({
					name: field1name,
					value: field1value,
					inline: true,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		} else if (!field1inline) {
			try {
				embed.addFields({
					name: field1name,
					value: field1value,
					inline: false,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		}
	}
	if (field2namefield2value) {
		const [field2name, field2value] = field2namefield2value.split("-split-")
		if (field2inline) {
			try {
				embed.addFields({
					name: field2name,
					value: field2value,
					inline: true,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		} else if (!field2inline) {
			try {
				embed.addFields({
					name: field2name,
					value: field2value,
					inline: false,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		}
	}
	if (field3namefield3value) {
		const [field3name, field3value] = field3namefield3value.split("-split-")
		if (field3inline) {
			try {
				embed.addFields({
					name: field3name,
					value: field3value,
					inline: true,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		} else if (!field3inline) {
			try {
				embed.addFields({
					name: field3name,
					value: field3value,
					inline: false,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		}
	}
	if (field4namefield4value) {
		const [field4name, field4value] = field4namefield4value.split("-split-")
		if (field4inline) {
			try {
				embed.addFields({
					name: field4name,
					value: field4value,
					inline: true,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		} else if (!field4inline) {
			try {
				embed.addFields({
					name: field4name,
					value: field4value,
					inline: false,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		}
	}
	if (field5namefield5value) {
		const [field5name, field5value] = field5namefield5value.split("-split-")
		if (field5inline) {
			try {
				embed.addFields({
					name: field5name,
					value: field5value,
					inline: true,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		} else if (!field5inline) {
			try {
				embed.addFields({
					name: field5name,
					value: field5value,
					inline: false,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		}
	}
	if (field6namefield6value) {
		const [field6name, field6value] = field6namefield6value.split("-split-")
		if (field6inline) {
			try {
				embed.addFields({
					name: field6name,
					value: field6value,
					inline: true,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		} else if (!field6inline) {
			try {
				embed.addFields({
					name: field6name,
					value: field6value,
					inline: false,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		}
	}

	if (imageURL) {
		try {
			embed.setImage(imageURL)
		} catch (err) {
			await interaction
				.editReply({
					content: `Failed to create your embed; make sure you're using the options correctly`,
				})
				.catch((err) => {})

			return console.log(
				`${interaction.member.user.username}'s embed failed: ${err}`
			)
		}
	}

	if (timestamp) {
		embed.setTimestamp()
	}

	if (footerText) {
		if (!footerIconURL) {
			try {
				embed.setFooter({
					text: footerText,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		} else if (footerIconURL) {
			try {
				embed.setFooter({
					text: footerText,
					iconURL: footerIconURL,
				})
			} catch (err) {
				await interaction
					.editReply({
						content: `Failed to create your embed; make sure you're using the options correctly`,
					})
					.catch((err) => {})

				return console.log(
					`${interaction.member.user.username}'s embed failed: ${err}`
				)
			}
		}
	}

	if (targetChannel !== interaction.channel) {
		await interaction
			.editReply({
				content: `Sent the embed to <#${targetChannel.id}>`,
			})
			.catch((err) => {})

		return await targetChannel
			.send({
				embeds: [embed],
			})
			.catch((err) => {})
	} else {
		await interaction.deleteReply().catch((err) => {})

		return await targetChannel
			.send({
				embeds: [embed],
			})
			.catch((err) => {})
	}
}
