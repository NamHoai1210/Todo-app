const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
module.exports = async (
    oldPassword,
    newPassword,
    userId
) => {
    const findUser = await prisma.user.findUnique({
        where:
        {
            id: Number(userId),
        },
        select: {
            password: true,
        }
    });
    if (!findUser) {throw new Error('Can\'t find this user!');}
    else {
        const compare = await bcrypt.compare(oldPassword, findUser.password);
        if (compare) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(newPassword, salt);
            const updatePassword = await prisma.user.update({
                where:
                {
                    id: Number(userId),
                },
                data: {
                    password: hashed,
                }
            });
            updatePassword;
        } else {
            throw new Error('The Password is false!');
        }
    }
};