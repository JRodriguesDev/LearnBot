import { SlashCommandBuilder, MessageFlags } from "discord.js";

import {Command} from '#interfaces'
import {get} from '#wallet_controller'

export const command: Command = {
    data: new SlashCommandBuilder()
                .setName('my_wallet')
                .setDescription('Valor da Carteira'),
    cooldown: 5,
    async execute(interaction) {
        const coin = await get(interaction.user.id)

        await interaction.reply({
            content: `${interaction.user.username} Possui ${coin?.coin} Reis Reis`,
            flags: MessageFlags.Ephemeral
        })
    }
}