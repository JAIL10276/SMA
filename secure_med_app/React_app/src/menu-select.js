import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import TopBar from "./top-bar";
const MenuSelect = () => {
  const navigate = useNavigate();
  return (
        <>
        {/*<TopBar/>*/}
        <div className="menu-select">
        <h2>Select Menu</h2>

        <div className="button-container">
            
            {/* Authenticate */}
            <button className="menu-button" onClick={() => navigate("/scan-qr")}>
                <img
                className="menu-icon"
                src="/Assets/QRicon.svg"
                alt="QR Authentication Icon"
                />
                <h3 style={{ color: "white", fontSize: "2em" }}>Authenticate</h3>
                 
            
            </button>
            {/* Patient Data */}
            <button className="menu-button" onClick={() => navigate("/patient")}>
            <img
                className="menu-icon"
                src="/Assets/patient-data-icon.svg"
                alt="Patient Data Icon"
            />
            <h3 style={{ color: "white", fontSize: "2em" }}>Patient Data</h3>
            </button>
            {/* Key */}
            <button className="menu-button" onClick={() => navigate("")}>
            <img
                className="menu-icon"
                src="/Assets/key.svg"
                alt="Key Icon"
            />
            <h3 style={{ color: "white", fontSize: "2em" }}>Key</h3>
            </button>

            {/* Settings */}
            <button className="menu-button" onClick={() => navigate("")}>
            <img
                className="menu-icon"
                src="/Assets/Gear.svg"
                alt="Settings Icon"
            />
            <h3 style={{ color: "white", fontSize: "2em" }}>Settings</h3>
            </button>

            
        </div>
        </div>
        </>
  );
};

export default MenuSelect;
