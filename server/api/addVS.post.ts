import prisma from '~/lib/prisma'
import { getServerSession } from '#auth'
export default defineEventHandler(async (event) => {
    const session = await getServerSession(event) as { user: { email: string } } | null

    if (!session) {
        return null
    }

    const email = session['user']['email']
    const studentId = email.substring(1, 10)

    const admin = await prisma.admin.findUnique({
        where: { id: parseInt(studentId) },
    })

    if (!admin) {
        return null
    }

    const { voteName, voteGroup, startTime, endTime, candidates } = await readBody(event)

    const VS = await prisma.voteSession.create({
        data: {
            name: voteName,
            groupId: voteGroup,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
        }
    })

    for (const candidate_name of candidates) {
        await prisma.candidate.create({
            data: {
                name: candidate_name,
                voteSessionId: VS.id
            }
        })
    }

    return true
})