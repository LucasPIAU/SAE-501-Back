import connectToDB from "../../functions/connectDb.js";

const putContentFormation = {
  putContentFormation: async (req, res) => {
    try {
      const db = await connectToDB();

      const { id } = req.params; // ID de la formation depuis l'URL
      const { type, data, formationType } = req.body; // Données envoyées dans le corps de la requête

      // Vérification des données
      if (!type || (type !== "hr" && !data)) {
        return res.status(400).json({ message: "Type ou contenu manquant." });
      }

      // Détermine les collections valides
      const collectionNames = [
        'formationsPro',
        'formationsTechno',
        'options-seconde',
        'options-generale'
      ];

      if (!collectionNames.includes(formationType)) {
        return res.status(400).json({ message: "Nom de collection invalide." });
      }

      const collection = db.collection(formationType);

      // Chercher la formation
      const formation = await collection.findOne({ _id: id });
      if (!formation) {
        return res.status(404).json({ message: "Formation non trouvée." });
      }

      // Ajouter l'élément au tableau `content`
      const newContent = { type, data }; // Élément à insérer
      const result = await collection.updateOne(
        { _id: id }, // Filtrer par ID
        { $push: { content: newContent } } // Ajouter au tableau `content`
      );

      if (result.modifiedCount > 0) {
        return res.status(200).json({ message: "Contenu ajouté avec succès." });
      } else {
        return res.status(500).json({ message: "Échec de la mise à jour." });
      }
    } catch (error) {
      return res.status(500).json({ message: "Erreur du serveur : " + error.message });
    }
  },
};

export default putContentFormation;
