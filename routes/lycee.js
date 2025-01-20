import express from 'express';
import auth from '../middleware/auth.js';
import lyceeValidator from '../middleware/lyceeValidator.js';
import getEtablissementController from '../controllers/etablissements/getEtablissementController.js';
import patchEtablissementController from '../controllers/etablissements/patchEtablissementController.js';

const lyceeRoutes = express();

// Routes GET

lyceeRoutes.get('/', getEtablissementController.getLycee);
lyceeRoutes.get('/:id', getEtablissementController.getLyceeById);

// Routes Patch

lyceeRoutes.get('/edit/:id', [auth, lyceeValidator], patchEtablissementController.patchLycee);

// Routes POST

lyceeRoutes.post('/add', [auth, lyceeValidator], async (req, res) => {
    try {
        // Création d'un lycée' avec les données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la création d'un lycée : ${err}` });
    }
});

// Routes DELETE
lyceeRoutes.delete('/:id', [auth, lyceeValidator], async (req, res) => {
    const { id } = req.params;
    try {
        // Suppression dun lycée avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la suppression d'un lycée : ${err}` });
    }
});

export default lyceeRoutes;
