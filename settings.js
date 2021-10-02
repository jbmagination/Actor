/* SPDX-License-Identifier: AGPL-3.0 */
/* Copyright (c) 2021 JBMagination */

const Enmap = require('enmap');
module.exports = {
	guildSettings: new Enmap({
		name: 'guildSettings',
		autoFetch: true,
		fetchAll: false,
		cloneLevel: 'deep',
		autoEnsure: {
			disallowedRoles: [],
			watch: true,
			poker: true,
			chess: true,
			fishington: true,
			betrayal: true,
			doodle: true,
			doodledev: true,
			letter: true,
			words: true,
			wordsdev: true,
			artist: true,
			artistdev: true,
			pokerdev: true,
			pokerstaging: true,
			pokerqa: true,
			chessdev: true,
			chessstaging: true,
			chessqa: true,
			checkers: true,
			youtube: true,
			watchdev: true,
			clickdis: true,
			custom: true,
		},
	}),
	userSettings: new Enmap({
		name: 'userSettings',
		autoFetch: true,
		fetchAll: false,
		cloneLevel: 'deep',
		autoEnsure: {
			id: false,
			error: true,
		},
	}),
};