import prisma from '~/lib/prisma'
import { getServerSession } from '#auth'
export default defineEventHandler(async (event) => {
    const { id } = await readBody(event)

    if (!id) {
        return false
    }

    const admin = await prisma.admin.findUnique({
        where: { id: parseInt(id) },
    })

    return admin !== null
})