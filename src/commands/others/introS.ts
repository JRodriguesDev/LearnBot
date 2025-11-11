import {SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, Interaction } from 'discord.js'

import {Command} from '#interfaces'

export const command: Command = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('uber')
        .setDescription('Entrada de Amir')
        .addStringOption((option) => 
            option
            .setName('inputa')
            .setDescription('insdaa')
        ),

    async execute(interaction) {
        await interaction.reply(`Amir esta a caminho`)
    }
}