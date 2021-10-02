/* SPDX-License-Identifier: MIT */
/* Original, copyright (c) 2017 - 2021 Sanctuary */
/* Modified, copyright (c) 2021 JBMagination */

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { secrets } = require('./config.json');

const commands = [];
for (const file of fs.readdirSync('./commands').filter(commandFile => commandFile.endsWith('.js'))) {
	commands.push(require(`./commands/${file}`).data.toJSON());
}

new REST({ version: '9' }).setToken(secrets.token).put(Routes.applicationCommands(secrets.client), { body: commands });