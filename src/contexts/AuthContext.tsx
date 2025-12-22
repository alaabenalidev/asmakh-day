"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  employeeId: string;
  name: string;
  department: string;
  isAuthenticated: boolean;
  loginTime: Date;
}

interface StoredUser {
  employeeId: string;
  password: string;
  name: string;
  department: string;
}

interface GameScore {
  game: string;
  score: number;
  date: Date;
  entries: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: (user: Omit<User, "isAuthenticated" | "loginTime">) => void;
  register: (employeeId: string, password: string, name: string, department: string) => boolean;
  logout: () => void;
  gameScores: GameScore[];
  addGameScore: (game: string, score: number, entries: number) => void;
  totalEntries: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<StoredUser[]>([]);
  const [gameScores, setGameScores] = useState<GameScore[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("jtl_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser({ ...parsed, loginTime: new Date(parsed.loginTime) });
    }

    const savedUsers = localStorage.getItem("jtl_registered_users");
    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers));
    }

    const savedScores = localStorage.getItem("jtl_scores");
    if (savedScores) {
      setGameScores(JSON.parse(savedScores).map((s: any) => ({ ...s, date: new Date(s.date) })));
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    if (user) {
      localStorage.setItem("jtl_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("jtl_user");
    }
  }, [user, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("jtl_registered_users", JSON.stringify(registeredUsers));
  }, [registeredUsers, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("jtl_scores", JSON.stringify(gameScores));
  }, [gameScores, isInitialized]);

  const register = (employeeId: string, password: string, name: string, department: string): boolean => {
    const existingUser = registeredUsers.find((u) => u.employeeId === employeeId);
    if (existingUser) {
      return false;
    }

    const newUser: StoredUser = {
      employeeId,
      password,
      name,
      department,
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    
    setUser({
      employeeId,
      name,
      department,
      isAuthenticated: true,
      loginTime: new Date(),
    });

    return true;
  };

  const loginUser = (userData: Omit<User, "isAuthenticated" | "loginTime">) => {
    setUser({
      ...userData,
      isAuthenticated: true,
      loginTime: new Date(),
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addGameScore = (game: string, score: number, entries: number) => {
    const newScore: GameScore = {
      game,
      score,
      date: new Date(),
      entries,
    };
    setGameScores((prev) => [...prev, newScore]);
  };

  const totalEntries = gameScores.reduce((sum, s) => sum + s.entries, 0);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user?.isAuthenticated,
        loginUser,
        register,
        logout,
        gameScores,
        addGameScore,
        totalEntries,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
