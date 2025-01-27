export default (req, res, next) => {
    const method = req.method;
    const allowedKeys = ['name', 'adresse', 'Latitude', 'Longitude', 'tel', 'website'];

    const unexpectedKeys = Object.keys(req.body).filter(key => !allowedKeys.includes(key));
    if (unexpectedKeys.length > 0) {
        return res.status(400).json({ message: `Les valeurs suivantes ne sont pas attendues : ${unexpectedKeys.join(', ')}.` });
    }

    const { name, adresse, Latitude, Longitude, tel, website } = req.body;

    if (method === "POST") {
        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Le champ "name" doit être une chaîne valide.' });
        }

        if (typeof adresse !== 'string' || adresse.trim() === '') {
            return res.status(400).json({ message: 'Le champ "adresse" doit être une chaîne valide.' });
        }

        if (typeof Latitude !== 'number' ) {
            return res.status(400).json({ message: 'Le champ "Latitude" doit être un nombre valide.' });
        }

        if (typeof Longitude !== 'number' ) {
            return res.status(400).json({ message: 'Le champ "Longitude" doit être un nombre valide.' });
        }

        if (typeof tel !== 'string' || tel.trim() === '') {
            return res.status(400).json({ message: 'Le champ "tel" doit être une chaine valide.' });
        }

        if (typeof website !== 'string' || website.trim() === '') {
            return res.status(400).json({ message: 'Le champ "website" doit être une chaine valide.' });
        }
    } else if (method === "PATCH") {
        if ("name" in req.body && (typeof name !== 'string' || name.trim() === '')) {
            return res.status(400).json({ message: 'Le champ "name" doit être une chaîne valide.' });
        }

        if ("adresse" in req.body && (typeof adresse !== 'string' || adresse.trim() === '')) {
            return res.status(400).json({ message: 'Le champ "adresse" doit être une chaîne valide.' });
        }

        if ("Latitude" in req.body && typeof Latitude !== 'number' ) {
            return res.status(400).json({ message: 'Le champ "Latitude" doit être un nombre valide.' });
        }

        if ("Longitude" in req.body && typeof Longitude !== 'number') {
            return res.status(400).json({ message: 'Le champ "Longitude" doit être un nombre valide.' });
        }

        if ("tel" in req.body && (typeof tel !== 'string' || tel.trim() === '')) {
            return res.status(400).json({ message: 'Le champ "tel" doit être une chaine valide.' });
        }

        if ("website" in req.body && (typeof website !== 'string' || website.trim() === '')) {
            return res.status(400).json({ message: 'Le champ "website" doit être une chaine valide.' });
        }
        
    } else if (method == "DELETE") {
        if (!"id" in req.params || typeof req.params.id !== 'string' || req.params.id.trim() === "") {
            return res.status(400).json({ message: "L'id est obligatoire et doit être une chaîne valide." })
        }
    }
    next();
};
