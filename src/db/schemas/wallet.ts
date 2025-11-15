import prisma from "#prisma";
import { Prisma } from "#prisma";

const update_wallet = async (id: string, amount: number) => {
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

const set_wallet = async (id: string, amount: number) => {
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