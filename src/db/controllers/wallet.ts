import bcrypt from 'bcryptjs'

import prisma, {Prisma} from '#prisma'
import {increment_wallet, decrement_wallet, set_wallet, increment_streak, reset_streak, get_streak, get_wallet, reset_wallet} from '../schemas/wallet.js'

export const get = async (id: string) => {
    const wallet = await get_wallet(id)

    return wallet
}

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

export const reset = async (id: string) => {
    await reset_wallet(id)
}

export const daily_streak_update = async (id: string, value: number, date: number) => {
    const wallet = await increment_streak(id, value, date)
    
    return wallet
}

export const daily_streak_reset = async (id: string) => {
    const wallet = await reset_streak(id)
    
    return wallet
}

export const daily_streak_get = async (id: string) => {
    const wallet = await get_streak(id)
    
    return wallet
}
