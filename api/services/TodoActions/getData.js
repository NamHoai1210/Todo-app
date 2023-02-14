const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let getDataForView = async (
    user_id
) => {
    let allTodos;
    allTodos = await prisma.todo.findMany({
        orderBy: {
            id: 'desc',
        },
        where: { userId: Number(user_id) },
    });
    return allTodos;
};

let getDataForEdit = async (
    userId,
    task_id
) => {
    const getTask = await prisma.todo.findUnique({
        where: {
            id: Number(task_id),
        }
    });
    if (!getTask) {throw new Error('Can\'t find this task');}
    else if (getTask.userId !== Number(userId)) {
        throw new Error('Can\'t find this task');
    }
    else {
        return getTask;
    }
};

module.exports = { getDataForEdit, getDataForView };