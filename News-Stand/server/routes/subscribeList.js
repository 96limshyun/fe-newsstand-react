import express from 'express';
import SubscribeList from '../Models/subscribeSchema.js';

const subscribeRouter = express.Router();

subscribeRouter.get("/subscribeInfo", async(req, res) => {
    try {
        const subscribeData = await SubscribeList.find();
        res.json(subscribeData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

subscribeRouter.post('/subscribeInfo', async (req, res) => {
    try {
        const selectData = req.body;
        const newSubscriber = new SubscribeList(selectData);
        await newSubscriber.save();
        res.status(201).json({ message: "구독자 추가 성공", data: newSubscriber });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

subscribeRouter.delete('/subscribeInfo/:pressName', async (req, res) => {
    const pressName = req.params.pressName;
    try {
        const result = await SubscribeList.deleteMany({ pressName: pressName });
        res.json({ message: `Successfully deleted documents with pressName: ${pressName}`, result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default subscribeRouter;