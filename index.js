const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});
const schedule = require('node-schedule');

const TOKEN = require('./config.json')['bot']['token'];

client.once('ready', () => {
    console.log(`${client.user.username} is ready!\n`);
    console.log('Invite your bot to your server with this link: ');
    console.log(`https://discord.com/api/oauth2/authorize?client_id=${client.application.id}&permissions=8&scope=bot%20applications.commands\n`);
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

/**
 * Handle interactions (slash commands)
 */
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'An unexpected error has occurred!', ephemeral: true});
    }
});

/**
 * Upon a new user joining the server, assign them a role based upon whether they are a bot or human.
 */
client.on('guildMemberAdd', async member => {
    try {
        if (member.user.bot) {
            console.log('A bot has joined the server.');
            await member.roles.add(await member.guild.roles.cache.find(role => role.name === "Bots"), 'Auto-assigned with Foo Bot upon join');
        } else {
            console.log('A human has joined the server.');
            await member.roles.add(await member.guild.roles.cache.find(role => role.name === "Humans"), 'Auto-assigned with Foo Bot upon join');
        }
    } catch (error) {
        console.error(error);
    }
});

/**
 * Post an embed and thread for Wordle responses every day at midnight local time
 */
if (require('./config.json')['wordle']) {
    console.log('Wordle configuration enabled.');
    schedule.scheduleJob('0 0 * * *', function () {
        console.log('This should run once a day at midnight local time.');
        const channel = client.guilds.cache.get(require('./config.json')['guild']['id']).channels.cache.find(channel => channel.name == require('./config.json')['wordle']['channel']);
    });
}

client.login(TOKEN).then(() => console.log('Login successful!'));