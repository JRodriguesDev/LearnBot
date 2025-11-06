import {Events, Client} from 'discord.js'

import {EventClient} from '#interfaces'

export const event: EventClient = {
    name: Events.ClientReady,
    once: true,
    execute(client :Client) {
        console.log(`Bot Online: ${client.user!.tag}`)
    }
} 