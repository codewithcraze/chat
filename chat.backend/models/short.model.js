import mongoose from 'mongoose';


const shortURLSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    originalURL: {
        type: String,
        required: true,
    }
}, {
    collection: "shorts",
    timestamps: true,
});


const ShortURL = mongoose.models.ShortURL || mongoose.model("ShortURL", shortURLSchema);


export default ShortURL;