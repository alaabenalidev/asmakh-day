import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  employeeId: string;
  name: string;
  department: string;
  isAuthenticated: boolean;
  loginTime: Date;
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
  login: (password: string, employeeId: string, name: string, department: string) => boolean;
  logout: () => void;
  gameScores: GameScore[];
  addGameScore: (game: string, score: number, entries: number) => void;
  totalEntries: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

const EVENT_PASSWORD = "JourneyToLaugh2024";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("jtl_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, loginTime: new Date(parsed.loginTime) };
    }
    return null;
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
    localStorage.setItem("jtl_scores", JSON.stringify(gameScores));
  }, [gameScores]);

  const login = (password: string, employeeId: string, name: string, department: string): boolean => {
    if (password === EVENT_PASSWORD) {
      setUser({
        employeeId,
        name,
        department,
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
