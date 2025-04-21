const vetService = require('../services/vetService'); 

const vetController = {
    async getAllVets(req,res){
        try {
            const veterinarios = await vetService.getAllVets();
            const resultados = veterinarios.map(vet=> ({
                id: vet.id,
                nome: vet.user.name,
            })); 
            res.json(resultados);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar veterinários" });
            
        }
    }
}

module.exports = vetController; 