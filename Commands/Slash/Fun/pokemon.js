const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")

module.exports.data = new SlashCommandBuilder()
	.setName("pokemon")
	.setDescription("View a Pokémon's stats")
	.addStringOption((option) =>
		option
			.setName("pokémon")
			.setDescription("The pokémon to search for")
			.setRequired(true)
	)

module.exports.category = "Fun"

module.exports.run = async ({ client, interaction }) => {
	const pokemon = interaction.options.getString("pokémon")

	async function getPokemon(pokemon) {
		const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
		let response = await fetch(`${BASE_URL}/${pokemon}`)

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

	const Embed = new EmbedBuilder()
		.setColor("Random")
		.setTitle(`${capitalizeFirstLetter(name)} #${id}`)
		.setThumbnail(`${sprites.front_default}`)

	let typesArray = []
	types.forEach((type) => typesArray.push(type.type.name))
	const typesinfo = typesArray.join(", ")

	let TypeorTypes = "Type"
	if (typesArray.length > 1) {
		TypeorTypes = "Types"
	}

	let abilitiesArray = []
	abilities.forEach((ability) => abilitiesArray.push(ability.ability.name))
	const abilitiesinfo = abilitiesArray.join(", ")

	let AbilityorAbilities = "Ability"
	if (AbilityorAbilities.length > 1) {
		AbilityorAbilities = "Abilities"
	}

	Embed.addFields(
		{ name: "Base Experience", value: `${base_experience}`, inline: true },
		{ name: "Weight", value: `${weight}`, inline: true },
		{ name: "Height", value: `${height}`, inline: true },
		{ name: TypeorTypes, value: typesinfo },
		{
			name: AbilityorAbilities,
			value: `${abilitiesinfo}\n——————————\n**Stats**`,
		}
	)

	stats.forEach((stat) =>
		Embed.addFields({
			name: capitalizeFirstLetter(stat.stat.name),
			value: `${stat.base_stat}`,
			inline: true,
		})
	)

	await interaction
		.editReply({
			embeds: [Embed],
		})
		.catch((err) => {})
}
