import React, { createContext, useContext, useState } from "react";
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
import NewsPage from "./news";
import Register from "./auth/register";
import Login from "./auth/login";
import Layout from "./layout";
import SendFeedback from "./feedback";

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
              <Route path="/feedback" element={<SendFeedback />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </HashRouter>
  );
}

