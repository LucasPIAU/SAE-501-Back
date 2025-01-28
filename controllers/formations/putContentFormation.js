import connectToDB from "../../functions/connectDb.js";

const putContentFormation = {
    putContentFormation: async (req, res) => {
        try {
            const db = await connectToDB();
    
            const { id } = req.params; // ID de la formation
            const { index, newValue } = req.body; // Index de l'élément et nouvelle valeur
    
            if (index === undefined || newValue === undefined) {
                return res.status(400).json({ message: "Index ou nouvelle valeur manquant." });
            }
    
            const collectionNames = [
                'formationsPro',
                'formationsTechno',
                'options-seconde',
                'options-generale'
            ];
    
            const formationType = req.body.formationType;
            if (!collectionNames.includes(formationType)) {
                return res.status(400).json({ message: "Nom de collection invalide." });
            }
    
            const collection = db.collection(formationType);
    
            const result = await collection.updateOne(
                { _id: id },
                { $set: { [`content.${index}`]: newValue } }
            );
    
            if (result.modifiedCount > 0) {
                return res.status(200).json({ message: "Élément modifié avec succès." });
            } else {
                return res.status(500).json({ message: "Échec de la mise à jour." });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erreur du serveur : " + error.message });
        }
    }
    
};

export default putContentFormation;
