import {Events, Client} from 'discord.js'

import {EventClient, CustomClient} from '#interfaces'

export const event: EventClient = {
    name: Events.ClientReady,
    once: true,
    execute(client: CustomClient) {
        console.log(`Bot Online: ${client.user!.tag}`)
    }
} 