import {SlashCommandBuilder} from 'discord.js'

export const intro = {
    data: new SlashCommandBuilder()
        .setName('intro')
        .setDescription('Amir Intro'),

    async execute(interaction: any) {
        await interaction.reply(`Tem  Reis Reis ${interaction.user.username}, entoru em ${interaction.member.joinedAt}`)
    }
}