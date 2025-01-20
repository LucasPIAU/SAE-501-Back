import connectToDB from '../../functions/connectDb.js';

const getEtablissementController = {
    getLycee: async (req, res) => {
        try{
        const db = await connectToDB();
        const collection = db.collection("etablissements");

        const lycees = await collection.find().toArray();

        if (lycees.length > 0) {
            res.status(200).json(lycees);
        }else return res.status(404).json({message : "Aucun établissement trouvé"});
    }catch(err){
        res.status(500).json({message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
    }
    }
}

export default getEtablissementController;