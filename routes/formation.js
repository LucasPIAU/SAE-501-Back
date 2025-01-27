import express from 'express';
import auth from '../middleware/auth.js';
import getFormationsController from '../controllers/formations/getFormationsController.js';
import formationValidator from '../middleware/formationValidator.js';
import postFormationsController from '../controllers/formations/postFormationsController.js';
import patchFormationsController from '../controllers/formations/patchFormationsController.js';
import deleteFormationsController from '../controllers/formations/deleteFormationController.js';

const formationRoutes = express();

// Routes GET

formationRoutes.get('/all', async (req, res) => {
    try {
        const db = await connectToDB();

        const collectionFormationsPro = db.collection('formationsPro');
        const collectionFormationsTechno = db.collection('formationsTechno');
        const collectionOptionsSeconde = db.collection('optionSeconde');
        const collectionOptionsGenerale = db.collection('formationsGenerale');

        const formationsPro = await collectionFormationsPro.find().toArray();
        const formationsTechno = await collectionFormationsTechno.find().toArray();
        const optionsSeconde = await collectionOptionsSeconde.find().toArray();
        const optionsGenerale = await collectionOptionsGenerale.find().toArray();

        if (
            formationsPro.length > 0 ||
            formationsTechno.length > 0 ||
            optionsSeconde.length > 0 ||
            optionsGenerale.length > 0
        ) {
            res.status(200).json({
                formationsPro,
                formationsTechno,
                optionsSeconde,
                optionsGenerale
            });
        } else {
            res.status(404).json({ message: "Aucune formation trouvée dans les collections" });
        }
    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue lors de la récupération des formations : ${err.message}` });
    }
});

formationRoutes.get('/pro', async (req, res) => {
    try {
        const db = await connectToDB();
        const collectionFormations = db.collection('formationsPro');

        const formations = await collectionFormations.find().toArray();

        if (formations.length > 0) {
            res.status(200).json(formations);
        } else res.status(404).json({ message: "Aucune formations trouvée" });

    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
    }
});

formationRoutes.get('/techno', async (req, res) => {
    try {
        const db = await connectToDB();
        const collectionFormations = db.collection('formationsTechno');

        const formations = await collectionFormations.find().toArray();

        if (formations.length > 0) {
            res.status(200).json(formations);
        } else res.status(404).json({ message: "Aucune formations trouvée" });

    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
    }
});

formationRoutes.get('/opt/seconde', async (req, res) => {
    try {
        const db = await connectToDB();
        const collectionFormations = db.collection('option-seconde');

        const formations = await collectionFormations.find().toArray();

        if (formations.length > 0) {
            res.status(200).json(formations);
        } else res.status(404).json({ message: "Aucune formations trouvée" });

    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
    }
});

formationRoutes.get('/opt/generale', async (req, res) => {
    try {
        const db = await connectToDB();
        const collectionFormations = db.collection('option-generale');

        const formations = await collectionFormations.find().toArray();

        if (formations.length > 0) {
            res.status(200).json(formations);
        } else res.status(404).json({ message: "Aucune formations trouvée" });

formationRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // On se connect à la base de donnée et on récupère la collection formations
        const db = await connectToDB();
        const collectionFormations = db.collection('Formations');

        // On fait la requêtes pour récupérer la formation qui correspond à l'id passer en paramètre
        if (id) {
            const query = { '_id': new ObjectId(id) };
            console.log(query);
            const formation = await collectionFormations.findOne(query);
            if (formation) res.status(200).json(formation);
            else res.status(404).json({ message: "Aucune formation trouvé pour cet id" });
        } else throw "L'id de la formations est obligatoire";
    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue dans la récupération d'une formation : ${err}` });
    }
});

// Routes POST

formationRoutes.post('/add', [auth, formationValidator], postFormationsController.addFormation);

// Routes DELETE

formationRoutes.delete('/:id', [auth], deleteFormationsController.deleteFormation);

//Routes patch

formationRoutes.patch('/edit/:id', [auth, formationValidator], patchFormationsController.patchFormation);

export default formationRoutes;