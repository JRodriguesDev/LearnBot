import { PrismaClient } from "../../generated/prisma/client.js"
import type { Prisma } from "../../generated/prisma/client.js"

const prisma = new PrismaClient()

export type {Prisma}
export default prisma


