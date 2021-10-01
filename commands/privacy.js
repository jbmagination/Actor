const { SlashCommandBuilder } = require('@discordjs/builders');
const { userSettings } = require('../settings.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('privacy')
		.setDescription('See and manage how Actor handles data')
		.addSubcommand(subcommand =>
			subcommand
				.setName('policy')
				.setDescription('View Actor\'s privacy policy'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('id')
				.setDescription('Toggle activity ID logging'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('error')
				.setDescription('Toggle automatic error reporting')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'policy') {
			await interaction.reply({ content: '[View Actor\'s privacy policy](<https://github.com/jbmagination/Actor/blob/main/PRIVACY.md>)', ephemeral: true });
			return;
		}

		if (interaction.options.getSubcommand() === 'id') {
			userSettings.set(interaction.user.id, !userSettings.get(interaction.user.id, 'id'), 'id');
			if (userSettings.get(interaction.user.id, 'id') == true) {
				await interaction.reply({ content: 'Activity IDs will now be logged when you use Actor!', ephemeral: true });
			}
			else if (userSettings.get(interaction.user.id, 'id') == false) {
				await interaction.reply({ content: 'Activity IDs will no longer be logged when you use Actor!', ephemeral: true });
			}
		}

		if (interaction.options.getSubcommand() === 'error') {
			userSettings.set(interaction.user.id, !userSettings.get(interaction.user.id, 'error'), 'error');
			if (userSettings.get(interaction.user.id, 'error') == true) {
				await interaction.reply({ content: 'Errors that come from your commands will now be automatically logged when you use Actor!', ephemeral: true });
			}
			else if (userSettings.get(interaction.user.id, 'error') == false) {
				await interaction.reply({ content: 'Errors that come from your commands will no longer be automatically logged when you use Actor!', ephemeral: true });
			}
		}
	},
};