const {PrismaClient} = require('@prisma/client'); 
const {fakerPT_BR} = require('@faker-js/faker'); 
const faker = fakerPT_BR; 

const bcrypt = require('bcryptjs'); 

const prisma = new PrismaClient(); 

async function main() {

    // Deleta todos os usuários que existirem: 
    await prisma.user.deleteMany();
    await prisma.animal.deleteMany();
    await prisma.vaccine.deleteMany(); 
    const users = []; 

    // Criação de fazendeiros
    for(let i = 0 ; i < 3 ; i ++){
        const fullName = faker.person.fullName();
        const userName = fullName.toLowerCase().replace(/ /g, '.').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const email = `${userName}@moovox.com`;

        const hashedPassword = await bcrypt.hash('123456',10); 

        const farmer = await prisma.user.create({
            data:{
                name: fullName, 
                email: email, 
                password: hashedPassword, 
                role: 'fazendeiro'
            },
        }); 
        users.push(farmer);
    }
    // Criação de funcionarios
    for(let i = 0 ; i < 3 ; i ++){
        const fullName = faker.person.fullName();
        const userName = fullName.toLowerCase().replace(/ /g, '.').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const email = `${userName}@moovox.com`;

        const hashedPassword = await bcrypt.hash('123456',10); 

        const employee = await prisma.user.create({
            data:{
                name: fullName, 
                email: email, 
                password: hashedPassword, 
                role: 'funcionario'
            },
        }); 
        users.push(employee);
    }
    // Criação de veterinarios
    for(let i = 0 ; i < 3 ; i ++){
        const fullName = faker.person.fullName();
        const userName = fullName.toLowerCase().replace(/ /g, '.').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const email = `${userName}@moovox.com`;

        const hashedPassword = await bcrypt.hash('123456',10); 

        const vet = await prisma.user.create({
            data:{
                name: fullName, 
                email: email, 
                password: hashedPassword, 
                role: 'veterinario'
            },
        }); 
        const veterinario = await prisma.veterinario.create({
            data: {
                user_id: vet.id,
            }
        }); 
        users.push(vet);
    }

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

    // Criação de animais:
const animals = [];

const nomesDeAnimais = [
    'Mimosa', 'Tufão', 'Berrante', 'Estrela', 'Pingo', 'Bilu', 'Chico', 'Juju',
    'Fubá', 'Nina', 'Zé do Pasto', 'Aurora', 'Luar', 'Bambina', 'Flor', 'Valente',
    'Pretinha', 'Branquinha', 'Marrom', 'Manchada', 'Lua', 'Sol', 'Galocha',
    'Coragem', 'Pituca', 'Lambreta', 'Zezinho', 'Linda', 'Pérola', 'Amora',
    'Serena', 'Sabiá', 'Guri', 'Pantera', 'Xodó', 'Lelé', 'Mulata', 'Trovão',
    'Raio', 'Gaspar', 'Dora', 'Rosinha', 'Teca', 'Dalila', 'Morgana', 'Belinha',
    'Naná', 'Xuxa', 'Rubi', 'Diamante', 'Café', 'Chocolate', 'Creme', 'Canela',
    'Caramelo', 'Castanha', 'Manteiga', 'Farofa', 'Bolacha', 'Mel', 'Abóbora',
    'Cacau', 'Leitosa', 'Frida', 'Jade', 'Kiara', 'Pandora', 'Faísca', 'Brisa',
    'Tempestade', 'Pipoca', 'Paçoca', 'Feijão', 'Arroz', 'Rapadura', 'Queijinha',
    'Joaninha', 'Tatá', 'Bilu Tetéia', 'Firmina', 'Lindalva', 'Raimunda',
    'Zefinha', 'Anastácia', 'Bezerra', 'Tainá', 'Índia', 'Chuvinha', 'Formiga',
    'Cotinha', 'Sebastiana', 'Lobinha', 'Jurubeba', 'Gracinha', 'Rosada',
    'Catarina', 'Solange', 'Gertrudes', 'Mariquinha', 'Rosângela'
  ];

const health_status = ['saudavel', 'doente', 'recuperacao'];
const breeds = ['Nelore', 'Angus', 'Senepol', 'Brangus'];

function getRandom(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

for (let i = 0; i < 10; i++) {
  const name = getRandom(nomesDeAnimais);
  const breed = getRandom(breeds);
  const status = getRandom(health_status);

  const animal = await prisma.animal.create({
    data: {
      name: name,
      species: 'bovino',
      breed: breed,
      age: Math.floor(Math.random() * 20) + 1,
      weight: Math.floor(Math.random() * 4) + 15,
      health_status: status,
    }
  });

  animals.push(animal);
}

// Criação de vacinas: 
await prisma.vaccine.createMany({
    data: [
        {
            name: "Aftovac",
            target_disease: "Febre Aftosa", 
            type: "injetavel",
            manufacturer: "Biovet", 
            batch: "AFT12345BR",
            expiration_date: "2026-03-10",
            required_doses: 2, 
            dosing_interval: 180,
            notes: "Recomendada para bovinos a partir de 3 meses de idade."
        },
        {
            name: "Clostrivet",
            target_disease: "Clostridioses", 
            type: "injetavel", 
            manufacturer: "Ceva Saúde Animal", 
            batch: "CLO99876CE",
            expiration_date: "2025-12-01",
            required_doses: 2, 
            dosing_interval: 90,
            notes: "Protege contra 7 tipos de clostridioses. Reaplicação anual."
        },
        {
            name: "Brucelose B19",
            target_disease: "Brucelose", 
            type: "injetavel", 
            manufacturer: "Instituto Butantan", 
            batch: "BRU44321BU",
            expiration_date: "2026-30-01",
            required_doses: 1, 
            notes: "Aplicação obrigatória em fêmeas de 3 a 8 meses. Uso exclusivo por veterinário."
        },
        {
            name: "Raivac",
            target_disease: "Raiva", 
            type: "injetavel", 
            manufacturer: "Zoetis", 
            batch: "RAI76543ZO",
            expiration_date: "2025-09-15",
            required_doses:  1, 
            dosing_interval:  365,
            notes: "Vacinação anual recomendada para regiões endêmicas."
        },
        {
            name: "Leptovac",
            target_disease: "Leptospirose", 
            type: "injetavel", 
            manufacturer: "MSD Saúde Animal", 
            batch: "LEP33210MS",
            expiration_date: "2026-05-20",
            required_doses:  2, 
            dosing_interval:  30,
            notes: "Protege contra várias cepas de leptospira. Recomendada antes do período reprodutivo."
        },
        {
            name: "Carbovet",
            target_disease: "Carbovet", 
            type: "injetavel", 
            manufacturer: "Ourofino", 
            batch: "CAR85471OU",
            expiration_date: "2026-11-08",
            required_doses:  1, 
            notes: "Vacinação única com reforço anual."
        },
        {
            name: "IBR-IPV",
            target_disease: "Rinotraqueíte e Vulvovaginite infecciosa", 
            type: "injetavel", 
            manufacturer: "Hipra", 
            batch: "IBR22100HI",
            expiration_date: "2026-04-12",
            required_doses:  2, 
            dosing_interval: 30, 
            notes: "Fundamental para reprodução segura de bovinos."
        },
        {
            name: "BVDvac",
            target_disease: "Diarreia Viral Bovina (BVD)", 
            type: "injetavel", 
            manufacturer: "Zoetis", 
            batch: "BVD99880ZO",
            expiration_date: "2025-07-01",
            required_doses:  2, 
            dosing_interval: 21, 
            notes: "Importante em fazendas com reprodução intensiva."
        },
        {
            name: "Pneumovac",
            target_disease: "Doenças respiratórias", 
            type: "intranasal", 
            manufacturer: "Boehringer Ingelheim", 
            batch: "PNE34567BI",
            expiration_date: "2026-02-14",
            required_doses:  2, 
            dosing_interval: 30, 
            notes: "Indicada especialmente para bezerros e animais em confinamento."
        },
        {
            name: "Enterovet",
            target_disease: "Enterotoxemia", 
            type: "oral", 
            manufacturer: "Vencofarma", 
            batch: "ENT12399VE",
            expiration_date: "2026-06-18",
            required_doses:  2, 
            dosing_interval: 60, 
            notes: "Previne doenças entéricas. Reforço anual recomendado."
        },
        
        
    ]

    
})


}

main()
.catch((error) => {
    console.log(error);
    process.exit(1);
})
.finally(async()=>{
    await prisma.$disconnect(); 
})