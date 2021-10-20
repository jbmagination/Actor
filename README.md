# Actor
[Add the bot to your server now](https://discord.com/api/oauth2/authorize?client_id=891437279858540554&permissions=1&scope=bot%20applications.commands&response=code), or [join the server](https://top.gg/servers/887291094885339147)!

## What is Actor?
Actor is the best activities bot you'll ever use.

It supports more Discord activities than any other bot:
- *Actor*: **At least 14 Discord activities**, 24 at most
- *[Activities](https://github.com/advaith1/activities)*: 8 Discord activities
- *[Discord Games Lab](https://discord.gg/discordgameslab)*: 8 Discord activities
- *[Youtube Together](https://top.gg/bot/831408659262472222)*: At least 5 Discord activities, 7 at most
- *[Philbert](https://philbert.fish)*: 5 Discord activities
- *[Voice Activities](https://arealwant.github.io/VoiceActivities/)*: 5 Discord activities

And even if the bot doesn't update, *it doesn't have to*. Actor comes with custom activity support, so if you know an activity ID, you can use it.

Actor also comes with permissions. Don't want a specific role using it, or you want to prevent your server from using an activity? Use `/settings`. *Requires you to be the owner of the server, or have the Manage Server permission. If you can run `/settings`, you can use every activity anyway.*

## Self-hosting
You definitely won't need this guide if you're an average user. But *especially*:
- If you don't know what self-hosting is
- You don't have basic knowledge of Node.js and npm
- You don't know how to navigate Discord's developer portal
- You don't know how to use the terminal

But if you're looking to self-host, here you go.
```
npm install discord.js @discordjs/builders @discordjs/rest discord-api-types enmap bufferutil discord/erlpack utf-8-validate zlib-sync
npm install eslint prettier --save-dev
```

Open up `config_tmp.json`. Don't worry about renaming it, the bot does that for you. 

Put your bot token in `token` and the ID of your application in `client`. 

The `feedback` and `errors` options use webhooks. If you want to enable them, `id` and `token` for each are taken from the webhook URL: `https://discord.com/api/webhooks/{id}/{token}`-- but they're set to `false` to help make bot hosting easier.

With `errors` disabled, errors will not be logged to the console, and with `feedback` disabled, `/feedback` will not work. The former is to protect privacy, as `errors` is tied to automatic error reporting.

```
node commands
node start
```

## License
`commands.js` is licensed under MIT, while the rest of the code is licensed under AGPL-3.0.

SPDX-License-Identifier: `MIT AND AGPL-3.0-only`

### AGPL-3.0 Notice
Copyright (C) 2021 JBMagination

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

## Thank you
- **[Roux](https://github.com/sudocode1)**
- [Oxide Hosting](https://oxide.host)
- [Rauf](https://github.com/ItsRauf)
- [derpystuff](https://gitlab.com/derpystuff)
- [Discord Games Lab](https://discord.gg/discordgameslab)
- [advaith](https://github.com/advaith1)
- [Evie](https://github.com/eslachance)
- [CommandLineFox](https://github.com/CommandLineFox)
- [discord.js](https://github.com/discordjs/discord.js)
- [Rythm Community](https://discord.gg/rythm)
