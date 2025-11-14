import {SlashCommandBuilder, PermissionFlagsBits, InteractionContextType, MessageFlags, TextDisplayBuilder} from 'discord.js'

import {Command} from '#interfaces'

export const command: Command = {
    cooldown: 3,
    data: new SlashCommandBuilder()
                .setName('wallet')
                .setDescription('Gerencia Carteira de Usuario')
                .setContexts(InteractionContextType.Guild)
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
                .addSubcommand((sub) =>
                    sub
                        .setName('view')
                        .setDescription('Olhar a carteira do usuario')
                        .addUserOption((option) => option.setName('target').setDescription('the user').setRequired(true))
                )
                .addSubcommand((sub) =>
                    sub
                        .setName('set')
                        .setDescription('Definir carteira do usuario')
                        .addUserOption((option) => option.setName('target').setDescription('the user').setRequired(true))
                )
                .addSubcommand((sub) =>
                    sub
                        .setName('reset')
                        .setDescription('Reseta a carteira do usuario')
                        .addUserOption((option) => option.setName('target').setDescription('the user').setRequired(true))
                ),
    async execute(interaction) {
        const sub = interaction.options.getSubcommand()
        const user = interaction.options.getUser('target')

        switch (sub) {
            case 'view':
                const text = new TextDisplayBuilder().setContent(`Carteira de ${user} foi olhada por ${interaction.user.username}`)
                interaction.reply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [text]
                })
                break;
            case 'set':
                await interaction.reply({content: `Setando ${user}`, flags: MessageFlags.Ephemeral})
                break;
            case 'delete':
                await interaction.reply({content: `deletando ${user}`, flags: MessageFlags.Ephemeral})
                break;
        }
    }
}