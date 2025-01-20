import { ObjectId } from 'mongodb';
import connectToDB from '../../functions/connectDb.js';

const patchFormationsController = {
    patchFormation: async (req, res) => {
        try {
            const db = await connectToDB();

            const { id } = req.params;
            const updateFields = req.body;

            if (!id) {
                return res.status(400).json({ message: "L'identifiant (id) est requis." });
            }

            if (Object.keys(updateFields).length === 0) {
                return res.status(400).json({ message: "Aucun champ à mettre à jour fourni." });
            }

            const collectionNames = {
                'pro': 'formationsPro',
                'techno': 'formationsTechno',
                'opt-seconde': 'options-seconde',
                'opt-generale': 'options-generale'
            };

            const { type } = updateFields;

            if (type && !Object.keys(collectionNames).includes(type)) {
                return res.status(400).json({ message: "Le type spécifié est invalide." });
            }

            const collection = db.collection(collectionNames[type]);

            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateFields }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Formation non trouvée." });
            }

            return res.status(200).json({ message: "Formation mise à jour avec succès." });

        } catch (error) {
            return res.status(500).json({ message: "Erreur du serveur : " + error.message });
        }
    }
};

export default patchFormationsController;
