import React, { useEffect, useRef, useState} from "react";

import HomeView from "./HomeView";
import ScanQR from "./ScanQR";
import "./App.css";

const MainPage = () => {
    const [activeView, setActiveView] = useState("home");
    const renderContent = () => {
        console.log(activeView);
        switch (activeView) {
            case "home":
                return <HomeView setActiveView={setActiveView} />;
            case "ScanQR":
                return <ScanQR setActiveView={setActiveView} />;
            default:
                return <HomeView setActiveView={setActiveView} />
        }
    };
    return (
        console.log("Rendering", activeView),
        <div key={activeView} className="fade-container">
            {renderContent()}
        </div>
        
    );
};
export default MainPage;