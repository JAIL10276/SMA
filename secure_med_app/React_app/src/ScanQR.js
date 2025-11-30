import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import CameraSelector from "./CameraHandler";

const ScanQR = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* App logo header */}
      <div className="SMD_logo" style={{ marginBottom: "20px" }}>
        <h1 className="SMD_text">SMD</h1>
        <img
          className="medical-symbol-small"
          src="/Assets/Medical-Symbol.svg"
          alt="Medical Symbol"
        />
      </div>

      {/* QR Scanner Section */}
      <div
        className="ScanQR_Container"
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        <h3>Please scan the QR code to authenticate.</h3>
        <CameraSelector />
      </div>
    </div>
  );
};

export default ScanQR;
