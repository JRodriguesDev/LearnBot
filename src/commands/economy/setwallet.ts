import {SlashCommandBuilder, PermissionFlagsBits, InteractionContextType} from 'discord.js'

import {Command} from '#interfaces'

export const command: Command = {
    cooldown: 5,
    data: new SlashCommandBuilder()
                .setName('set_wallet')
                .setDescription('Definir Carteira')
                .addStringOption((option) => option.setName('user').setDescription('Selecione o usuario').setAutocomplete(true))
                .setContexts(InteractionContextType.Guild)
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async auto_complete(interaction) {
        const focused_value = interaction.options.getFocused()
        const guild = interaction.guild

        if (!guild) {
            await interaction.respond([])
            return
        }

        await guild.members.fetch()
        const members = guild?.members.cache
                                        .filter(member => member.user.username.toLowerCase().startsWith(focused_value.toLowerCase()))
                                        .first(10)
        if (!members || members.length == 0) {
            await interaction.respond([
                {name: `Nenhum usuario encotrado`, value: 'none'}
            ])
        return
        }

        await interaction.respond(members.map(member => ({
            name: member.user.username,
            value: member.user.id
        })))
    },

    async execute(interaction) {
        interaction.reply({
            content: `membro ${interaction.options.getString('user')} teve a uma leve mudança na carteira feita por ${interaction.user.username}`
        })
    }
}