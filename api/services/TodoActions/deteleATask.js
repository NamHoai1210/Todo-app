const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (
    userId,
    taskId
) => {
        const findTask = await prisma.todo.findUnique({
            where: {
                id: Number(taskId),
            }
        });
        if (!findTask) {throw new Error('Can\'t find this task');}
        else if (findTask.userId !== Number(userId)) {throw new Error('Can\'t delete this task');}
        else {
            const deleteTask = await prisma.todo.delete({
                where: {
                    id: Number(taskId),
                }
            });
            deleteTask;
        }
};