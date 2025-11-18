import prisma from "#prisma";

export const create_guild = async (id: string, roleId: string, name: string) => {
    const guild = prisma.guild.create({
        data: {
            id: id,
            name: name,
            roleId: roleId,
        },
        select: {
            name: true,
        }
    })

    return guild
}

export const get_guild = async (id: string) => {
    const guild = prisma.guild.findUnique({
        where: {
            id: id
        },
        omit: {
            id: true
        }
    })

    return guild
}