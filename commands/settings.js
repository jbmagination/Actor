/* SPDX-License-Identifier: AGPL-3.0 */
/* Copyright (c) 2021 JBMagination */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { guildSettings } = require('../settings.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Change how Actor works in your server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('roles')
				.setDescription('Toggle whether or not a certain role can use Actor')
				.addRoleOption(option =>
					option.setName('role')
						.setDescription('Choose the role to toggle')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('activity')
				.setDescription('Toggle whether or not a certain activity can be used with Actor')
				.addStringOption(option =>
					option.setName('activity')
						.setDescription('Choose the activity to toggle')
						.setRequired(true)
						.addChoice('Poker Night', 'poker')
						.addChoice('Chess in the Park', 'chess')
						.addChoice('Watch Together', 'watch')
						.addChoice('Fishington.io', 'fishington')
						.addChoice('Betrayal.io', 'betrayal')
						.addChoice('Doodle Crew', 'doodle')
						.addChoice('Letter Tile', 'letter')
						.addChoice('Word Snacks', 'words')
						.addChoice('SpellCast', 'spellcast')
						.addChoice('Poker Night (Dev)', 'pokerdev')
						.addChoice('Poker Night (Staging)', 'pokerstaging')
						.addChoice('Poker Night (QA)', 'pokerqa')
						.addChoice('Chess in the Park (Dev)', 'chessdev')
						.addChoice('Chess in the Park (Staging)', 'chessstaging')
						.addChoice('Chess in the Park (QA)', 'chessqa')
						.addChoice('Checkers in the Park', 'checkers')
						.addChoice('YouTube Together', 'youtube')
						.addChoice('Watch Together (Dev)', 'watchdev')
						.addChoice('Doodle Crew (Dev)', 'doodledev')
						.addChoice('Word Snacks (Dev)', 'wordsdev')
						.addChoice('Sketchy Artist (Dev)', 'artistdev')
						.addChoice('Decoders (Dev)', 'decodersdev')
						.addChoice('Click Dis', 'clickdis')
						.addChoice('Sketchy Artist', 'artist')
						.addChoice('Custom activities', 'custom')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('reset')
				.setDescription('Reset settings back to defaults')),
	async execute(interaction) {
		// Detect DMs
		if (!interaction.guild) {
			await interaction.reply({ content: 'Sorry, but this command only works in servers!', ephemeral: true });
			return;
		}

		// Permissions
		if (!((interaction.user.id == interaction.guild.ownerId) || interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))) {
			await interaction.reply({ content: 'You don\'t have permission to use this command in this way!', ephemeral: true });
			return;
		}

		// Activity toggles
		if (interaction.options.getString('activity')) {
			guildSettings.set(interaction.guild.id, !guildSettings.get(interaction.guildId, interaction.options.getString('activity')), interaction.options.getString('activity'));
			if (guildSettings.get(interaction.guildId, interaction.options.getString('activity')) == true) {
				await interaction.reply({ content: 'The activity has been enabled!' });
			}
			else if (guildSettings.get(interaction.guildId, interaction.options.getString('activity')) == false) {
				await interaction.reply({ content: 'The activity has been disabled! **Please note that anyone who can run `/settings` will be able to start the activity anyways. Activities that have already started will continue.**' });
			}
			return;
		}

		// Role toggles
		if (interaction.options.get('role')) {
			if (guildSettings.get(interaction.guild.id, 'disallowedRoles').includes(interaction.options.get('role').value)) {
				await interaction.reply({ content: 'The role **' + interaction.options.get('role').role.name + '** can now start activities in this server.' });
				guildSettings.remove(interaction.guild.id, interaction.options.get('role').value, 'disallowedRoles');
			}
			else {
				await interaction.reply({ content: 'The role **' + interaction.options.get('role').role.name + '** can no longer start any activities in this server. **Please note that anyone who can run `/settings` will be able to start activities anyways.**' });
				guildSettings.push(interaction.guild.id, interaction.options.get('role').value, 'disallowedRoles');
				return;
			}
		}

		// Settings reset (bless/screw Enmap)
		if (interaction.options.getSubcommand() === 'reset') {
			guildSettings.delete(interaction.guild.id);
			guildSettings.ensure(interaction.guild.id);
			await interaction.reply({ content: 'The settings *should* be set back to defaults. **This includes your roles.**', ephemeral: true });
		}
	},
};
