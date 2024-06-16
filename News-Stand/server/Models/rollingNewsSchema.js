import mongoose from "mongoose";
const { Schema } = mongoose;

const rollingNewsSchema = new Schema({
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

const RollingNews = mongoose.model('latestNews', rollingNewsSchema);
export default RollingNews;
