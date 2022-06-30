const {SlashCommandBuilder} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

module.exports.data = new SlashCommandBuilder()
.setName("pokemon")
.setDescription("View a Pokémon's stats")
.addStringOption(option => option
    .setName("pokémon")
    .setDescription("The pokémon to search for")
    .setRequired(true)
)

module.exports.run = async ({client, interaction}) => {
    const pokemon = interaction.options.getString("pokémon")

    async function getPokemon(pokemon) {
        const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
        let response = await fetch(`${BASE_URL}/${pokemon}`)

        return await response.json()
        .catch((err) => {
            return
        })
    }

    const pokeData = await getPokemon(pokemon)

    if(!pokeData){
        return await interaction.editReply({
            content: "No result found"
        })
        .catch((err) => {
            return
        })
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
        abilities
    } = pokeData

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${capitalizeFirstLetter(name)} #${id}`)
    .setThumbnail(`${sprites.front_default}`)

    let typesArray = []
    types.forEach(type => typesArray.push(type.type.name))
    const typesinfo = typesArray.join(", ")
    let TypeorTypes = "Type"
    if(typesArray.length > 1){
        TypeorTypes = "Types"
    }

    let abilitiesArray = []
    abilities.forEach(ability => abilitiesArray.push(ability.ability.name))
    const abilitiesinfo = abilitiesArray.join(", ")
    let AbilityorAbilities = "Ability"
    if(AbilityorAbilities.length > 1){
        AbilityorAbilities = "Abilities"
    }

    embed
    .addField("Base Experience", `${base_experience}`, true)
    .addField("Weight", `${weight}`, true)
    .addField("Height", `${height}`, true)
    .addField(TypeorTypes, typesinfo)
    .addField(AbilityorAbilities, `${abilitiesinfo}\n——————————\n**Stats**`)

    stats.forEach(stat => embed.addField(capitalizeFirstLetter(stat.stat.name), `${stat.base_stat}`, true))

    await interaction.editReply({
        embeds: [embed]
    })
    .catch((err) => {
        return
    })
}