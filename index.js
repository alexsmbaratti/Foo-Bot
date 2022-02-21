const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

const TOKEN = require('./config.json')['token'];
const GUILD_ID = require('./config.json')['guildId'];
var guild;

client.once('ready', () => {
    console.log(`${client.user.username} is ready!\n`);
    console.log('Invite your bot to your server with this link: ');
    console.log(`https://discord.com/api/oauth2/authorize?client_id=${client.application.id}&permissions=8&scope=bot%20applications.commands`);
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
    if (await hasRole(interaction.member, role)) {
        interaction.member.roles.remove(role, "Self-requested with Foo Bot").then(async () => {
            await interaction.reply(`You have removed the ${roleName} role.`);
        }).catch(async () => {
            await interaction.reply('An unexpected error has occurred!');
        });
    } else {
        interaction.member.roles.add(role, "Self-requested with Foo Bot").then(async () => {
            await interaction.reply(`You have been given the ${roleName} role!`);
        }).catch(async () => {
            await interaction.reply('An unexpected error has occurred!');
        });
    }
}

async function hasRole(member, role) {
    return await member.roles.resolve(role.id) !== null;
}

client.login(TOKEN).then(() => console.log("Login successful!"));