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

            const collectionNames = [
                'formationsPro',
                'formationsTechno',
                'options-seconde',
                'options-generale'
            ];

            for (let collectionName of collectionNames) {
                const collection = await db.collection(collectionName);
                const resultFind = await collection.findOne({ _id: new ObjectId(id) });

                if (resultFind) {
                    const result = await collection.updateOne(
                        { _id: new ObjectId(id) },
                        { $set: updateFields }
                    );
                    return res.status(200).json({ message: "Formation mise à jour avec succès." });
                }
            }
            return res.status(404).json({ message: "Aucune formation trouvée pour cet id" });

        } catch (err) {
            return res.status(500).json({ message: `Erreur du serveur : ${err}` });
        }
    }
};

export default patchFormationsController;
