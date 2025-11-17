import bcrypt from 'bcryptjs'

import {Prisma} from '#prisma'
import {create_user, get_user} from '../schemas/user.js'

export const create = async (data: Prisma.UserCreateInput) => {
    const user = await create_user({...data, 'password': await bcrypt.hash(data.password, 10)})
    return user
}

export const get = async (id: string) => {
    const user = await get_user(id)

    return user
}