import connectToDB from "../../functions/connectDb.js";
import { ObjectId } from "mongodb"; // Importer ObjectId

const putContentOrderFormation = {
  putContentOrderFormation: async (req, res) => {
    try {
      const db = await connectToDB();

      const { id } = req.params; // ID de la formation
      const { content } = req.body; // Nouveau tableau d'ordre des contenus

      // Vérification du format du contenu
      if (!Array.isArray(content)) {
        return res
          .status(400)
          .json({ message: "Le contenu doit être un tableau valide." });
      }

      // Définir les collections valides
      const collectionNames = [
        "formationsPro",
        "formationsTechno",
        "options-seconde",
        "options-generale",
      ];

      // Convertir l'ID en ObjectId
      const objectId = new ObjectId(id);

      // Chercher la formation dans toutes les collections
      let found = false;
      for (const collectionName of collectionNames) {
        const collection = db.collection(collectionName);

        // Chercher la formation par son ID
        const formation = await collection.findOne({ _id: objectId });
        if (formation) {
          // Formation trouvée, mise à jour du contenu
          const result = await collection.updateOne(
            { _id: objectId }, // Filtrer par l'ID
            { $set: { content } } // Mettre à jour le tableau `content`
          );

          if (result.modifiedCount > 0) {
            found = true;
            return res
              .status(200)
              .json({ message: "Ordre du contenu modifié avec succès." });
          } else {
            return res
              .status(500)
              .json({ message: "Échec de la mise à jour de l'ordre." });
          }
        }
      }

      // Si aucune formation n'a été trouvée
      if (!found) {
        return res
          .status(404)
          .json({ message: "Formation non trouvée dans les collections." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erreur du serveur : " + error.message });
    }
  },
};

export default putContentOrderFormation;
