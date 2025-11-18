import {Events, Guild} from 'discord.js'

import {EventInteraction} from '#interfaces'
import { create } from '#guild_controller'

export const event: EventInteraction = {
    name: Events.GuildCreate,
    async execute(guild: Guild) {
        try {
            const new_role = await guild.roles.create({
                name: 'Diferente',
                color: 0xffffff,
                mentionable: true,
                position: ((guild.members.me?.roles.highest.position!) -1)
            })
            await create(guild.id, new_role.id, guild.name)
        } catch (error) {
            console.log(`${error}`)
        }
    }
}