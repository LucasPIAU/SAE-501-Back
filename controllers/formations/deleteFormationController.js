import { ObjectId } from 'mongodb';
import connectToDB from '../../functions/connectDb.js';

const deleteFormationsController = {
    deleteFormation: async (req, res) => {
        const { id } = req.params

        const db = connectToDB();

        const collections = await db.listCollections().toArray();
        
        for (let collectionInfo of collections) {
            const collection = database.collection(collectionInfo.name);

            const itemToDelete = await collection.findOne({ _id: new ObjectId(id) });
            
            if (itemToDelete) {
                const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
                console.log(`Item deleted from collection: ${collectionInfo.name}`);
                return;
            }
        }
    }}

export default deleteFormationsController;