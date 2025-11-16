import {SlashCommandBuilder, MessageFlags, PermissionFlagsBits, InteractionContextType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalActionRowComponentBuilder } from 'discord.js'

import {Command} from '#interfaces'

export const command: Command = {
    cooldown: 3,
    data: new SlashCommandBuilder()
                .setName('join')
                .setDescription('Torna-se Diferente')
                .setContexts(InteractionContextType.Guild),
    
    async execute(interaction) {
        const modal = new ModalBuilder().setCustomId('form').setTitle('Torna-se Diferente')

        const email_input = new TextInputBuilder().setCustomId('email_input').setLabel('Qual seu Email').setStyle(TextInputStyle.Short).setRequired(true)
        const password_input = new TextInputBuilder().setCustomId('password_input').setLabel('Qual sua Senha?').setStyle(TextInputStyle.Short).setRequired(true)
        
        modal.addComponents(new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(email_input), new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(password_input))
        await interaction.showModal(modal)
    }
}