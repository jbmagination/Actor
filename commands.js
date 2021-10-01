const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { secrets } = require('./config.json');

const commands = [];
const commandFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFile) {
	commands.push(require(`./commands/${file}`).data.toJSON());
}

(async () => {
	try {
		await new REST({ version: '9' }).setToken(secrets.token).put(
			Routes.applicationCommands(secrets.client),
			{ body: commands },
		);
	}
	catch (error) { console.error(error); }
})();