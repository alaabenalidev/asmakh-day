"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, User, Mail, Building2, Phone } from "lucide-react";

const departments = [
    "HR",
    "Administration",
    "Sales",
    "Leasing",
    "Marketing",
    "Operations",
    "Finance",
    "IT",
    "Legal",
    "Property Management",
    "Contract",
    "Facility Management",
    "Transaction Advisory",
    "Others"
];

const RegistrationSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Registration Successful! 🎉",
      description: "You're now registered for the next Journey to Laugh event.",
    });
  };

  if (isSubmitted) {
    return (
      <section id="register" className="py-20 md:py-32 bg-muted/30">
        <div className=" mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-secondary" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              You're All Set!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for registering, {formData.name}! We've sent a
              confirmation email to {formData.email}. See you at the next event!
            </p>
            <Button
              variant="hero"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", email: "", phone: "", department: "" });
              }}
            >
              Register Another Person
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 md:py-32 bg-muted/30">
      <div className=" mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Join the Fun
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Register for the{" "}
              <span className="text-primary">Next Event</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't miss out on the fun! Register now to secure your spot at
              the next Journey to Laugh event. Participation is open to all
              Al Asmakh Real Estate team members.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary font-bold">1</span>
                </div>
                <span className="text-muted-foreground">
                  Fill out the registration form
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary font-bold">2</span>
                </div>
                <span className="text-muted-foreground">
                  Receive confirmation email
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary font-bold">3</span>
                </div>
                <span className="text-muted-foreground">
                  Join us on the last Tuesday!
                </span>
              </div>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="card-festive">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Registration Form
              </h3>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-foreground mb-2 block">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="pl-10"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground mb-2 block">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@alasmakh.com"
                      className="pl-10"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground mb-2 block">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+974 XXXX XXXX"
                      className="pl-10"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="department"
                    className="text-foreground mb-2 block"
                  >
                    Department
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <select
                      id="department"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                    >
                      <option value="">Select your department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register Now"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
