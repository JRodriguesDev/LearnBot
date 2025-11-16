import bcrypt from 'bcryptjs'

import {Prisma} from '#prisma'
import {increment_wallet, decrement_wallet, set_wallet} from '../schemas/wallet.js'

export const increment = async (id: string, amount: number) => {
    const wallet = await increment_wallet(id, amount)

    return wallet
}

export const decrement = async (id: string, amount: number) => {
    const wallet = await decrement_wallet(id, amount)

    return wallet
}

export const set = async (id: string, amount: number) => {
    const wallet = await set_wallet(id, amount)

    return wallet
}