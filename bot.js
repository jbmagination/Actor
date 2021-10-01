const fs = require('fs');
const { Client, Collection, Intents, WebhookClient } = require('discord.js');
const { secrets } = require('./config.json');
const { guildSettings, userSettings } = require('./settings.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS], allowedMentions: { parse: ['users'], repliedUser: true } });
const errorClient = new WebhookClient({ id: secrets.errors.id, token: secrets.errors.token });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('[BOT] Ready!');
});

client.on('guildDelete', guild => {
	guildSettings.delete(guild.id);
});

client.on('interactionCreate', async interaction => {
	if ((interaction.user.bot) || (!interaction.isCommand() || !client.commands.get(interaction.commandName))) return;
	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	}
	catch (error) {
		if ((userSettings.get(interaction.user.id, 'error') == true) && (secrets.errors.enabled == true)) {
			console.error(error);

			// Crafting the command
			const command = [];
			command.push(interaction.commandName);
			if (interaction.options._subcommand) { command.push(interaction.options._subcommand); }
			interaction.options._hoistedOptions.forEach(option => command.push(`${option.name}:${option.value}`));

			// Reporting the error
			errorClient.send({
				content: `\`\`\`Command: /${command.join(' ')}\n\nError:\n${error}\`\`\``,
				username: 'Woopsies, an error occurred!',
			});
		}
		// Letting the user know about the error, regardless (if all else fails, "the interaction failed" still does the trick)
		await interaction.reply({ content: `An error occurred:\n\`\`\`${error}\`\`\`\nNot what you expected? [Let me know](https://github.com/jbmagination/Actor/issues).`, ephemeral: true });
	}
});

client.login(secrets.token);