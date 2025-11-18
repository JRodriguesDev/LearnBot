import {SlashCommandBuilder, InteractionContextType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalActionRowComponentBuilder, MessageFlags } from 'discord.js'

import {Command} from '#interfaces'
import {get as user_get} from '#user_controller'
import {get as guild_get} from '#guild_controller'

export const command: Command = {
    cooldown: 3,
    data: new SlashCommandBuilder()
                .setName('join')
                .setDescription('Torna-se Diferente')
                .setContexts(InteractionContextType.Guild),
    
    async execute(interaction) {
        const user = await user_get(interaction.user.id)
        if (user) {
            const role = await guild_get(interaction.guildId!)
            const member = await interaction.guild?.members.fetch(interaction.user.id)
            await member?.roles.add(role?.roleId!)
            await interaction.reply({content: `**${interaction.user.username}** teve seu Cargo Reatribuido`, flags: MessageFlags.Ephemeral})
            return
        }
        const modal = new ModalBuilder().setCustomId('form').setTitle('Torna-se Diferente')

        const email_input = new TextInputBuilder().setCustomId('email_input').setLabel('Qual seu Email').setStyle(TextInputStyle.Short).setRequired(true)
        const password_input = new TextInputBuilder().setCustomId('password_input').setLabel('Qual sua Senha?').setStyle(TextInputStyle.Short).setRequired(true).setMinLength(8)
        
        modal.addComponents(new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(email_input), new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(password_input))
        await interaction.showModal(modal)
    }
}