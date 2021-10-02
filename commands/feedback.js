/* SPDX-License-Identifier: AGPL-3.0 */
/* Copyright (c) 2021 JBMagination */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { WebhookClient } = require('discord.js');
const { secrets } = require('../config.json');
const webhookClient = new WebhookClient({ id: secrets.feedback.id, token: secrets.feedback.token });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('feedback')
		.setDescription('Provide unfiltered feedback about Actor to me (I\'m gonna regret this)')
		.addStringOption(option =>
			option.setName('feedback')
				.setDescription('Provide unfiltered feedback about Actor to me (I\'m gonna regret this)')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('anonymous')
				.setDescription('Choose whether or not to identify yourself, no by default')
				.setRequired(false)),
	async execute(interaction) {
		if (secrets.feedback.enabled == false) {
			await interaction.reply({ content: 'Feedback has been disabled for this instance of Actor', ephemeral: true });
			return;
		}

		let sender;
		if (interaction.options.get('anonymous') && interaction.options.get('anonymous').value == false) {
			sender = `${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id})`;
		}
		else {
			sender = 'Anonymous';
		}

		webhookClient.send({
			content: `From *${sender}*: ${interaction.options.getString('feedback')}`,
			username: 'Feedback',
		});
		await interaction.reply({ content: `Feedback sent! You are identified as *${sender}*.`, ephemeral: true });
	},
};

