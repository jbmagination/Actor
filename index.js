/* SPDX-License-Identifier: AGPL-3.0 */
/* Copyright (c) 2021 JBMagination */

const { ShardingManager } = require('discord.js');
const { secrets } = require('./config.json');
const fs = require('fs');

// Managing config_tmp
if ((fs.existsSync('./config_tmp.json')) && (fs.existsSync('./config.json') == false)) {
	fs.rename('./config_tmp.json', './config.json');
}

// Tracking unhandled rejections (likely 429)
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

// Running the bot shard
const manager = new ShardingManager('./bot.js', { token: secrets.token });
manager.on('shardCreate', shard => console.log(`[SHARD] Launched shard ${shard.id}`));
manager.spawn();