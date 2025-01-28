const putContentOrderFormation = {
    putContentOrderFormation: async (req, res) => {
        try {
            const db = await connectToDB();
    
            const { id } = req.params; // ID de la formation
            const { content } = req.body; // Nouveau tableau d'ordre des contenus
    
            if (!Array.isArray(content) || content.length === 0) {
                return res.status(400).json({ message: "Le contenu doit être un tableau valide." });
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
                { $set: { content } }
            );
    
            if (result.modifiedCount > 0) {
                return res.status(200).json({ message: "Ordre du contenu modifié avec succès." });
            } else {
                return res.status(500).json({ message: "Échec de la mise à jour de l'ordre." });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erreur du serveur : " + error.message });
        }
    }
};

export default putContentOrderFormation;
