import express from 'express';
import auth from '../middleware/auth.js';
import connectToDB from '../functions/connectDb.js';

const lyceeRoutes = express();

// Routes GET
lyceeRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Récupération d'un lycée
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue dans la récupération d'un lycée : ${err}` });
    }
});

lyceeRoutes.get('', async (req, res) => {
    try {
        // On se connect à la base de donnée et on récupère la collection établissements
        const db = await connectToDB();
        const collectionEtablissements = db.collection('etablissements');

        // On fait la requête pour récupérer la liste de toute les établissements
        const cursor = collectionEtablissements.find();
        const etablissements = await cursor.toArray();

        // Une fois qu'on as tout récupérer on renvoie les données
        if(etablissements.length > 0) res.status(200).json(etablissements);
        else res.status(404).json({message: "Aucun établissement trouvé"});

        // Récupération de la liste de tout les lycées
        // res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({message: `Une erreur interne est survenue dans la récupération des lycées : ${err}`});
    }
});

// Routes PUT
lyceeRoutes.put('/:id', [auth], async (req, res) => {
    const { id } = req.params;
    try {
        // Modification d'un lycée avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la modification d'un lycée : ${err}` });
    }
});

// Routes POST

lyceeRoutes.post('/add', [auth, lyceeValidator], postEtablissementController.addLycee);

// Routes DELETE
lyceeRoutes.delete('/:id', [auth],deleteEtablissementController.deleteLycee);

export default lyceeRoutes;