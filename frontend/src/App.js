import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
import Main from "./pages/Main"; 
import { useState } from "react";
import RefreshHandler from "./pages/RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<PrivateRoute element={<Main />} />} />
      </Routes>
    </div>
  );
}

export default App;
