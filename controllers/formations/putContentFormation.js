import connectToDB from "../../functions/connectDb.js";
import { ObjectId } from 'mongodb'; // Importer ObjectId

const putContentFormation = {
    putContentFormation: async (req, res) => {
        try {
            const db = await connectToDB();
    
            const { id } = req.params; // ID de la formation
            const { index, newValue } = req.body; // Index de l'élément et nouvelle valeur
    
            // Vérification de l'index et de la nouvelle valeur
            if (index === undefined || newValue === undefined) {
                return res.status(400).json({ message: "Index ou nouvelle valeur manquant." });
            }
    
            // Assurer que newValue est bien une chaîne de caractères
            if (typeof newValue !== 'string') {
                return res.status(400).json({ message: "La nouvelle valeur doit être une chaîne de caractères." });
            }
    
            // Détermine les collections valides
            const collectionNames = [
                'formationsPro',
                'formationsTechno',
                'options-seconde',
                'options-generale'
            ];
    
            // Convertir l'ID en ObjectId
            const objectId = new ObjectId(id);
    
            // Chercher la formation dans toutes les collections
            let found = false;
            for (const collectionName of collectionNames) {
                const collection = db.collection(collectionName);
                
                // Chercher la formation par son ID dans chaque collection
                const formation = await collection.findOne({ _id: objectId });
                if (formation) {
                    // Vérifier que l'index est valide (dans le tableau `content`)
                    if (index < 0 || index >= formation.content.length) {
                        return res.status(400).json({ message: "Index invalide." });
                    }

                    // Mettre à jour uniquement le champ `data` de l'élément spécifié par `index`
                    const updatedContent = {
                        ...formation.content[index],  // Garde l'ancien contenu (type)
                        data: newValue                  // Remplace uniquement le champ `data`
                    };

                    // Modifier le contenu à l'index spécifié
                    const result = await collection.updateOne(
                        { _id: objectId },
                        { $set: { [`content.${index}`]: updatedContent } }
                    );
    
                    if (result.modifiedCount > 0) {
                        found = true;
                        return res.status(200).json({ message: "Élément modifié avec succès." });
                    } else {
                        return res.status(500).json({ message: "Échec de la mise à jour." });
                    }
                }
            }
    
            // Si aucune formation n'a été trouvée dans les collections
            if (!found) {
                return res.status(404).json({ message: "Formation non trouvée dans les collections." });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erreur du serveur : " + error.message });
        }
    }
};

export default putContentFormation;
