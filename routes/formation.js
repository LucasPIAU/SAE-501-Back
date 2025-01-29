import express from 'express';
import auth from '../middleware/auth.js';
import getFormationsController from '../controllers/formations/getFormationsController.js';
import formationValidator from '../middleware/formationValidator.js';
import postFormationsController from '../controllers/formations/postFormationsController.js';
import patchFormationsController from '../controllers/formations/patchFormationsController.js';
import deleteFormationsController from '../controllers/formations/deleteFormationController.js';
import postContentFormation from '../controllers/formations/postContentFormation.js';
import putContentFormation from '../controllers/formations/putContentFormation.js';
import putContentOrderFormation from '../controllers/formations/putContentOrderFormation.js';

const formationRoutes = express();

// Routes GET
formationRoutes.get('/all', getFormationsController.getAllFormations);

formationRoutes.get('/pro', getFormationsController.getProFormations);

formationRoutes.get('/techno', getFormationsController.getTechnoFormations);

formationRoutes.get('/opt/seconde', getFormationsController.getOptSeconde);

formationRoutes.get('/opt/generale', getFormationsController.getOptGenerale);

formationRoutes.get('/:id', getFormationsController.getFormationById);

// Routes POST

formationRoutes.post('/add', [auth, formationValidator], postFormationsController.addFormation);

// Routes DELETE

formationRoutes.delete('/:id', [auth], deleteFormationsController.deleteFormation);

//Routes patch

formationRoutes.patch('/edit/:id', [auth, formationValidator], patchFormationsController.patchFormation);

//Routes post create un content d'une formation

formationRoutes.post('/add/:id/content', [auth], postContentFormation.postContentFormation);

//Routes put edit d'un content d'une formation

formationRoutes.put('/edit/:id/content', [auth], putContentFormation.putContentFormation);

//Routes put edit d'un content d'une formation

formationRoutes.put('/edit/:id/contentOrder', [auth], putContentOrderFormation.putContentOrderFormation);

export default formationRoutes;