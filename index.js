const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

const TOKEN = require('./config.json')['token'];
const GUILD_ID = require('./config.json')['guildId'];
var guild;

client.once('ready', () => {
    console.log('Bot is ready!');
    guild = client.guilds.cache.get(GUILD_ID);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    const {commandName: command} = interaction;

    if (command === 'dev') {
        await toggleRole(interaction, "Developers")
    }
});

async function toggleRole(interaction, roleName) {
    const role = await guild.roles.cache.find(role => role.name === roleName);
    await interaction.member.roles.add(role, "Self-requested with Foo Bot");
    await interaction.reply(`You have been given the ${roleName} role!`);
}

client.login(TOKEN).then(() => console.log("Login successful!"));