import express from 'express';
import auth from '../middleware/auth.js';
import getFormationsController from '../controllers/getFormationsController.js';
import dataValidator from '../middleware/dataValidator.js';
import addFormationsController from '../controllers/addFormationsController.js';
import patchFormationsController from '../controllers/patchFormationsController.js';

const formationRoutes = express();

// Exemple de format JSON d'une formation dans la base de donnée
{
    id: "String"
    name: "String"
    filière: "String" // Générale et technologique ou professionel
    data: "Array<Object>" // Le format de la data dépend de la filière
    etablissement: "Array<String>" // List d'ids des établissement
    flyerLink: "String" // Id du flyer correspondant
}

// Routes GET
formationRoutes.get('/all', getFormationsController.getAllFormations);

formationRoutes.get('/pro', getFormationsController.getProFormations);

formationRoutes.get('/techno', getFormationsController.getTechnoFormations);

formationRoutes.get('/opt/seconde', getFormationsController.getOptSeconde);

formationRoutes.get('/opt/generale', getFormationsController.getOptGenerale);

formationRoutes.get('/:id', getFormationsController.getFormationById);

// Routes PUT

formationRoutes.put('/:id', [auth], async (req, res) => {
    const { id } = req.params;
    try {
        // Modification de la formation avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la modification d'une formation : ${err}` });
    }
});

// Routes POST

formationRoutes.post('/add', [auth, dataValidator],addFormationsController.addFormation); 

// Routes DELETE

formationRoutes.delete('/:id', [auth], async (req, res) => {
    const { id } = req.params;
    try {
        // Suppression de la formation avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la suppression d'une formation : ${err}` });
    }
});
//Routes patch

formationRoutes.patch('/patch/:id', [auth, dataValidator], patchFormationsController.patchFormation);
export default formationRoutes;
