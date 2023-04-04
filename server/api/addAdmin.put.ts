import prisma from '~/lib/prisma'
import { getServerSession } from '#auth'
export default defineEventHandler(async (event) => {
    const session = await getServerSession(event) as { user: { email: string } } | null

    if (!session) {
        return null
    }

    const email = session['user']['email']
    const studentId = email.substring(1, 10)

    if (studentId != process.env.ADMIN) {
        return null
    }

    const { id: id } = getQuery(event) as { id: string }

    await prisma.admin.create({ data: { id: parseInt(id) } })

    return {}
})