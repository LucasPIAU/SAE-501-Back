import connectToDB from "../../functions/connectDb.js";
import { ObjectId } from "mongodb";

const patchEtablissementController = {
    patchLycee: async (req, res)=>{
        try {
            const db = await connectToDB();

            const { id } = req.params;
            const updateFields = req.body;

            if (!id) {
                return res.status(400).json({ message: "L'identifiant (id) est requis." });
            }

            const collection = db.collection("etablissements");

            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateFields }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Etablissement non trouvée." });
            }

            return res.status(200).json({ message: "Etablissement mis à jour avec succès." });

        } catch (error) {
            return res.status(500).json({ message: "Erreur du serveur : " + error.message });
        }

    }
}

export default patchEtablissementController