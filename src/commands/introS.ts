import {SlashCommandBuilder} from 'discord.js'

import {Command} from '#interfaces'

export const command: Command = {
    cooldown: 5,
    data: new SlashCommandBuilder().setName('uber').setDescription('Entrada de Amir'),
    async execute(interaction: any) {
        await interaction.reply(`Amir esta a caminho`)
    }
}