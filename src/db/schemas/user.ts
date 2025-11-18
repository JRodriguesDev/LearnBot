import prisma from "#prisma";
import type{ Prisma } from "#prisma";

export const create_user = async(data: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({
        data: {
            ...data,
            wallet: {
                create: {
                    coin: 0,
                    lastDaily: 0
                }
            }
        },
        select: {
            name: true,
            wallet: {
                select: {
                    coin: true
                }
            }
        }
    })

    return user
}

export const get_user = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {id: id},
        select: {
            name: true,
            wallet: {
                select: {
                    coin: true
                }
            }
        }
    })

    return user
}