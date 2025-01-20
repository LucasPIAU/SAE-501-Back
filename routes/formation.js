import express from 'express';
import auth from '../middleware/auth.js';
import getFormationsController from '../controllers/formations/getFormationsController.js';
import formationValidator from '../middleware/formationValidator.js';
import addFormationsController from '../controllers/formations/addFormationsController.js';
import patchFormationsController from '../controllers/formations/patchFormationsController.js';
import deleteFormationsController from '../controllers/formations/deleteFormationController.js';

const formationRoutes = express();

// Routes GET
formationRoutes.get('/all', getFormationsController.getAllFormations);

formationRoutes.get('/pro', getFormationsController.getProFormations);

formationRoutes.get('/techno', getFormationsController.getTechnoFormations);

formationRoutes.get('/opt/seconde', getFormationsController.getOptSeconde);

formationRoutes.get('/opt/generale', getFormationsController.getOptGenerale);

formationRoutes.get('/:id', getFormationsController.getFormationById);

// Routes POST

formationRoutes.post('/add', [auth, formationValidator], addFormationsController.addFormation);

// Routes DELETE

formationRoutes.delete('/:id', [auth, formationValidator], deleteFormationsController.deleteFormation);

//Routes patch

formationRoutes.patch('/patch/:id', [auth, formationValidator], patchFormationsController.patchFormation);

export default formationRoutes;
