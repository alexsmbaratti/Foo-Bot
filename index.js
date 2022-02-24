const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});

const TOKEN = require('./config.json')['token'];
const GUILD_ID = require('./config.json')['guild']['id'];
var guild;

client.once('ready', () => {
    console.log(`${client.user.username} is ready!\n`);
    console.log('Invite your bot to your server with this link: ');
    console.log(`https://discord.com/api/oauth2/authorize?client_id=${client.application.id}&permissions=8&scope=bot%20applications.commands\n`);
    guild = client.guilds.cache.get(GUILD_ID);
});

/**
 * Handle interactions (slash commands)
 */
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    const {commandName: command} = interaction;

    if (command === 'role') {
        const role = interaction.options.getString('role');
        await toggleRole(interaction, role);
    }
});

/**
 * Upon a new user joining the server, assign them a role based upon whether they are a bot or human.
 */
client.on('guildMemberAdd', async member => {
    try {
        if (member.user.bot) {
            console.log("A bot has joined the server.");
            await member.roles.add(await guild.roles.cache.find(role => role.name === "Bots"), "Auto-assigned with Foo Bot upon join");
        } else {
            console.log("A human has joined the server.");
            await member.roles.add(await guild.roles.cache.find(role => role.name === "Humans"), "Auto-assigned with Foo Bot upon join");
        }
    } catch (error) {
        console.error(error);
    }
});

/**
 * Add a role with the given name to the GuildMember that initiated the given interaction if they do not have that role
 * already. Otherwise, remove that role.
 * @param interaction The interaction
 * @param roleName The name of the role to add or remove
 */
async function toggleRole(interaction, roleName) {
    try {
        const role = await guild.roles.cache.find(role => role.name === roleName);
        if (await hasRole(interaction.member, role)) {
            await interaction.member.roles.remove(role, "Self-requested with Foo Bot");
            await interaction.reply(`You have removed the ${roleName} role.`);
        } else {
            await interaction.member.roles.add(role, "Self-requested with Foo Bot");
            await interaction.reply(`You have been given the ${roleName} role!`);
        }
    } catch (error) {
        console.error(error);
        await interaction.reply('An unexpected error has occurred!');
    }
}

/**
 * Determine if a GuildMember has a particular role.
 * @param member The GuildMember to check the roles of
 * @param role The Role to look for
 * @returns {Promise<boolean>} True if member has this role, otherwise false.
 */
async function hasRole(member, role) {
    return await member.roles.resolve(role.id) !== null;
}

client.login(TOKEN).then(() => console.log("Login successful!"));