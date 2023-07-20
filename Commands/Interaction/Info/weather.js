const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")
const { openWeatherMapAPIKey } = require("../../../config.json")

module.exports.category = "Info"

module.exports.data = new SlashCommandBuilder()
	.setName("weather")
	.setDescription("Get weather information")
	.addStringOption((option) =>
		option
			.setName("location")
			.setDescription("The location to get weather information for")
			.setRequired(true)
	)

module.exports.run = async ({ client, interaction }) => {
	const location = interaction.options.getString("location")

	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
		location
	)}&appid=${openWeatherMapAPIKey}&units=imperial`

	try {
		const response = await fetch(URL)
		const data = await response.json()

		if (response.status !== 200) {
			return await interaction
				.editReply({
					content: "❌ | Error: Location not found/Bad response",
				})
				.catch((err) => {})
		}

		const embed = new EmbedBuilder()
			.setColor("#0099ff")
			.setTitle(`Weather in ${data.name}`)
			.setDescription(`Current weather: ${data.weather[0].description}`)
			.addFields(
				{
					name: "Temperature",
					value: `${data.main.temp}°F`,
					inline: true,
				},
				{
					name: "Feels like",
					value: `${data.main.feels_like}°F`,
					inline: true,
				},
				{
					name: "Min Temperature",
					value: `${data.main.temp_min}°F`,
					inline: true,
				},
				{
					name: "Max Temperature",
					value: `${data.main.temp_max}°F`,
					inline: true,
				},
				{
					name: "Pressure",
					value: `${data.main.pressure} hPa`,
					inline: true,
				},
				{
					name: "Humidity",
					value: `${data.main.humidity}%`,
					inline: true,
				},
				{
					name: "Visibility",
					value: `${data.visibility} m`,
					inline: true,
				},
				{
					name: "Wind direction at speed",
					value: `${data.wind.deg} at ${data.wind.speed} mph`,
					inline: true,
				}
			)
			.setFooter({ text: "OpenWeatherMap" })

		await interaction.editReply({ embeds: [embed] }).catch((err) => {})
	} catch (error) {
		console.error(error)
		interaction
			.editReply({
				content: "❌ | An error occurred",
			})
			.catch((err) => {})
	}
}
