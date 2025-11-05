import {SlashCommandBuilder} from 'discord.js'

export const command = {
    data: new SlashCommandBuilder().setName('amir').setDescription('Entrada de Amir'),
    async execute(interaction: any) {
        await interaction.reply(`Feito Diferente foi chamado por ${interaction.user.username}`)
    }
}