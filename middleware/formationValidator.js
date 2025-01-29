export default (req, res, next) => {
    const method = req.method;
    const allowedKeys = ['name', 'description', 'type', 'etablissement', 'data', 'link', 'images'];

    const unexpectedKeys = Object.keys(req.body).filter(key => !allowedKeys.includes(key));
    if (unexpectedKeys.length > 0) {
        return res.status(400).json({ message: `Les valeurs suivantes ne sont pas attendues : ${unexpectedKeys.join(', ')}.` });
    }

    const { name, type, description } = req.body;

    if (method === "POST") {
        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Le champ "name" est obligatoire et doit être une chaîne valide.' });
        }

        if (typeof type !== 'string' || !['pro', 'techno', 'opt-seconde', 'opt-generale'].includes(type)) {
            return res.status(400).json({ message: 'Le champ "type" doit être l\'une des valeurs suivantes : "pro", "techno", "opt-seconde", "generale".' });
        }

        if (typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ message: 'Le champ "description" est obligatoire et doit être une chaîne valide.' });
        }
    } else if (method === "PATCH") {
        if ("name" in req.body && (typeof name !== 'string' || name.trim() === '')) {
            return res.status(400).json({ message: 'Le champ "name" doit être une chaîne valide.' });
        }

        if ("type" in req.body && (typeof type !== 'string' || !['pro', 'techno', 'opt-seconde', 'opt-generale'].includes(type))) {
            return res.status(400).json({ message: 'Le champ "type" doit être l\'une des valeurs suivantes : "pro", "techno", "opt-seconde", "opt-generale".' });
        }

        if ("description" in req.body && (typeof description !== 'string' || description.trim() === '')) {
            return res.status(400).json({ message: 'Le champ "description" doit être une chaîne valide.' });
        }
        
    }
    next();
};
