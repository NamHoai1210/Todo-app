const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (
    userId,
    data
) => {
        let { title, desc} = data;
        const createNew = await prisma.todo.create({
            data:
            {
                title,
                desc,
                is_done: false,
                userId: Number(userId)
            },
        });
    return createNew;
};