const serverURL = process.env.REACT_APP_SERVER;

export const APIManager = {
    async getNewsData(tableName) {
        const news = await fetch(serverURL + tableName);
        const data = await news.json();
        return data;
    },

    async postNewsData(pressInfo) {
        await fetch(serverURL + "subscribeInfo", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(pressInfo),
        });
    },
    async deleteNewsData(pressName) {
        try {
            await fetch(serverURL + `subscribeInfo/${pressName}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(error);
        }
    },
};
