import mongoose from "mongoose";
const { Schema } = mongoose;

const newsSchema = new Schema({
    _id: String,
    pressName: String,
    logoImageSrc: String,
    editedTime: String,
    category: String,
    headline: {
        thumbnailSrc: String,
        title: String,
        href: String
    },
    sideNews: [{
        title: String,
        href: String
    }]
});

const News = mongoose.model('News', newsSchema);
export default News;
