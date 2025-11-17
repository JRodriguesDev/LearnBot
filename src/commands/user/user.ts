import { SlashCommandBuilder, InteractionContextType, PermissionFlagsBits, MessageFlags } from 'discord.js'

import {Command} from '#interfaces'
import {get} from '#user_controller'

export const command: Command = {
    cooldown: 3,
    data: new SlashCommandBuilder()
                .setName('user')
                .setDescription('gerenciar usuario')
                .setContexts(InteractionContextType.Guild)
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
                .addSubcommand((sub => 
                    sub
                        .setName('profile')
                        .setDescription('mostrar perfil do usuario')
                        .addUserOption((option) => option.setName('target').setDescription('the user').setRequired(true))
                )),
                /*.addSubcommand((sub => 
                    sub
                        .setName('kick')
                        .setDescription('Kickar Usuario')
                        .addUserOption((option) => option.setName('target').setDescription('the user').setRequired(true))
                ))
                .addSubcommand((sub => 
                    sub
                        .setName('ban')
                        .setDescription('Banir Usuario')
                        .addUserOption((option) => option.setName('target').setDescription('the user').setRequired(true))
                )),*/

    async execute(interaction) {
        const sub = interaction.options.getSubcommand()
        const user = interaction.options.getUser('target')
            
        switch (sub) {
            case 'profile':
                const data = await get(interaction.user.id)
                await interaction.reply({content: `user profile: ${data?.name} ${data?.wallet?.coin}`, flags: MessageFlags.Ephemeral})
                break;
        }

    }
}