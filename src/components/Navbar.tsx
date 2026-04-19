import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/education", label: "Patient Education" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-card border-b border-border shadow-sm"
          : "bg-card/95"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="Safecare Clinix Logo" className="h-9 w-auto rounded" />
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-foreground leading-none block">Safecare Clinix</span>
            <span className="text-[10px] text-muted-foreground leading-none">& Endoscopy Centre</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href="tel:+2348034263614">
            <Button size="sm" className="gap-2">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+234 803 426 3614</span>
              <span className="sm:hidden">Call Us</span>
            </Button>
          </a>
          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-foreground/30 z-[90] md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] max-w-[85vw] bg-card z-[100] flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between h-16 px-5 border-b border-border">
                <span className="text-sm font-bold text-foreground">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3">
                {navLinks.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center px-3 py-3 rounded-lg text-[15px] font-medium transition-colors mb-1 ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/70 hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="p-4 border-t border-border space-y-3">
                <a href="tel:+2348034263614">
                  <Button className="w-full gap-2">
                    <Phone className="h-4 w-4" /> Call +234 803 426 3614
                  </Button>
                </a>
                <a href="https://wa.me/2348034263614" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full gap-2 mt-2">
                    Book on WhatsApp
                  </Button>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
