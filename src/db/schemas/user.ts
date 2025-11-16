import prisma from "#prisma";
import { Prisma } from "#prisma";

export const create_user = async(data: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({
        data: {
            ...data,
            wallet: {
                create: {
                    coin: 0
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