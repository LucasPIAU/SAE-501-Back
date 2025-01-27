import { ObjectId } from 'mongodb';
import connectToDB from '../../functions/connectDb.js';

const getFormationsController = {
    getFormationById: async (req, res) => {
        try {
            const db = await connectToDB();
            const id = req.params.id;

            const collectionNames = [
                'formationsPro',
                'formationsTechno',
                'options-seconde',
                'options-generale'
            ];

            if (id) {
                for (let collectionName of collectionNames) {
                    const collection = db.collection(collectionName);
                    const result = await collection.findOne({ _id: new ObjectId(id) });
                    if (result) {
                        return res.status(200).json(result);
                    }
                }
                return res.status(404).json({ message: "Aucune formation correspondante pour cet Id" });
            } else {
                return res.status(400).json({ message: "L'id est obligatoire pour effectuer une recherche" });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Le serveur à repondu avec : ' + error })
        }
    },
    getAllFormations: async (req, res) => {
        try {
            const db = await connectToDB();

            const collectionNames = [
                'formationsPro',
                'formationsTechno',
                'options-seconde',
                'options-generale'
            ];

            const collectionsData = await Promise.all(
                collectionNames.map(async (collectionName) => {
                    const collection = db.collection(collectionName);
                    const data = await collection.find().toArray();
                    return { collectionName, data };
                })
            );

            const results = collectionsData.filter(({ data }) => data.length > 0);

            if (results.length > 0) {
                const response = results.reduce((acc, { collectionName, data }) => {
                    acc[collectionName] = data;
                    return acc;
                }, {});

                res.status(200).json(response);
            } else {
                res.status(404).json({ message: "Aucune formation trouvée dans les collections" });
            }
        } catch (err) {
            res.status(500).json({ message: `Une erreur interne est survenue lors de la récupération des formations : ${err.message}` });
        }
    },
    getProFormations: async (req, res) =>{
        try {
            const db = await connectToDB();
            const collectionFormations = db.collection('formationsPro');
    
            const formations = await collectionFormations.find().toArray();
    
            if (formations.length > 0) {
                return res.status(200).json(formations);
            } else return res.status(404).json({ message: "Aucune formation trouvée" });
    
        } catch (err) {
            return res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
        }
    },
    getTechnoFormations: async (req, res) =>{
        try {
            const db = await connectToDB();
            const collectionFormations = db.collection('formationsTechno');
    
            const formations = await collectionFormations.find().toArray();
    
            if (formations.length > 0) {
                return res.status(200).json(formations);
            } else return res.status(404).json({ message: "Aucune formations trouvée" });
    
        } catch (err) {
            return res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
        }
    },
    getOptSeconde: async (req, res) =>{
        try {
            const db = await connectToDB();
            const collectionFormations = db.collection('options-seconde');
    
            const options = await collectionFormations.find().toArray();
    
            if (options.length > 0) {
                return res.status(200).json(options);
            } else return res.status(404).json({ message: "Aucune options trouvée" });
    
        } catch (err) {
            return res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
        }
    },
    getOptGenerale: async (req, res) =>{
        try {
            const db = await connectToDB();
            const collectionFormations = db.collection('options-generale');
    
            const options = await collectionFormations.find().toArray();
    
            if (options.length > 0) {
                return res.status(200).json(options);
            } else return res.status(404).json({ message: "Aucune options trouvée" });
    
        } catch (err) {
            return res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
        }
    }
}

export default getFormationsController;