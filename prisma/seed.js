require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Importa instância do prisma para a interação com o banco de dados:
const prisma = require('../src/config/database'); 

// Importa e instânciando o Faker para a geração de dados:
const {fakerPT_BR} = require('@faker-js/faker');
const faker = fakerPT_BR; 

// Importa biblioteca para a criptografia da senha:
const bcrypt = require('bcryptjs'); 

/**
 * Gera dados fictícios de um usuário, como nome, email e papel no sistema.
 * @param {string} role - Papel do usuário (ex: 'veterinario', 'fazendeiro', etc.)
 * @returns {object} Dados do usuário
 */
function generateUserData(role){
    const fullname = faker.person.fullName();
    const username = fullname.toLowerCase()
    .replace(/ /g, '.')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
    const email = `${username}@moovox.com`;

    return {
        name: fullname,
        email, 
        role,
    };
}; 

/**
 * Cria usuários com base no papel (role) fornecido.
 * Para o papel 'veterinario', também cria um registro associado na tabela de veterinários.
 * @param {string} role - Papel do usuário
 * @param {number} quantity - Quantidade de usuários a serem criados (este parâmetro não está sendo usado corretamente)
 */
async function createUserByRole(role,quantity){
    for(let i = 0 ; i < quantity ; i++ ){
        const userData = generateUserData(role);
        const hashedPassword = await bcrypt.hash("123456", 8);

        const user = await prisma.user.create({
            data: {
                ...userData, 
                password: hashedPassword
            },
        });
        
        // Se o usuário for veterinário, cria também na tabela relacionada
        if(role === "veterinario"){
            await prisma.veterinario.create({
                data:{
                    user_id: user.id,
                },
            });
        }
    }
}

/**
 * Cria o usuário administrador, caso ele ainda não exista no banco de dados.
 */
async function createAdminIfNotExists(){
    const email = "admin@moovox.com";
    console.log("🔐 Verificando administrador...");
    const existing_email = await prisma.user.findUnique({where: {email: email}});

    if(!existing_email){
        const hashedPassword = await bcrypt.hash('admin123', 8);
        await prisma.user.create({
            data: {
                name: "Administrador Moovox", 
                email, 
                password: hashedPassword,
                role: "admin"
            },
        });
        console.log("✅ Administrador criado com sucesso.");
    }else{
        console.log("ℹ️ Administrador já existe.");
    }
}

/**
 * Cria registros de animais aleatórios com nomes, raças e status de saúde variados.
 * @param {number} quantity - Quantidade de animais a serem criados
 */ 
async function createRandomAnimals(quantity){
    const nomes = [
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

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    for(let i = 0 ; i < quantity ; i++){
        await prisma.animal.create({
            data: {
                name: getRandom(nomes),
                species: 'bovino',
                breed: getRandom(breeds),
                age: Math.floor(Math.random()*20) + 1,  
                weight: Math.floor(Math.random()*4) + 15,
                health_status: getRandom(health_status),
            },
        });
    }
}

/**
 * Insere várias vacinas no banco de dados de uma só vez.
 * Cada entrada contém dados relevantes sobre a vacina.
 */
async function createVaccines(){
    await prisma.vaccine.createMany({
        data: [{
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

/**
 * Função principal responsável por:
 * - Limpar dados antigos do banco
 * - Criar usuários com diferentes papéis
 * - Criar um administrador
 * - Popular o banco com animais e vacinas
 */
async function main() {
    console.log("🔄 Iniciando o processo de seed...");

    console.log("🧹 Limpando dados existentes...");
    // Remove dados anteriores para evitar duplicidades ou conflitos
    await prisma.veterinario.deleteMany(); 
    await prisma.user.deleteMany(); 
    await prisma.animal.deleteMany(); 
    await prisma.vaccine.deleteMany();
    console.log("✅ Dados antigos removidos.");

    // Criação de usuários por papel
    await createUserByRole('fazendeiro', 3);
    console.log(`✅ 3 fazendeiros criados.`);
    await createUserByRole('veterinario', 3); 
    console.log(`✅ 3 veterinários criados.`); 
    await createUserByRole('funcionario', 3); 
    console.log(`✅ 3 funcionários criados.`);  

    // Criação do administrador (se necessário)
    await createAdminIfNotExists();

    // Criação de animais e vacinas
    await createRandomAnimals(10);
    console.log("✅ Animais criados.");
    await createVaccines();
    console.log("✅ Vacinas cadastradas.");

    console.log("✅ Seed concluído com sucesso.");
}

// Execução da função principal com tratamento de erros e fechamento da conexão com o banco
main()
.catch((err) => {
    console.error("❌ Erro ao executar seed:", err);
    process.exit(1);
})
.finally(async() => {
    await prisma.$disconnect();
});