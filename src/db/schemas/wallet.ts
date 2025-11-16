import prisma from "#prisma";
import { Prisma } from "#prisma";

export const increment_wallet = async (id: string, amount: number) => {
    const wallet = await prisma.wallet.update({
        where: {
            userId: id
        },
        data: {
            coin: {
                increment: amount
            }
        },
        select: {
            coin: true
        }
    })

    return wallet
}

export const decrement_wallet = async (id: string, amount: number) => {
    const wallet = await prisma.wallet.update({
        where: {
            userId: id
        },
        data: {
            coin: {
                decrement: amount
            }
        },
        select: {
            coin: true
        }
    })

    return wallet
}

export const set_wallet = async (id: string, amount: number) => {
    const wallet = await prisma.wallet.update({
        where: {
            userId: id
        },
        data: {
            coin: amount
        },
        select: {
            coin: true
        }
    })

    return wallet
}