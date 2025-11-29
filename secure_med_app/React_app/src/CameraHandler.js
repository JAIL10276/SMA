import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./App.css";

function CameraSelector() {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [qrScanner, setQrScanner] = useState(null);

  // 🔍 Load cameras once when the component mounts
  useEffect(() => {
    async function getCameras() {
      try {
        // Ask for permission first (so labels appear)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());

        const devices = await Html5Qrcode.getCameras();
        const filtered = devices.filter(d => d.id !== "default"); // ignore "default"
        setCameras(filtered);
        if (filtered.length > 0) setSelectedCamera(filtered[0].id);
      } catch (err) {
        console.error("Camera detection failed:", err);
        alert("Could not access cameras. Please allow permission and refresh.");
      }
    }

    getCameras();

    return () => {
      if (qrScanner) {
        qrScanner.stop().catch(() => {});
        qrScanner.clear().catch(() => {});
      }
    };
  }, [qrScanner]);

  // 🎥 Start scanning using selected camera
  const startScanning = async () => {
    if (!selectedCamera) return alert("Select a camera first.");
    const scanner = new Html5Qrcode("reader");
    setQrScanner(scanner);

    try {
      await scanner.start(
        selectedCamera,
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          console.log("✅ QR detected:", decodedText);
          alert(`QR Code: ${decodedText}`);
        },
        (err) => console.warn("Scan error:", err)
      );
    } catch (err) {
      console.error("Unable to start camera:", err);
    }
  };

  // 🧹 Stop scanning
  const stopScanning = async () => {
    if (qrScanner) {
      await qrScanner.stop();
      await qrScanner.clear();
      setQrScanner(null);
    }
  };

  return (
    
    <div className="qr-container" style={{ textAlign: "center" }}>
      <div id="reader" style={{ width: "500px", margin: "20px auto" }}></div>
      <object className="QR-icon" type="image/svg+xml" data="/assets/QRicon.svg"></object>
      <div className="selector">
        <label htmlFor="cameraSelect" style={{ marginRight: "10px" }}>Select Camera:</label>
        <select
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
          style={{ padding: "6px", minWidth: "200px" }}
        >
          {cameras.map((cam) => (
            <option key={cam.id} value={cam.id}>
              {cam.label || `Camera (${cam.id})`}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button className="scanner-state-button" onClick={startScanning} disabled={!selectedCamera || qrScanner}>
          Start
        </button>
        <button className="scanner-state-button" onClick={stopScanning} disabled={!qrScanner} style={{ marginLeft: "10px" }}>
          Stop
        </button>
      </div>

      <div id="reader" style={{ width: "500px", margin: "20px auto" }}></div>
    </div>
  );
}

export default CameraSelector;
