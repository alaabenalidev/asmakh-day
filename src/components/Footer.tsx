import { Sparkles, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Elegant Gold Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
      
      <div className="py-16">
        <div className="mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <a href="#home" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-secondary-foreground" />
                </div>
                <span className="font-display font-bold text-2xl">
                  Journey to <span className="text-secondary">Laugh</span>
                </span>
              </a>
              <p className="text-primary-foreground/70 max-w-md leading-relaxed mb-6">
                Monthly team building events by Al Asmakh Real Estate. Bringing
                departments together through fun, games, and celebration.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-secondary">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "About Event", href: "#about" },
                  { name: "Event Calendar", href: "#events" },
                  { name: "Mini Games", href: "#games" },
                  { name: "Gallery", href: "#gallery" },
                  { name: "Leaderboard", href: "#leaderboard" },
                  { name: "Prizes", href: "#prizes" },
                  { name: "Register", href: "#register" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-secondary group-hover:w-4 transition-all duration-300" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-secondary">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-primary-foreground/70">
                  <div className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-secondary" />
                  </div>
                  <span>events@alasmakh.com</span>
                </li>
                <li className="flex items-center gap-3 text-primary-foreground/70">
                  <div className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-secondary" />
                  </div>
                  <span>+974 4444 XXXX</span>
                </li>
                <li className="flex items-start gap-3 text-primary-foreground/70">
                  <div className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <span>Al Asmakh Real Estate HQ, Doha, Qatar</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Gold Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Al Asmakh Real Estate. All rights reserved.
            </p>
            <p className="text-primary-foreground/50 text-sm flex items-center gap-2">
              Journey to Laugh - Celebrating Together Every Month
              <span className="text-secondary">✦</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;