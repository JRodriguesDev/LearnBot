import { MessageFlags, SlashCommandBuilder } from 'discord.js'

import {Command} from '#interfaces'

let last_claim: any

export const command: Command = {
    cooldown: 5,
    data: new SlashCommandBuilder()
                .setName('daily')
                .setDescription('Ganhe Reis Reis diariamente'),
    
    async execute(interaction) {
        const daily_cooldawn = 86400000
        const user = interaction.user.username
        const now = Date.now()

        if ((last_claim) && (now - last_claim < daily_cooldawn)) {
            const time_left = daily_cooldawn - (now - last_claim)
            const hours = Math.floor(time_left / 3600000)
            const minutes = Math.floor((time_left % (3600000)) / 60000)
            await interaction.reply({
                content: `Voce nao e feito difernte para resgatar no mesmo dia. Espere **${hours}**h **${minutes}m**`,
                flags: MessageFlags.Ephemeral
            })
            return
        }

        last_claim = Date.now()
        const reward = 10
        await interaction.reply({
            content: `${user} Recebeu **${reward}** Reis Reis`,
            flags: MessageFlags.Ephemeral
        })
    }
}