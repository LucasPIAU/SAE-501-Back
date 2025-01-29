import connectToDB from "../../functions/connectDb.js";
import { ObjectId } from 'mongodb'; // Importer ObjectId

const postContentFormation = {
  postContentFormation: async (req, res) => {
    try {
      const db = await connectToDB();

      const { id } = req.params; // ID de la formation depuis l'URL
      const { formationId, newElement } = req.body; // Récupère la formationId et newElement de req.body
      const { type, data } = newElement || {}; 

      // Vérification des données
      if (!type || (type !== "hr" && !data)) {
        return res.status(400).json({ message: "Type ou contenu manquant.", data: newElement, data2: data, data3: type });
      }

      // Détermine les collections valides
      const collectionNames = [
        'formationsPro',
        'formationsTechno',
        'options-seconde',
        'options-generale'
      ];

      const objectId = new ObjectId(id);

      // Chercher la formation dans toutes les collections
      let found = false;
      for (const collectionName of collectionNames) {
        const collection = db.collection(collectionName);
        
        // Chercher la formation par son ID dans chaque collection
        const formation = await collection.findOne({ _id: objectId });
        if (formation) {
          // Formation trouvée, ajout du contenu
          const newContent = { type, data }; // Élément à insérer
          const result = await collection.updateOne(
            { _id: objectId }, // Filtrer par ID
            { $push: { content: newContent } } // Ajouter au tableau `content`
          );

          if (result.modifiedCount > 0) {
            found = true;
            return res.status(200).json({ message: "Contenu ajouté avec succès.", data:  formation});
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

export default postContentFormation;
