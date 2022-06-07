const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});
const utils = require('./utils');
const config = require('./config.json');

if (utils.validateConfigurationSchema(config)) {
    console.log('Configuration schema validated.');
} else {
    console.log('Invalid configuration schema.');
    process.exit(9);
}

const TOKEN = config['bot']['token'];
const PHOTOGRAPHY_CHANNEL = config['guild']['photography'];

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
 * Upon a new message created, triage and respond to it if applicable.
 */
client.on('messageCreate', message => {
    try {
        if (PHOTOGRAPHY_CHANNEL !== undefined && message.channel.name === PHOTOGRAPHY_CHANNEL) { // Photography is enabled and a message was sent to the channel
            if (message.attachments.size > 0) {
                let firstAttachment = message.attachments.first(); // TODO: Properly iterate for all attachments
                if (utils.isImageAttachment(firstAttachment)) {
                    console.log("Message with image attachment received in photography channel.");
                    console.log(message.attachments);
                    /*
                    Extract the metadata, start a thread, and send the metadata in that thread
                     */
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
});

client.login(TOKEN).then(() => console.log('Login successful!'));