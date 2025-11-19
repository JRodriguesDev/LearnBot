import {Events, VoiceState} from 'discord.js'
import {joinVoiceChannel, getVoiceConnection} from '@discordjs/voice'

import {EventInteraction} from '#interfaces'
import {get} from '#guild_controller'

export const event: EventInteraction = {
    name: Events.VoiceStateUpdate,
    async execute(old_state: VoiceState, new_state: VoiceState) {
        if (!new_state.channel!) return
        const guild = new_state.guild
        const role_id = (await get(guild.id))?.roleId
        const user = await guild.members.fetch(new_state.member?.user.id!)
        if (!user.roles.cache.has(role_id!)) return
        const old_channel = old_state.channel
        const new_channel = new_state.channel
        
        if(!old_channel && new_channel) {
            joinVoiceChannel({
                guildId: guild.id,
                channelId: new_channel.id,
                adapterCreator: guild.voiceAdapterCreator
            })
        }
        if(old_channel && new_channel) {
            joinVoiceChannel({
                guildId: guild.id,
                channelId: new_channel.id,
                adapterCreator: guild.voiceAdapterCreator
            })
        }
    }
}