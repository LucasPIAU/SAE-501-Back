import connectToDB from "../../functions/connectDb.js";
import generateContent from "../../functions/generateContent.js";

const addFormationsController = {
  addFormation: async (req, res) => {
    try {
      const db = await connectToDB();

      const { type } = req.body;

      const collectionNames = {
        "pro": "formationsPro",
        "techno": "formationsTechno",
        "opt-seconde": "options-seconde",
        "opt-generale": "options-generale",
      };

      if (!Object.keys(collectionNames).includes(type)) {
        return res.status(400).json({ message: "Nom de collection invalide" });
      }

      const collection = db.collection(collectionNames[type]);

      const data = req.body;
      const content = generateContent(data);

      if (!data.content) {
        data.content = [];
      }
      data.content = content;
      const result = await collection.insertOne(data);

      if (result.acknowledged) {
        return res
          .status(201)
          .json({
            message: "Formation ajoutée avec succès",
            id: result.insertedId,
            data: req.body,
          });
      } else {
        return res
          .status(500)
          .json({ message: "Erreur lors de l'ajout de la formation" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erreur du serveur : " + error.message });
    }
  },
};

export default addFormationsController;
