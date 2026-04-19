import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Heart } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({ title: "Subscribed!", description: "Thank you for joining our newsletter." });
      setEmail("");
    }
  };

  return (
    <footer style={{ backgroundColor: "hsl(220, 25%, 12%)", color: "hsl(220, 10%, 85%)" }}>
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-white">Safecare Clinix & Endoscopy Centre</h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(220, 10%, 65%)" }}>
              Affiliated with Maritol Medical Centre. Delivering premium healthcare and endoscopy services with compassion and excellence in Lagos, Nigeria.
            </p>
            <p className="text-xs" style={{ color: "hsl(220, 10%, 50%)" }}>RC 1681624 | CAC Registered</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Quick Links</h3>
            <nav className="flex flex-col gap-2.5 text-sm" style={{ color: "hsl(220, 10%, 60%)" }}>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/services" className="hover:text-white transition-colors">Our Services</Link>
              <Link to="/education" className="hover:text-white transition-colors">Patient Education</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Operating Hours + Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Hours & Contact</h3>
            <div className="flex flex-col gap-2 text-sm" style={{ color: "hsl(220, 10%, 60%)" }}>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>Mon–Fri: 8 AM – 8 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>Saturday: 8 AM – 6 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>Sunday: Closed</span>
              </div>
              <div className="flex items-center gap-2 text-white font-medium mt-1">
                <Heart className="h-3.5 w-3.5 shrink-0" />
                <span>Emergency: 24/7</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm mt-4" style={{ color: "hsl(220, 10%, 60%)" }}>
              <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0" /> 67 Sam Shonibare St, Surulere, Lagos</span>
              <a href="mailto:safecareclinix@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors"><Mail className="h-3.5 w-3.5 shrink-0" /> safecareclinix@gmail.com</a>
              <a href="tel:+2348034263614" className="flex items-center gap-2 hover:text-white transition-colors"><Phone className="h-3.5 w-3.5 shrink-0" /> +234 803 426 3614</a>
            </div>
          </div>

          {/* Newsletter + Insurance */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Newsletter</h3>
            <p className="text-sm mb-3" style={{ color: "hsl(220, 10%, 60%)" }}>Stay updated with health tips and clinic news.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
              <Button type="submit" variant="secondary" size="sm">Join</Button>
            </form>
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "hsl(220, 10%, 50%)" }}>Accepted Insurance</p>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(220, 10%, 45%)" }}>
                Leadway Health, AXA Mansard, Hygeia HMO, Reliance HMO, NHIS & more
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs" style={{ color: "hsl(220, 10%, 40%)" }}>
          © {new Date().getFullYear()} Safecare Clinix & Endoscopy Centre. All rights reserved. | Affiliated with Maritol Medical Centre
        </div>
      </div>
    </footer>
  );
};

export default Footer;
