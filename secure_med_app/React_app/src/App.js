import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css';
import { Suspense, useEffect, lazy } from "react";
import PageTransition from "./page-transition";
import MainPage from './main_page';
import Loading from "./Loading";
const HomeView = lazy(() => import("./HomeView"));
const MenuSelect = lazy(() => import("./menu-select"));
const ScanQR = lazy(() => import("./ScanQR"));


function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

}, [location.pathname]);

  return (
      <Suspense fallback={<Loading/>}>
        <AnimatePresence mode="wait">
        
            <Routes>
              <Route path="/" element={<PageTransition><Navigate to="/get-started" replace /></PageTransition>} />
              <Route path="/get-started" element={<PageTransition><HomeView /></PageTransition>} />
              <Route path="/scan-qr" element={<PageTransition><ScanQR /></PageTransition>} />
              <Route path="/menu" element={<PageTransition><MenuSelect /></PageTransition>} />
            </Routes>
        
        </AnimatePresence>
      </Suspense>
  )};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <AnimatedRoutes />
        </Router>
      </header>
    </div>
  );
}



export default App;
