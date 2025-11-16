import bcrypt from 'bcryptjs'

import {Prisma} from '#prisma'
import {create_user} from '../schemas/user.js'

export const create = async (data: Prisma.UserCreateInput) => {
    const user = await create_user({...data, 'password': await bcrypt.hash(data.password, 10)})
    return user
} 