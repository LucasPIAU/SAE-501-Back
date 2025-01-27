import { ObjectId } from 'mongodb';
import connectToDB from '../../functions/connectDb.js';

const deleteFormationsController = {
    deleteFormation: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).json({ message: "L'id d'une etablissement doit être fourni pour permettre sa suppression" });
            }
            const db = await connectToDB();

            const collectionNames = [
                'formationsPro',
                'formationsTechno',
                'options-seconde',
                'options-generale'
            ];

            for (let collectionName of collectionNames) {
                const collection = await db.collection(collectionName);

                const result = await collection.findOne({ _id: new ObjectId(id) });

                if (result) {
                    collection.deleteOne({ _id: new ObjectId(id) });
                    return res.status(204).send();
                }
            }
            res.status(404).json({ message: "Aucune formation ne correspond à cet Id" });
        } catch (err) {
            res.status(500).json({message: `Le serveur à renvoyé l'erreur suivante : ${err}`})
        }

    }
}

export default deleteFormationsController;