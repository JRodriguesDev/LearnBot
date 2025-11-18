import {Events, Interaction, MessageFlags} from 'discord.js'
import {CustomClient, EventInteraction} from '#interfaces'
import {create} from '#user_controller'
import {get} from '#guild_controller'

export const event: EventInteraction = {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        const client = interaction.client as CustomClient

        if (!interaction.isModalSubmit()) return
        if (interaction.customId == 'form') {
        try {
            const email = interaction.fields.getTextInputValue('email_input')
            const password = interaction.fields.getTextInputValue('password_input')
            const role = await get(interaction.guildId!)
            const member = await interaction.guild?.members.fetch(interaction.user.id)
            if (!email.endsWith('@gmail.com')) return await interaction.reply({content: `O Email deve ser um @gmail.com`, flags: MessageFlags.Ephemeral})
                await member?.roles.add(role!.roleId!)
            await create({id: interaction.user.id, email: email, name: interaction.user.username, password: password})
            await interaction.reply({content: `${interaction.user.username} Se Tornou Diferente!`})
        } catch (error) {
            console.log(`Form ${error}`)
        }
        }
    }
}