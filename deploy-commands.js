const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];

const rest = new REST({ version: '9' }).setToken(token);

// Register guild commands

rest.put(Routes.applicationGuildCommands(process.env.APPID, process.env.GUILD), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);