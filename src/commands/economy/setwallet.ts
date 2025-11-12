import {SlashCommandBuilder, PermissionFlagsBits, InteractionContextType} from 'discord.js'

import {Command} from '#interfaces'

export const command: Command = {
    cooldown: 5,
    data: new SlashCommandBuilder()
                .setName('set_wallet')
                .setDescription('Definir Carteira')
                .addUserOption((option) => option.setName('user').setDescription('Selecione o usuario'))
                .setContexts(InteractionContextType.Guild)
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        interaction.reply({
            content: `membro ${interaction.options.getString('user')} teve a uma leve mudança na carteira feita por ${interaction.user.username}`
        })
    }
}