

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const { dev } = require('../config.json')
const { key } = require('./token')

const commands = [];
const commandFiles = fs.readdirSync('./Bot/Commands').filter(file => file.endsWith('.js'));

const clientId = '913159846369574982';
const guildId = '913473586113695744'; // devmode

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(key());

const register = async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		
		if (dev) {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands }
			);
		} else {
			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands }
			);
		}
		

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	Deploy: register
}