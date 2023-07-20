const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")

module.exports.category = "Fun"

module.exports.data = new SlashCommandBuilder()
	.setName("pokemon")
	.setDescription("View a Pokémon's stats")
	.addStringOption((option) =>
		option
			.setName("pokémon")
			.setDescription("The pokémon to search for")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const pokemon = interaction.options.getString("pokémon")

	async function getPokemon(pokemon) {
		const baseURL = "https://pokeapi.co/api/v2/pokemon/"
		let response = await fetch(`${baseURL}/${pokemon}`)

		return await response.json().catch((err) => {})
	}

	const pokeData = await getPokemon(pokemon)

	if (!pokeData) {
		return await interaction
			.editReply({
				content: `❌ | No result for **${pokemon}**`,
			})
			.catch((err) => {})
	}

	const {
		name,
		id,
		sprites,
		base_experience,
		weight,
		height,
		types,
		stats,
		abilities,
	} = pokeData

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	const embed = new EmbedBuilder()
		.setColor("Random")
		.setTitle(`${capitalizeFirstLetter(name)} #${id}`)
		.setThumbnail(`${sprites.front_default}`)

	let typesArray = []
	types.forEach((type) => typesArray.push(type.type.name))
	const typesInfo = typesArray.join(", ")

	const TypeOrTypes = typesArray.length > 1 ? "Types" : "Type"

	let abilitiesArray = []
	abilities.forEach((ability) => abilitiesArray.push(ability.ability.name))
	const abilitiesInfo = abilitiesArray.join(", ")

	const AbilityOrAbilities =
		abilitiesArray.length > 1 ? "Abilities" : "Ability"

	embed.addFields(
		{ name: "Base Experience", value: `${base_experience}`, inline: true },
		{ name: "Weight", value: `${weight}`, inline: true },
		{ name: "Height", value: `${height}`, inline: true },
		{ name: TypeOrTypes, value: typesInfo },
		{
			name: AbilityOrAbilities,
			value: `${abilitiesInfo}\n——————————\n**Stats**`,
		}
	)

	stats.forEach((stat) =>
		embed.addFields({
			name: capitalizeFirstLetter(stat.stat.name),
			value: `${stat.base_stat}`,
			inline: true,
		})
	)

	await interaction
		.editReply({
			embeds: [embed],
		})
		.catch((err) => {})
}
