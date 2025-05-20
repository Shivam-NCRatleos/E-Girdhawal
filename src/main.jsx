import React, { createContext, useState, useEffect, useContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
import AuthPage from "./pages/AuthPage.jsx";
import FormsPage from "./pages/FormsPage.jsx";

import { loginUser, registerUser, getProfile } from "./services/auth";

// Auth Context and Provider
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token)
        .then((profile) => setUser(profile))
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, userType) => {
    const data = await loginUser(email, password, userType);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  };

  const signup = async (name, email, password, userType) => {
    const data = await registerUser(name, email, password, userType);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
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

// Layout with Navbar and Footer
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

// Protected Routes Wrapper
function ProtectedRoutes() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <AuthPage />;
  return <Outlet />;
}

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Homepage is public
      { path: "/", element: <Homepage /> },

      // Protected Routes
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/about", element: <About /> },
          { path: "/charts", element: <Charts /> },
          { path: "/disaster-alerts", element: <DisasterAlerts /> },
          { path: "/irrigation", element: <Irrigation /> },
          { path: "/contact", element: <Contact /> },
          { path: "/crop-suggestion", element: <CropSuggestion /> },
          { path: "/chatbot", element: <Chatbot /> },
          { path: "/crops-data", element: <CropsData /> },
          { path: "/connect", element: <Connect /> },
          { path: "/gallery", element: <Gallery /> },
          { path: "/water-management", element: <WaterManagement /> },
          { path: "/upload-image", element: <UploadImage /> },
          { path: "/disease", element: <Disease /> },
          { path: "/compensation-request", element: <CompensationRequest /> },
          { path: "/forms", element: <FormsPage /> },
          { path: "/upload", element: <UploadImage /> },

        ],
      },
      // Auth page is public
      { path: "/auth", element: <AuthPage /> },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);