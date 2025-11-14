import { SlashCommandBuilder, MessageFlags } from "discord.js";

import {Command} from '#interfaces'

export const command: Command = {
    data: new SlashCommandBuilder()
                .setName('my_wallet')
                .setDescription('Valor da Carteira'),
    cooldown: 5,
    async execute(interaction) {
        await interaction.reply({
            content: `${interaction.user.id} Possui 0 Reis Reis`,
            flags: MessageFlags.Ephemeral
        })
    }
}