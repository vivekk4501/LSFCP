import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {

  // Load from localStorage
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem("results");
    return saved ? JSON.parse(saved) : {};
  });

  // Authentication state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("user");
  });

  // Profile photo state
  const [profilePhoto, setProfilePhoto] = useState(() => {
    const saved = localStorage.getItem("profilePhoto");
    return saved || null;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, [user]);

  useEffect(() => {
    if (profilePhoto) {
      localStorage.setItem("profilePhoto", profilePhoto);
    } else {
      localStorage.removeItem("profilePhoto");
    }
  }, [profilePhoto]);

  // Functions
  const addToHistory = (type, data) => {
    const historyItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      timestamp: new Date().toISOString(),
      ...data
    };
    setHistory(prev => [historyItem, ...prev]);
  };

  const updateResult = (type, value) => {
    setResults(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // Authentication functions
  const login = (email, password, role) => {
    // Simple authentication logic (in production, this would be an API call)
    if (email && password) {
      const userData = {
        email,
        role,
        name: email.split('@')[0],
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = (email, password, name, role) => {
    // Simple registration logic (in production, this would be an API call)
    if (email && password && name) {
      const userData = {
        email,
        role,
        name,
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  // Profile photo functions
  const uploadProfilePhoto = (photoData) => {
    setProfilePhoto(photoData);
  };

  const removeProfilePhoto = () => {
    setProfilePhoto(null);
  };

  return (
    <AppContext.Provider value={{
      history,
      results,
      user,
      isAuthenticated,
      profilePhoto,
      addToHistory,
      updateResult,
      clearHistory,
      login,
      logout,
      register,
      uploadProfilePhoto,
      removeProfilePhoto
    }}>
      {children}
    </AppContext.Provider>
  );
}