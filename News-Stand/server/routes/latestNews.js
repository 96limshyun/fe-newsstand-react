import express from 'express';
import RollingNews from '../Models/rollingNewsSchema.js';

const latestNewsRouter = express.Router();

latestNewsRouter.get("/latestNews", async(req, res) => {
    try {
        const latestData = await RollingNews.find();
        res.json(latestData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default latestNewsRouter;