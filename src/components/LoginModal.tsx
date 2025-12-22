import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Lock, User, Building2, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
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
          onClose();
          resetForm();
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
          onClose();
          resetForm();
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

  const resetForm = () => {
    setPassword("");
    setEmployeeId("");
    setName("");
    setDepartment("");
  };

  const goToAuthPage = () => {
    onClose();
    navigate("/auth");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md bg-card rounded-lg shadow-2xl z-50 overflow-hidden border border-border"
          >
            <div className="relative p-8 md:p-10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Mode Toggle */}
              <div className="flex bg-muted rounded p-1 mb-8">
                <button
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-all ${
                    mode === "login"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode("register")}
                  className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-all ${
                    mode === "register"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Register
                </button>
              </div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  {mode === "login" ? (
                    <Lock className="w-8 h-8 text-secondary" />
                  ) : (
                    <UserPlus className="w-8 h-8 text-secondary" />
                  )}
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground tracking-tight">
                  {mode === "login" ? "Employee Login" : "Create Account"}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {mode === "login"
                    ? "Enter your credentials to access games & track scores"
                    : "Register to participate in events and earn prizes"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="employeeId" className="text-sm uppercase tracking-wide">
                    Employee ID
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="employeeId"
                      type="text"
                      placeholder="e.g., EMP001"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="pl-10 rounded"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm uppercase tracking-wide">
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 rounded"
                      required
                    />
                  </div>
                </div>

                {mode === "register" && (
                  <>
                    <div>
                      <Label htmlFor="name" className="text-sm uppercase tracking-wide">
                        Full Name
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 rounded"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="department" className="text-sm uppercase tracking-wide">
                        Department
                      </Label>
                      <div className="relative mt-2">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                        <select
                          id="department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="w-full h-10 pl-10 pr-4 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
                  </>
                )}

                <Button
                  type="submit"
                  variant="shimmer"
                  className="w-full mt-6"
                  size="lg"
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

              <div className="mt-6 text-center">
                <button
                  onClick={goToAuthPage}
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  Open full authentication page →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;