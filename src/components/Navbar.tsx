import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";
import UserMenu from "@/components/UserMenu";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Games", href: "#games" },
  { name: "Gallery", href: "#gallery" },
  { name: "Leaderboard", href: "#leaderboard" },
  { name: "Prizes", href: "#prizes" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Journey to <span className="text-primary">Laugh</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
                >
                  {link.name}
                </a>
              ))}
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button variant="hero" size="sm" onClick={() => setShowLogin(true)}>
                  Login
                </Button>
              )}
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                  >
                    {link.name}
                  </a>
                ))}
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <Button variant="hero" className="w-full" onClick={() => { setShowLogin(true); setIsOpen(false); }}>
                    Login
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Navbar;
