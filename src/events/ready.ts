import {Events, Client} from 'discord.js'

import {EventClient, CustomClient} from '#interfaces'

export const event: EventClient = {
    name: Events.ClientReady,
    once: true,
    async execute(client: CustomClient) {
        console.log(`Bot Online: ${client.user!.tag}`)

        for (const [id, guild] of client.guilds.cache) {
            try {
                await guild.members.fetch()
                console.log(`Members loaded ${guild.name} ${guild.memberCount} members`)
            } catch (err) {
                console.log(`Error in update cache guild: ${err}`)
            }
        }
    }
} 