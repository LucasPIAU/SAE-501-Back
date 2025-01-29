import express from 'express';
import auth from '../middleware/auth.js';
import lyceeValidator from '../middleware/lyceeValidator.js';
import getEtablissementController from '../controllers/etablissements/getEtablissementController.js';
import patchEtablissementController from '../controllers/etablissements/patchEtablissementController.js';
import deleteEtablissementController from '../controllers/etablissements/deleteEtablissementController.js';
import postEtablissementController from '../controllers/etablissements/postEtablissementController.js';

const lyceeRoutes = express();

// Routes GET

lyceeRoutes.get('/', getEtablissementController.getLycee);
lyceeRoutes.get('/:id', getEtablissementController.getLyceeById);

// Routes Patch

lyceeRoutes.patch('/edit/:id', [auth, lyceeValidator], patchEtablissementController.patchLycee);

// Routes POST

lyceeRoutes.post('/add', [auth, lyceeValidator], postEtablissementController.addLycee);

// Routes DELETE
lyceeRoutes.delete('/:id', [auth],deleteEtablissementController.deleteLycee);

export default lyceeRoutes;