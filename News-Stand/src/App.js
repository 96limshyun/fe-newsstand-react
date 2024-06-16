import React from "react";
import Header from "./components/Header/Header";
import RollingNews from "./components/RollingNewsView/RollingNews";
import MainView from "./components/MainView/MainView";

const App = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="w-1000 mx-auto">
                <Header />
                <RollingNews />
                <MainView />
            </div>
        </div>
    );
};

export default App;
