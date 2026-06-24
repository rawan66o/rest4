import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

/* Components */
import Login from "./components/Login";
import Notification from "./components/Notification";
import Account from "./components/Account";

import Header from "./components/Main/Header/Header";
import PopularMeals from "./components/Main/PopularMeals/PopularMeals";
import Categories from "./components/Main/Categories/Categories";
import Footer from "./components/Main/Footer/Footer";

import Dashboard from "./pages/Dashboard";

import IndexBill from "./components/Main/bill/IndexBill";
import Details from "./components/Main/details/indexDetails";

import OrderPage from "./components/OrderPage";
import OrderRow from "./components/OrderRow";
import OrderTable from "./components/OrderTable";
import OrdersHeader from "./components/OrdersHeader";

import ProductsSection from "./components/ProductsSection";
import ProductCard from "./components/ProductCard";

/* ================= Protected Route ================= */
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login", { state: { from: location.pathname } });
    }

    setIsLoading(false);
  }, [navigate, location]);

  if (isLoading) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-loader-container">
          <div className="auth-spinner"></div>
          <p className="auth-loading-text">جاري التحقق من الهوية...</p>
          <p className="auth-loading-subtext">يرجى الانتظار لحظة</p>
        </div>

        <style>{`
          @keyframes auth-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .auth-loading-screen {
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            background:linear-gradient(135deg,#667eea,#764ba2);
            direction:rtl;
          }

          .auth-loader-container {
            text-align:center;
            padding:40px;
            background:white;
            border-radius:20px;
          }

          .auth-spinner {
            width:60px;
            height:60px;
            border:5px solid #ddd;
            border-top:5px solid #667eea;
            border-radius:50%;
            animation:auth-spin 1s linear infinite;
            margin:auto;
          }
        `}</style>
      </div>
    );
  }

  return isAuthenticated ? children : null;
}

/* ================= Home ================= */
function HomePage() {
  return (
    <div>
      <Header />
      <PopularMeals />
      <Categories />
      <Footer />
    </div>
  );
}

/* ================= Routes ================= */
function AppRoutes() {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<HomePage />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD (Protected) */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ACCOUNT + NOTIFICATIONS */}
      <Route path="/account" element={<Account />} />
      <Route path="/notification" element={<Notification />} />

      {/* CART + DETAILS */}
      <Route path="/cart" element={<IndexBill />} />
      <Route path="/details" element={<Details />} />

      {/* ORDERS */}
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/orders/:id" element={<OrderRow />} />
      <Route path="/orders/table" element={<OrderTable />} />
      <Route path="/orders/header" element={<OrdersHeader />} />

      {/* PRODUCTS */}
      <Route path="/products" element={<ProductsSection />} />
      <Route path="/product/:id" element={<ProductCard />} />

      {/* TEST */}
      <Route path="/test" element={<div>Test Page</div>} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* ================= APP ================= */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;