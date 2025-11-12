import { SlashCommandBuilder } from 'discord.js'

import {Command} from '#interfaces'

export const command: Command = {
    cooldown: 5,
    data: new SlashCommandBuilder()
                .setName('user')
                .setDescription('gerenciar usuario')
                .addSubcommand((sub => 
                    sub
                        .setName('profile')
                        .setDescription('mostrar perfil do usuario')
                        .addUserOption((option) => option.setName('target').setDescription('the user').setRequired(true))
                ))
                .addSubcommand((sub => 
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
                )),

    async execute(interaction) {
        const sub = interaction.options.getSubcommand()
        const user = interaction.options.getUser('target')

        switch (sub) {
            case 'profile':
                await interaction.reply(`user profile: ${user}`)
                break;
            case 'kick':
                await interaction.reply(`${user} foi kikcado por admin ${interaction.user.username}`)
                break;
            case 'ban':
                await interaction.reply(`${user} foi banido por admin ${interaction.user.username}`)
                break;
        }

    }
}