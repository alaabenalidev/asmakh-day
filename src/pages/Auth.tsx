import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Building2, UserPlus, ArrowLeft, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const departments = [
    "HR",
    "Sales",
    "Marketing",
    "Operations",
    "Finance",
    "IT",
    "Legal",
    "Property Management",
  ];

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (mode === "login") {
        const success = login(employeeId, password);
        if (success) {
          toast({
            title: "Welcome Back!",
            description: "You're now logged in.",
          });
          navigate("/");
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid Employee ID or Password.",
            variant: "destructive",
          });
        }
      } else {
        const success = register(employeeId, password, name, department);
        if (success) {
          toast({
            title: "Registration Successful!",
            description: `Welcome ${name}! You're now registered and logged in.`,
          });
          navigate("/");
        } else {
          toast({
            title: "Registration Failed",
            description: "Employee ID already exists.",
            variant: "destructive",
          });
        }
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 confetti-bg" />
      <div className="absolute top-20 left-20 w-32 h-32 rounded bg-secondary/10 rotate-12 animate-float" />
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded bg-accent/10 -rotate-6 animate-float-delayed" />

      {/* Theme toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded bg-secondary flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-secondary-foreground" />
            </div>
          </a>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Journey to <span className="text-secondary">Laugh</span>
          </h1>
          <p className="text-muted-foreground mt-2">Al Asmakh Real Estate Day</p>
        </div>

        <div className="bg-card rounded-lg shadow-2xl border border-border overflow-hidden">
          {/* Mode Toggle */}
          <div className="flex bg-muted p-1 m-6 mb-0 rounded">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 px-4 rounded text-sm font-medium transition-all ${
                mode === "login"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-3 px-4 rounded text-sm font-medium transition-all ${
                mode === "register"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                {mode === "login" ? (
                  <Lock className="w-10 h-10 text-secondary" />
                ) : (
                  <UserPlus className="w-10 h-10 text-secondary" />
                )}
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground tracking-tight">
                {mode === "login" ? "Welcome Back" : "Create Your Account"}
              </h2>
              <p className="text-muted-foreground mt-2">
                {mode === "login"
                  ? "Enter your credentials to continue"
                  : "Join us and start participating in events"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="employeeId" className="text-sm uppercase tracking-wide">
                  Employee ID
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="employeeId"
                    type="text"
                    placeholder="e.g., EMP001"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="pl-12 h-12 rounded text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm uppercase tracking-wide">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-12 rounded text-base"
                    required
                  />
                </div>
              </div>

              {mode === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <Label htmlFor="name" className="text-sm uppercase tracking-wide">
                      Full Name
                    </Label>
                    <div className="relative mt-2">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-12 h-12 rounded text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="department" className="text-sm uppercase tracking-wide">
                      Department
                    </Label>
                    <div className="relative mt-2">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                      <select
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base"
                        required
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              <Button
                type="submit"
                variant="hero"
                className="w-full h-14 text-base"
                disabled={isLoading}
              >
                {isLoading
                  ? mode === "login"
                    ? "Logging in..."
                    : "Creating account..."
                  : mode === "login"
                  ? "Login"
                  : "Create Account"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                {mode === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setMode("register")}
                      className="text-secondary hover:underline font-medium"
                    >
                      Register now
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setMode("login")}
                      className="text-secondary hover:underline font-medium"
                    >
                      Login here
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-muted-foreground/60 text-sm mt-8">
          © {new Date().getFullYear()} Al Asmakh Real Estate. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;