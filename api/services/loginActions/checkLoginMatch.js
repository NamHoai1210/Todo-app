const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
module.exports = async (
    email, password
) => {
    try {
        const findUser = await prisma.user.findUnique({
            where:
            {
                email: email,
            },
            select: {
                id: true,
                name: true,
                password: true,
            }
        });
        if (!findUser) {throw new Error('Cant find this user!');}
        else {
            const compare = await bcrypt.compare(password, findUser.password);
            if(compare){
                return {
                    id: findUser.id,
                    email,
                    name: findUser.name
                };
            }else{
                return undefined;
            }
        }

    }
    catch (e) {
        console.log(e);
    }
};