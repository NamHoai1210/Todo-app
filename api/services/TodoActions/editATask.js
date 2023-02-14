const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let editTaskStatus = async (
    userId,
    taskId,
    taskStatus
) => {
    const findTask = await prisma.todo.findUnique({
        where: {
            id: Number(taskId),
        }
    });
    if (!findTask) {throw new Error('Can\'t find this task');}
    else if (findTask.userId !== Number(userId)) {throw new Error('Can\'t edit this task');}
    else {
        if (typeof taskStatus == 'string') {taskStatus = (taskStatus === 'true');}
        taskStatus = !taskStatus;
        const updateTask = await prisma.todo.update({
            where: {
                id: Number(taskId),
            },
            data:
            {
                is_done: taskStatus,
            },
        });
        updateTask;
    }
};
let editATask = async (
    userId,
    taskId,
    data
) => {
    const findTask = await prisma.todo.findUnique({
        where: {
            id: Number(taskId),
        }
    });
    if (!findTask) {throw new Error('Can\'t find this task');}
    else if (findTask.userId !== Number(userId)) {throw new Error('Can\'t edit this task');}
    else {
        let { title, desc } = data;
        const updateTask = await prisma.todo.update({
            where: {
                id: Number(taskId),
            },
            data:
            {
                title,
                desc,
            },
        });
        updateTask;
    }
};

module.exports = { editATask, editTaskStatus };