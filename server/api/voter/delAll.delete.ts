import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
// 確認權限
if (!event.context.session) {
    throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: '未登入',
    })
}

if (!event.context.isAdmin) {
    throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
        message: '不是管理員',
    })
}

    await prisma.voter.deleteMany()
    setResponseStatus(event, 204)
    return {}
})
