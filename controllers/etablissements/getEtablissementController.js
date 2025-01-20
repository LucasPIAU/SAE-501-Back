import { ObjectId } from 'mongodb';
import connectToDB from '../../functions/connectDb.js';

const getEtablissementController = {
    getLycee: async (req, res) => {
        try {
            const db = await connectToDB();
            const collection = db.collection("etablissements");

            const lycees = await collection.find().toArray();

            if (lycees.length > 0) {
                res.status(200).json(lycees);
            } else return res.status(404).json({ message: "Aucun établissement trouvé" });
        } catch (err) {
            res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
        }
    },
    getLyceeById: async (req, res) => {
        try {
            const db = await connectToDB();
            const collection = db.collection("etablissements");

            const { id } = req.params;

            if(!id){
                res.status(400).json({message:"L'id est obligatoire pour effectuer une recherche par Id"});
            }

            const lycee = await collection.findOne({ _id: new ObjectId(id) });

            if (lycee) {
                res.status(200).json(lycee);
            }else return res.status(404).json({message:"Aucun lycee trouvé"});
        } catch (err) {
            res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
        }
    }
}

export default getEtablissementController;