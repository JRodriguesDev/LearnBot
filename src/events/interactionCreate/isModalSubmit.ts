import {Events, Interaction, MessageFlags} from 'discord.js'
import {CustomClient, EventInteraction} from '#interfaces'

export const event: EventInteraction = {
    name: Events.InteractionCreate,
    async  execute(interaction: Interaction) {
        const client = interaction.client as CustomClient

        if (!interaction.isModalSubmit()) return
        console.log(interaction)
        if (interaction.customId == 'form') {
            const email = interaction.fields.getTextInputValue('email_input')
            const password = interaction.fields.getTextInputValue('password_input')
            console.log(email, password)
            await interaction.reply({content: `${interaction.user.username} Se Tornou Diferente!`})
        }
    }
}