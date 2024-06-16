import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import latestNews from "./latestNews.json" assert { type: "json" };
import newsData from "./news.json" assert { type: "json" };
import newsRouter from "./routes/news.js";
import latestNewsRouter from "./routes/latestNews.js";
import subscribeRouter from "./routes/subscribeList.js";
import News from "./Models/newsSchema.js";
import RollingNews from "./Models/rollingNewsSchema.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/', newsRouter);
app.use('/', latestNewsRouter);
app.use('/', subscribeRouter);

mongoose.connect(process.env.MongoDB)
    .then(() => console.log("연결완료"))
    .catch(() => console.log("실패"));

    const db = mongoose.connection;
    db.on('error', function(){
        console.log('Connection Failed!');
    });
    
    db.once('open', async function() {
        console.log('Connected!');
        await initDB();
    });
    
    const initDB = async () => {
    try {
        const dbCount = await News.countDocuments();
        const latestDbCount = await RollingNews.countDocuments();

        if (dbCount === 0) await News.insertMany(newsData.news);
        if (latestDbCount === 0) await RollingNews.insertMany(latestNews.news);
    } catch (error) {
        console.error(error);
    }
}

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
