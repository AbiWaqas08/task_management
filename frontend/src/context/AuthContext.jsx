import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (token && role) {
      setUser({ token, role, name, email });
    }
  }, []);

  // LOGIN
  const login = (token, role, name, email) => {
    localStorage.setItem("token", token);   // ✅ FIXED
    localStorage.setItem("role", role);     // ✅ FIXED
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);     // ✅ FIXED

    setUser({ token, role,  name, email });
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);