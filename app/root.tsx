import React, { createContext, useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MainPage from "./main";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/main.css";
import NewsPage from "./news/news";
import Register from "./auth/register";
import Login from "./auth/login";
import Layout from "./layout";
import SendFeedback from "./feedback";
import OneNews from "./news/one";
import user from "../api/user";
import auth from "../api/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
});

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const location = useLocation();
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

const PublicRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} replace />;
  }
};

export default function App() {
  const [isAuthenticated, setAuth] = useState<boolean>(false);

  useEffect(() => {
    let token = auth.GetAccessToken()
    if (token) {
      setAuth(true)
    }
  }, [])
  return (
    <HashRouter>
      <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route element={<PublicRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<OneNews />} />
              <Route path="/feedback" element={<SendFeedback />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </HashRouter>
  );
}

