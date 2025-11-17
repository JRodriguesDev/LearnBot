import { MessageFlags, SlashCommandBuilder, InteractionContextType } from 'discord.js'

import {Command} from '#interfaces'
import {daily_streak_reset, daily_streak_update, daily_streak_get, increment} from '#wallet_controller'

export const command: Command = {
    cooldown: 5,
    data: new SlashCommandBuilder()
                .setName('daily')
                .setDescription('Ganhe Reis Reis diariamente')
                .setContexts(InteractionContextType.Guild),
    
    async execute(interaction) {
        const daily_get = await daily_streak_get(interaction.user.id)
        const last_claim = daily_get?.lastDaily!
        const streak = daily_get?.streak!
        const daily_cooldawn = 86400000
        const user = interaction.user.username
        const now = Date.now()

        if ((last_claim !== 0) && (now - last_claim < daily_cooldawn)) {
            const time_left = daily_cooldawn - (now - last_claim)
            const hours = Math.floor(time_left / 3600000)
            const minutes = Math.floor((time_left % (3600000)) / 60000)
            await interaction.reply({
                content: `Voce nao e feito difernte para resgatar no mesmo dia. Espere **${hours}**h **${minutes}m**`,
                flags: MessageFlags.Ephemeral
            })
            return
        }

        if ((last_claim !== 0) && (now - last_claim >= daily_cooldawn * 2)) {
            await daily_streak_reset(interaction.user.id)
            await interaction.reply({
                content: `Voce Perdeu sua Streak`,
                flags: MessageFlags.Ephemeral
            })
            return
        }

        const reward = 10 * streak
        streak == 5 ? await daily_streak_update(interaction.user.id, 0, now) : daily_streak_update(interaction.user.id, 1, now)
        await increment(interaction.user.id, reward)
        await interaction.reply({
            content: `${user} Recebeu **${reward}** Reis Reis`,
            flags: MessageFlags.Ephemeral
        })
    }
}