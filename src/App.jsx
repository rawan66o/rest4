import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import Header from "./components/Main/Header/Header";
import Hero from "./components/Main/Hero/Hero";
import Categories from "./components/Main/Categories/Categories";
import PopularMeals from "./components/Main/PopularMeals/PopularMeals";
import Footer from "./components/Main/Footer/Footer";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || 
                  sessionStorage.getItem("authToken");
    
    if (token) {
      setIsAuthenticated(true);
      console.log(" تم التحقق من الهوية بنجاح");
    } else {
      console.log(" لا يوجد توكن - جاري التوجيه لتسجيل الدخول");
      navigate("/login", { state: { from: location.pathname } });
    }
    
    setIsLoading(false);
  }, [navigate, location]);

  if (isLoading) {
    return (
      <div className="auth-loading-screen">
        <style>{`
          @keyframes auth-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .auth-loading-screen {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            direction: rtl;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .auth-loader-container {
            text-align: center;
            padding: 40px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }
          
          .auth-spinner {
            width: 60px;
            height: 60px;
            border: 5px solid #e0e0e0;
            border-top: 5px solid #667eea;
            border-right: 5px solid #764ba2;
            border-radius: 50%;
            animation: auth-spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          
          .auth-loading-text {
            color: #333;
            font-size: 18px;
            font-weight: 600;
            margin: 0;
          }
          
          .auth-loading-subtext {
            color: #666;
            font-size: 14px;
            margin-top: 8px;
          }
        `}</style>
        
        <div className="auth-loader-container">
          <div className="auth-spinner"></div>
          <p className="auth-loading-text">جاري التحقق من الهوية...</p>
          <p className="auth-loading-subtext">يرجى الانتظار لحظة</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
}

function HomePage() {
  return (
    <div className="site-wrapper" dir="rtl">
      <Header />
      <Hero />

      <main className="page-content">
        <PopularMeals />
        <Categories />
      </main>

      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;