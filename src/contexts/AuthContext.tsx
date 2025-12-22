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
  login: (employeeId: string, password: string) => boolean;
  register: (employeeId: string, password: string, name: string, department: string) => boolean;
  logout: () => void;
  gameScores: GameScore[];
  addGameScore: (game: string, score: number, entries: number) => void;
  totalEntries: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("jtl_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, loginTime: new Date(parsed.loginTime) };
    }
    return null;
  });

  const [registeredUsers, setRegisteredUsers] = useState<StoredUser[]>(() => {
    const saved = localStorage.getItem("jtl_registered_users");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  const [gameScores, setGameScores] = useState<GameScore[]>(() => {
    const saved = localStorage.getItem("jtl_scores");
    if (saved) {
      return JSON.parse(saved).map((s: GameScore) => ({ ...s, date: new Date(s.date) }));
    }
    return [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("jtl_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("jtl_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("jtl_registered_users", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem("jtl_scores", JSON.stringify(gameScores));
  }, [gameScores]);

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

  const login = (employeeId: string, password: string): boolean => {
    const storedUser = registeredUsers.find(
      (u) => u.employeeId === employeeId && u.password === password
    );

    if (storedUser) {
      setUser({
        employeeId: storedUser.employeeId,
        name: storedUser.name,
        department: storedUser.department,
        isAuthenticated: true,
        loginTime: new Date(),
      });
      return true;
    }
    return false;
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
        login,
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