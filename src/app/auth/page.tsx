"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Building2, Lock, Sparkles, User, UserPlus, Mail, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RegistrationData {
    employeeId: string;
    name: string;
    email: string;
    department: string;
    phone?: string;
    timestamp: string;
}

const loginSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  department: z.string().min(1, "Department is required"),
});

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [isLoading, setIsLoading] = useState(false);
    const { loginUser, register, isAuthenticated } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

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

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
        defaultValues: {
            employeeId: "",
            password: "",
            name: "",
            email: "",
            phone: "",
            department: "",
        },
    });

    // Reset form validation when switching modes
    useEffect(() => {
        form.clearErrors();
        form.reset(form.getValues()); 
    }, [mode, form]);

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        setIsLoading(true);

        if (mode === "login") {
            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        employeeId: values.employeeId,
                        password: values.password,
                    }),
                });

                if (response.ok) {
                    const user = await response.json();
                    loginUser(user);
                    toast({
                        title: "Welcome Back!",
                        description: "You're now logged in.",
                    });
                    router.push("/");
                } else {
                    toast({
                        title: "Login Failed",
                        description: "Invalid Employee ID or Password.",
                        variant: "destructive",
                    });
                }
            } catch (error) {
                toast({
                    title: "Login Failed",
                    description: "An unexpected error occurred.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            const userData: RegistrationData = {
                employeeId: values.employeeId,
                name: values.name,
                email: values.email,
                department: values.department,
                phone: values.phone,
                timestamp: Date.now().toString()
            }

            try {
                const response = await fetch("/api/register-user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    const success = register(values.employeeId, values.password, values.name, values.department);
                    if (success) {
                        toast({
                            title: "Registration Successful!",
                            description: `Welcome ${values.name}! You're now registered and logged in.`,
                        });
                        router.push("/");
                    } else {
                        toast({
                            title: "Registration Failed",
                            description: "Could not register the user locally.",
                            variant: "destructive",
                        });
                    }
                } else {
                    const errorData = await response.json();
                    toast({
                        title: "Registration Failed",
                        description: errorData.message || "An error occurred.",
                        variant: "destructive",
                    });
                }
            } catch (error) {
                toast({
                    title: "Registration Failed",
                    description: "An unexpected error occurred.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        }
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
            <Link href="/" passHref>
                <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                </motion.a>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-lg relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 mb-4" passHref>
                        <div className="w-14 h-14 rounded bg-secondary flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-secondary-foreground" />
                        </div>
                    </Link>
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
                            className={`flex-1 py-3 px-4 rounded text-sm font-medium transition-all ${mode === "login"
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setMode("register")}
                            className={`flex-1 py-3 px-4 rounded text-sm font-medium transition-all ${mode === "register"
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

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="employeeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm uppercase tracking-wide">Employee ID</FormLabel>
                                            <FormControl>
                                                <div className="relative mt-2">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    <Input placeholder="e.g., EMP001" className="pl-12 h-12 rounded text-base" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm uppercase tracking-wide">Password</FormLabel>
                                            <FormControl>
                                                <div className="relative mt-2">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    <Input type="password" placeholder="Enter your password" className="pl-12 h-12 rounded text-base" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {mode === "register" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-6"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm uppercase tracking-wide">Full Name</FormLabel>
                                                    <FormControl>
                                                        <div className="relative mt-2">
                                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                            <Input placeholder="Your full name" className="pl-12 h-12 rounded text-base" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm uppercase tracking-wide">Email Address</FormLabel>
                                                    <FormControl>
                                                        <div className="relative mt-2">
                                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                            <Input type="email" placeholder="your.email@example.com" className="pl-12 h-12 rounded text-base" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm uppercase tracking-wide">Phone Number</FormLabel>
                                                    <FormControl>
                                                        <div className="relative mt-2">
                                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                            <Input type="tel" placeholder="+974 1234 5678" className="pl-12 h-12 rounded text-base" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="department"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm uppercase tracking-wide">Department</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <div className="relative mt-2">
                                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                                                                <SelectTrigger className="w-full h-12 pl-12 pr-4 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base">
                                                                    <SelectValue placeholder="Select department" />
                                                                </SelectTrigger>
                                                            </div>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {departments.map((dept) => (
                                                                <SelectItem key={dept} value={dept}>
                                                                    {dept}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
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
                        </Form>

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
}
