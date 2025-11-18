import {create_guild, get_guild} from '../schemas/guild.js'

export const create = async (id: string, roleId: string, name: string) => {
    const guild = await create_guild(id, roleId, name)

    return guild
}

export const get = async (id: string) => {
    const guild = await get_guild(id)

    return guild
}