import connectToDB from "../../functions/connectDb.js";

const postEtablissementController = {
    addLycee: async (req, res) => {
        try {
            const db = await connectToDB();;

            const collection = await db.collection("etablissements");

            const data = req.body

            const result = await collection.insertOne(data);

            if (result.acknowledged) {
                data._id = result.insertedId;
                return res.status(201).json({ message: 'Etablissement ajouté avec succès', data: data });
            } else {
                return res.status(500).json({ message: 'Erreur lors de l\'ajout de la formation' });
            }
        } catch (err) {
            return res.status(500).json({ message: `L'erreur suivante est renvoyée par le serveur : ${err} ` });
        }
    }
}

export default postEtablissementController;