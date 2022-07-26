const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports.data = new SlashCommandBuilder()
	.setName("removeinfraction")
	.setDescription("Remove a member's infraction")
	.addIntegerOption((option) =>
		option
			.setName("infractionid")
			.setDescription("Infraction ID")
			.setRequired(true)
	)

module.exports.run = async ({
	client,
	interaction,
	Infraction,
	defaultColor,
}) => {
	const infractionId = interaction.options.getInteger("infractionid")

	const getInfraction = await Infraction.findOne({
		where: { infractionid: infractionId },
	})

	if (!getInfraction) {
		return await interaction
			.editReply({
				content: `Couldn't find an infraction on record with ID **${infractionId}**`,
			})
			.catch((err) => {})
	}

	if (
		interaction.member.id === "826841451945787412" &&
		getInfraction.memberid === "826841451945787412"
	) {
		return interaction
			.editReply({
				content: "nice try choc :)",
			})
			.catch((err) => {})
	}

	await Infraction.destroy({ where: { infractionid: infractionId } })

	const member = await client.users.fetch(`${getInfraction.memberid}`)

	const Embed = new EmbedBuilder()
		.setColor(defaultColor)
		.setAuthor({
			name: `${member.tag}'s infraction *${getInfraction.nature}* has been removed`,
			iconURL: `${member.displayAvatarURL({
				size: 4096,
				dynamic: true,
			})}`,
		})
		.setDescription(`Removed By: <@${interaction.member.id}>`)
		.setTimestamp()

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})

	const logs = await client.channels.cache.get("955948174894325782")

	logs.send({
		embeds: [Embed],
	}).catch((err) => {
		console.log(err)
	})
}
