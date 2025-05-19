import React, { createContext, useState, useEffect, useContext } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./index.css";

// Import global layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import your pages
import Homepage from "./pages/Homepage.jsx";
import About from "./pages/About.jsx";
import Charts from "./pages/Charts.jsx";
import DisasterAlerts from "./pages/DisasterAlerts.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Irrigation from "./pages/Irrigation.jsx";
import Contact from "./pages/Contact.jsx";
import CropSuggestion from "./pages/CropSuggestion.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import CropsData from "./pages/CropsData.jsx";
import Connect from "./pages/Connect.jsx";
import Gallery from "./pages/Gallery.jsx";
import WaterManagement from "./pages/WaterConservation.jsx";
import UploadImage from "./pages/UploadImage.jsx";
import Disease from "./pages/Disease.jsx";
import CompensationRequest from "./pages/CompensationRequest.jsx";

// Import your AuthPage
import AuthPage from "./pages/AuthPage.jsx";
import FormsPage from "./pages/FormsPage.jsx";

// ======= Auth Context Setup =======
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated token check (replace with your backend logic)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    setLoading(false);
  }, []);

  // Simulated login/signup, replace with real API calls
  const login = async (email, password, userType) => {
    // Call backend here, get token and user object
    const userObj = { email, userType };
    setUser(userObj);
    localStorage.setItem("token", "sampletoken");
    localStorage.setItem("user", JSON.stringify(userObj));
    return userObj;
  };

  const signup = async (name, email, password, userType) => {
    // Call backend here, get token and user object
    const userObj = { name, email, userType };
    setUser(userObj);
    localStorage.setItem("token", "sampletoken");
    localStorage.setItem("user", JSON.stringify(userObj));
    return userObj;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ======= Global Layout =======
function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "calc(100vh - 120px)" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

// ======= Route Protection =======
function ProtectedRoutes() {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Home page is always public
  if (loading) return <div>Loading...</div>;
  if (location.pathname === "/") return <Outlet />;
  if (!user) return <AuthPage />;
  return <Outlet />;
}

// ======= Routing Setup =======
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout>
          <ProtectedRoutes />
        </Layout>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/About", element: <About /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/forms", element: <FormsPage /> },
      { path: "/upload", element: <UploadImage /> },
      { path: "/Charts", element: <Charts /> },
      { path: "/DisasterAlerts", element: <DisasterAlerts /> },
      { path: "/Irrigation", element: <Irrigation /> },
      { path: "/contact", element: <Contact /> },
      { path: "/CropSuggestion", element: <CropSuggestion /> },
      { path: "/chatbot", element: <Chatbot /> },
      { path: "/cropdata", element: <CropsData /> },
      { path: "/Expert", element: <Connect /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/WaterManagement", element: <WaterManagement /> },
      { path: "/disease-detection", element: <Disease /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);