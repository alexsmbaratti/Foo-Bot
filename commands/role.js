const {SlashCommandBuilder} = require('@discordjs/builders');

/**
 * Add a role with the given name to the GuildMember that initiated the given interaction if they do not have that role
 * already. Otherwise, remove that role.
 * @param interaction The interaction
 * @param roleName The name of the role to add or remove
 */
async function toggleRole(interaction, roleName) {
    try {
        const role = await interaction.guild.roles.cache.find(role => role.name === roleName);
        if (await hasRole(interaction.member, role)) {
            await interaction.member.roles.remove(role, 'Self-requested with Foo Bot');
            await interaction.reply(`You have removed the ${roleName} role.`);
        } else {
            await interaction.member.roles.add(role, 'Self-requested with Foo Bot');
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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Adds or removes the specified role')
        .addStringOption(option =>
            option.setName('role')
                .setDescription('The role')
                .setRequired(true)
                .addChoice('Developers', 'Developers')
                .addChoice('Animal Crossing', 'Animal Crossing')
                .addChoice('Mario Kart', 'Mario Kart')
                .addChoice('Super Smash Bros.', 'Super Smash Bros.')
        ),
    async execute(interaction) {
        const role = interaction.options.getString('role');
        await toggleRole(interaction, role);
    },
};