const {PrismaClient} = require('@prisma/client'); 

const bcrypt = require('bcryptjs'); 

const prisma = new PrismaClient(); 

async function main() {
    const emailAdmin = 'admin@moovox.com'; 

    const existingAdmin = await prisma.user.findUnique({
        where: {email: emailAdmin},
    }); 

    if(!existingAdmin){
        const hashedPassword = await bcrypt.hash('admin123', 8); 

        await prisma.user.create({
            data:{
                name: "Administrador Moovox",
                email: emailAdmin, 
                password: hashedPassword, 
                role: "admin"
            },
        });

        console.log('Administrador criado com sucesso.'); 
    }else{
        console.log('Administrador já existe no sistema.')
    }
}

main()
.catch((error) => {
    console.log(error);
    process.exit(1);
})
.finally(async()=>{
    await prisma.$disconnect(); 
})