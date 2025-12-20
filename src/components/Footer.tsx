import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                Journey to <span className="text-primary">Laugh</span>
              </span>
            </a>
            <p className="text-background/60 max-w-md">
              Monthly team building events by Al Asmakh Real Estate. Bringing
              departments together through fun, games, and celebration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  About Event
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Event Calendar
                </a>
              </li>
              <li>
                <a
                  href="#games"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Mini Games
                </a>
              </li>
              <li>
                <a
                  href="#prizes"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Prizes
                </a>
              </li>
              <li>
                <a
                  href="#register"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/60">
                <Mail className="w-4 h-4" />
                <span>events@alasmakh.com</span>
              </li>
              <li className="flex items-center gap-2 text-background/60">
                <Phone className="w-4 h-4" />
                <span>+974 4444 XXXX</span>
              </li>
              <li className="flex items-start gap-2 text-background/60">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Al Asmakh Real Estate HQ, Doha, Qatar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/40 text-sm">
              © {new Date().getFullYear()} Al Asmakh Real Estate. All rights
              reserved.
            </p>
            <p className="text-background/40 text-sm">
              Journey to Laugh - Celebrating Together Every Month 🎉
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
