const fs = require('fs');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

const BOT_ID = require('./config.json')['bot']['id'];
const TOKEN = require('./config.json')['bot']['token'];
const GUILD_ID = require('./config.json')['guild']['id'];

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    console.log(`Found command ${file}`);
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

console.log('\nCommands to be registered:');
console.log(commands);
console.log();

const rest = new REST({version: '9'}).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(BOT_ID, GUILD_ID), {body: commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);