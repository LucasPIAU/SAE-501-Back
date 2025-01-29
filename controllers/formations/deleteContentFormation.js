import connectToDB from "../../functions/connectDb.js";

const deleteContentFormation = {
    deleteContent: async (req, res) => {
        try {
            const db = await connectToDB();
    
            const { id } = req.params; // ID de la formation
            const { index } = req.body; // Index de l'élément à supprimer
    
            if (index === undefined) {
                return res.status(400).json({ message: "Index manquant." });
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
                { $unset: { [`content.${index}`]: "" } } // Supprime l'élément
            );
    
            if (result.modifiedCount > 0) {
                // Réorganise le tableau pour supprimer l'espace vide
                await collection.updateOne(
                    { _id: id },
                    { $pull: { content: null } }
                );
                return res.status(200).json({ message: "Élément supprimé avec succès." });
            } else {
                return res.status(500).json({ message: "Échec de la suppression." });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erreur du serveur : " + error.message });
        }
    }
    
};

export default deleteContentFormation;
