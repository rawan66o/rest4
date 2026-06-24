// import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

/* ====== components/pages (نفس شغلك) ====== */
import Header from "./components/Main/Header/Header";
import Hero from "./components/Main/Hero/Hero";
import Categories from "./components/Main/Categories/Categories";
import PopularMeals from "./components/Main/PopularMeals/PopularMeals";
import Footer from "./components/Main/Footer/Footer";

import Dashboard from "./pages/Dashboard";

import IndexBill from "./components/Main/bill/IndexBill";
import Details from "./components/Main/details/indexDetails";

import OrderPage from "./components/OrderPage";
import OrderRow from "./components/OrderRow";
import OrderTable from "./components/OrderTable";
import OrdersHeader from "./components/OrdersHeader";
import ProductCard from "./components/ProductCard";
import ProductsSection from "./components/ProductsSection";

/* ===================== Protected Route ===================== */
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
      navigate("/login", { state: { from: location.pathname } });
    }

    setIsLoading(false);
  }, [navigate, location]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        جاري التحقق من الهوية...
      </div>
    );
  }

  return isAuthenticated ? children : null;
}

/* ===================== Home Page (نفس شغلك) ===================== */
function HomePage() {
  return (
    <div>
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

/* ===================== ROUTES ===================== */
function AppRoutes() {
  return (
    <Routes>

      {/* HOME */}
      <Route path="/" element={<HomePage />} />

      {/* CART + DETAILS (بدون تغيير) */}
      <Route path="/cart" element={<IndexBill />} />
      <Route path="/details" element={<Details />} />

      {/* ORDERS (نفس شغلك) */}
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/orders/:id" element={<OrderRow />} />
      <Route path="/orders/table" element={<OrderTable />} />
      <Route path="/orders/header" element={<OrdersHeader />} />

      {/* DASHBOARD (محمي) */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      {/* LOGIN */}
      <Route path="/login" element={<div>Login Page</div>} />

      {/* TEST */}
      <Route path="/test" element={<div>Test Page</div>} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />


      <Route path="/orders" element={<OrderPage/>} />
      <Route path="/orders/:id" element={<OrderRow />} />
      <Route path="/orders/table" element={<OrderTable />} />
      <Route path="/orders/header" element={<OrdersHeader />} />
      <Route path="/products" element={<ProductsSection/>} />
      <Route path="/product/:id" element={<ProductCard/>} />
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

/* ===================== APP ===================== */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;