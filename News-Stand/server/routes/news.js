import express from 'express';
import News from '../Models/newsSchema.js';

const newsRouter = express.Router();

newsRouter.get('/news', async (req, res) => {
    try {
        const newsData = await News.find();
        res.json(newsData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default newsRouter;