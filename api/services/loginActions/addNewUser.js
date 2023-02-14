const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
module.exports = async (
    data
) => {
    let { email, password, name } = data;
    const findUser = await prisma.user.findUnique({
        where:{
            email,
        }
    });
    if(findUser) {throw new Error('Email exists! Please enter another valid email!');}
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const createNew = await prisma.user.create({
        data:
        {
            email,
            password: hashed,
            name
        },
    });
    return createNew;
};