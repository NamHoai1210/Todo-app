const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = async (
    email
)=>{
    try {
        const findUser = await prisma.user.findUnique({
            where:
            {
                email,
            },
            select: {
                id: true,
                name: true
            }
        });
        if (!findUser) {return null}
        return findUser;
    }
    catch(e){
        console.log(e);
    }
}