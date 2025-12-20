import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, Trophy, LogOut, ChevronDown, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, gameScores, totalEntries } = useAuth();

  if (!user) return null;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
        <span className="hidden md:inline text-sm font-medium">{user.name.split(" ")[0]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-72 bg-card rounded-2xl shadow-2xl border border-border z-50 overflow-hidden"
            >
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.department} • {user.employeeId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-accent/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">Total Entries</span>
                  </div>
                  <span className="text-xl font-bold text-accent">{totalEntries}</span>
                </div>

                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Recent Games
                </h4>
                {gameScores.length > 0 ? (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {gameScores.slice(-3).reverse().map((score, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50"
                      >
                        <span className="text-foreground">{score.game}</span>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-3 h-3 text-accent" />
                          <span className="text-muted-foreground">+{score.entries}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No games played yet
                  </p>
                )}
              </div>

              <div className="p-3 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
