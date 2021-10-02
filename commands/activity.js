/* SPDX-License-Identifier: AGPL-3.0 */
/* Copyright (c) 2021 JBMagination */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { guildSettings, userSettings } = require('../settings.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('activity')
		.setDescription('Start an activity')
		.addSubcommand(subcommand =>
			subcommand
				.setName('common')
				.setDescription('Start a common Discord activity')
				.addStringOption(option =>
					option.setName('activity')
						.setDescription('Choose the activity')
						.setRequired(true)
						.addChoice('Poker Night', 'poker')
						.addChoice('Chess in the Park', 'chess')
						.addChoice('Watch Together', 'watch')
						.addChoice('Fishington.io', 'fishington')
						.addChoice('Betrayal.io', 'betrayal')
						.addChoice('Doodle Crew', 'doodle')
						.addChoice('Letter Tile', 'letter')
						.addChoice('Word Snacks', 'words')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('extra')
				.setDescription('Start a less well-known Discord activity (some may not work)')
				.addStringOption(option =>
					option.setName('activity')
						.setDescription('Choose the activity')
						.setRequired(true)
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
						.addChoice('Sketchy Artist', 'artist')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('custom')
				.setDescription('Start a Discord activity by ID')
				.addStringOption(option =>
					option.setName('id')
						.setDescription('Enter the ID of the activity')
						.setRequired(true))),
	async execute(interaction) {
		// Detect DMs
		if (!interaction.guild) {
			await interaction.reply({ content: 'Sorry, but this command only works in servers!', ephemeral: true });
			return;
		}

		// Identify voice channel
		if (!interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id).voice.channel || interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id).voice.channel.type == 'GUILD_STAGE_VOICE') {
			await interaction.reply({ content: 'You\'re not in a voice channel!', ephemeral: true });
			return;
		}

		// Permissions
		if (!((interaction.user.id == interaction.guild.ownerId) || interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))) {
			if (guildSettings.get(interaction.guild.id, interaction.options.getString('activity') == false) || interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id)._roles.some(v => guildSettings.get(interaction.guild.id, 'disallowedRoles').includes(v))) {
				await interaction.reply({ content: 'You don\'t have permission to use this command in this way!', ephemeral: true });
				return;
			}
		}

		// Get ID of activity
		let activityID;
		if (interaction.options.getString('activity')) {
			// Common activities
			if (interaction.options.getString('activity') == 'watch') { activityID = '880218394199220334'; }
			if (interaction.options.getString('activity') == 'poker') { activityID = '755827207812677713'; }
			if (interaction.options.getString('activity') == 'chess') { activityID = '832012774040141894'; }
			if (interaction.options.getString('activity') == 'fishington') { activityID = '814288819477020702'; }
			if (interaction.options.getString('activity') == 'betrayal') { activityID = '773336526917861400'; }

			// Extra activities
			if (interaction.options.getString('activity') == 'doodle') { activityID = '878067389634314250'; }
			if (interaction.options.getString('activity') == 'doodledev') { activityID = '878067427668275241'; }
			if (interaction.options.getString('activity') == 'letter') { activityID = '879863686565621790'; }
			if (interaction.options.getString('activity') == 'words') { activityID = '879863976006127627'; }
			if (interaction.options.getString('activity') == 'wordsdev') { activityID = '879864010126786570'; }
			if (interaction.options.getString('activity') == 'artist') { activityID = '879864070101172255'; }
			if (interaction.options.getString('activity') == 'artistdev') { activityID = '879864104980979792'; }
			if (interaction.options.getString('activity') == 'pokerdev') { activityID = '763133495793942528'; }
			if (interaction.options.getString('activity') == 'pokerstaging') { activityID = '763116274876022855'; }
			if (interaction.options.getString('activity') == 'pokerqa') { activityID = '801133024841957428'; }
			if (interaction.options.getString('activity') == 'checkers') { activityID = '832012682520428625'; }
			if (interaction.options.getString('activity') == 'youtube') { activityID = '755600276941176913'; }
			if (interaction.options.getString('activity') == 'watchdev') { activityID = '880218832743055411'; }
			if (interaction.options.getString('activity') == 'chessdev') { activityID = '832012586023256104'; }
			if (interaction.options.getString('activity') == 'chessstaging') { activityID = '832012730599735326'; }
			if (interaction.options.getString('activity') == 'chessqa') { activityID = '832012815819604009'; }
			if (interaction.options.getString('activity') == 'clickdis') { activityID = '832012854282158180'; }
			if (interaction.options.getString('activity') == 'decodersdev') { activityID = '891001866073296967'; }
		}
		else if (interaction.options.getString('id')) {
			// Permissions
			if (!((interaction.user.id == interaction.guild.ownerId) || interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))) {
				if (guildSettings.get(interaction.guild.id, 'custom') == false) {
					await interaction.reply({ content: 'You don\'t have permission to use this command in this way!', ephemeral: true });
					return;
				}
			}

			// Get ID for activity
			activityID = interaction.options.getString('id');
		}

		// Track ID of activity to help slowly bring more used activities into /activity common
		if (userSettings.get(interaction.user.id, 'id') == true) {
			console.log('ID: ' + activityID);
		}
		if (!activityID) {
			await interaction.reply({ content: 'No activity ID could be found or was entered. Try again!', ephemeral: true });
			return;
		}

		// Create invite for activity
		const invite = await interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id).voice.channel.createInvite({
			maxAge: 0,
			maxUses: 1,
			targetType: 2,
			targetApplication: activityID,
		});
		if (invite) { await interaction.reply({ content: '[Here\'s your activity](https://discord.gg/' + invite + ') :tada:\n\nIf that\'s not working, try https://discord.gg/' + invite, ephemeral: true }); }
	},
};