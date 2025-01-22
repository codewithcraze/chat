import { ShortURL } from '../models/index.js';

export const saveShortURL = async (url, urlCode) => {
    try {
        // Create an instance of the ShortURL model
        const newShortURL = new ShortURL({
            originalURL: url,
            shortId: urlCode
        });

        // Save the instance to the database
        const savedShortURL = await newShortURL.save();
        return savedShortURL;
    } catch (error) {
        console.error('Error saving short URL:', error);
        throw error; // You may want to throw or handle the error as needed
    }
};


export const findShortURL = async(shortId) => {
    try {
        // Find the short URL document in the database by its shortId
        const foundShortURL = await ShortURL.findOne({ shortId });
        return foundShortURL;
    } catch (error) {
        console.error('Error finding short URL:', error);
        throw error; // You may want to throw or handle the error as needed
    }
}
