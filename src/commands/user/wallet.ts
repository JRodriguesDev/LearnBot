import {SlashCommandBuilder, PermissionFlagsBits, InteractionContextType, MessageFlags} from 'discord.js'

import {Command} from '#interfaces'
import {get, set, reset} from '#wallet_controller'

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
                        .addIntegerOption((option) => option.setName('amount').setDescription('Novo Valor de Reis reis').setRequired(true))
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
        const wallet = await get(user!.id)
        switch (sub) {
            case 'view':
                if (wallet) {
                    await interaction.reply({content: `A Carteira de **${user}** tem **$${wallet?.coin} Reis Reis**`, flags: MessageFlags.Ephemeral})
                    break
                }
                await interaction.reply({content: `O Usuario: **${user}**\n Não e Diferente`, flags: MessageFlags.Ephemeral})
                break;
            case 'set':
                if (wallet) {
                    const value = interaction.options.getInteger('amount')!
                    const updated = await set(interaction.user.id, value)
                    await interaction.reply({content: `A Carteira de **${user}** sofreu uma leve alteração para **$${updated?.coin} Reis Reis**`})
                    break;
                }
                await interaction.reply({content: `O Usuario: **${user}**\n Não e Diferente`, flags: MessageFlags.Ephemeral})
                break;
            case 'reset':
                if (wallet) {
                    await reset(interaction.user.id)
                    await interaction.reply({content: `A Carteira de **$${user}** foi **resetada**`, flags: MessageFlags.Ephemeral})
                    break;
                }
                await interaction.reply({content: `O Usuario: **${user}**\n Não e Diferente`, flags: MessageFlags.Ephemeral})
                break;
        }
    }
}