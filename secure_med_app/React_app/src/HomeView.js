import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { motion } from "framer-motion";
const HomeView = () => {
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate("/menu");

    }
    return (
    
            <div id="main_frame"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    textAlign: "center",
                    
                }}
            >
                {/* Navigation Buttons */}
                <div id="navigation_buttons" style={{ marginBottom: "20px" }}>
                    <h1>Secure Medical App</h1> 
                    <img className="medical-symbol"  src="/Assets/Medical-Symbol.svg"/>

                </div>
                {/*<div
                    ref={mountRef}
                    style={{
                        width: "300px",
                        height: "300px",
                        
                    }}
                    
                >
                <ModelViewer/>
                </div>*/}
                
                <button
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        fontSize: "20px",
                        cursor: "pointer",
                        
                    }}
                    onClick={() => { handleNavigate() }}
                    id = "QRButton"
                >
                    Get Started!
                </button>
                
                    
            </div>
       
    );
};

export default HomeView;