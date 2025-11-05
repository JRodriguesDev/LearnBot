import {SlashCommandBuilder} from 'discord.js'

export const command = {
    data: new SlashCommandBuilder().setName('uber').setDescription('Entrada de Amir'),
    async execute(interaction: any) {
        await interaction.reply(`Amir esta a caminho`)
    }
}