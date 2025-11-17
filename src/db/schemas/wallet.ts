import prisma from "#prisma";
import { Prisma } from "#prisma";

export const get_wallet = async (id: string) => {
    const wallet = await prisma.wallet.findUnique({
        where: {
            userId: id
        },
        select: {
            coin: true
        }
    })

    return wallet
}

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

export const reset_wallet = async (id: string) => {
    await prisma.wallet.update({
        where: {
            userId: id
        },
        data: {
            coin: 0,
            streak: 1,
            lastDaily: 0,
        }
    })
}

export const get_streak = async (id: string) => {
    const wallet = await prisma.wallet.findUnique({
        where: {
            userId: id
        },
        select: {
            streak: true,
            lastDaily: true
        }
    })

    return wallet
}


export const increment_streak = async (id: string, value: number, date: number) => {
    const wallet = await prisma.wallet.update({
        where: {
            userId: id
        },
        data: {
            streak: {
                increment: value
            },
            lastDaily: date
        },
        select: {
            streak: true
        }
    })
    return wallet
}

export const reset_streak = async (id: string) => {
    const wallet = await prisma.wallet.update({
        where: {
            userId: id
        },
        data: {
            streak: 1,
            lastDaily: 0
        },
        select: {
            streak: true
        }
    })
    return wallet
}