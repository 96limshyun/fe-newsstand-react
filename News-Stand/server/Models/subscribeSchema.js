import mongoose from "mongoose";
const { Schema } = mongoose;

const subscribeSchema = new Schema({
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

const SubscribeList = mongoose.model('Subscribe', subscribeSchema);
export default SubscribeList;
