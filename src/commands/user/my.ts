import {SlashCommandBuilder, InteractionContextType, MessageFlags} from 'discord.js'

import {Command} from '#interfaces'
import {get as user_get} from '#user_controller'
import {get as wallet_get} from '#wallet_controller'

export const command: Command = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('my')
        .setDescription('Olhar minahs Informaçoes')
        .setContexts(InteractionContextType.Guild)
        .addSubcommand((sub) => 
            sub
                .setName('perfil')
                .setDescription('Visualizar Perfil')
        )
        .addSubcommand((sub) => 
            sub
                .setName('wallet')
                .setDescription('Visualizar Carteira')
        ),
    async execute(interaction) {
        const sub = interaction.options.getSubcommand()
        switch (sub) {
            case 'perfil':
                const user = await user_get(interaction.user.id)
                await interaction.reply({content: `## Perfil de ${user?.name}:\n `, flags: MessageFlags.Ephemeral})
                break;
            case 'wallet':
                const wallet = await wallet_get(interaction.user.id)
                await interaction.reply({content: `## Carteira de ${interaction.user.username}:\n **$${wallet?.coin} Reis Reis**`, flags: MessageFlags.Ephemeral})
                break;
        }
    }
}