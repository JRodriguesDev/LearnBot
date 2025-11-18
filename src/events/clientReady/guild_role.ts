import {Events} from 'discord.js'

import {EventClient, CustomClient} from '#interfaces'
import { create, get } from '#guild_controller'

export const event: EventClient = {
    name: Events.ClientReady,
    once: true,
    async execute(client: CustomClient) {
        console.log('Verify Role in Guilds...')

        for (const [, guild] of client.guilds.cache) {
            try {
                console.log(`Verify Guild: ${guild.name}`)
                const db_guild = await get(guild.id)
                if (!db_guild) {
                    const new_role = await guild.roles.create({
                        name: 'Diferente',
                        color: 0xffffff,
                        mentionable: true,
                        position: ((guild.members.me?.roles.highest.position!) -1)
                    })
                    await create(guild.id, new_role.id, guild.name)
                    console.log('Cargo Criado')
                }
            } catch (error) {
                console.log(`${error}`)
            }
        }
    }
}