import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { MapPin, Mail, Loader2, Phone, Clock, Siren } from "lucide-react";

const faqs = [
  { q: "What are your operating hours?", a: "We are open Monday to Saturday, 8:00 AM to 8:00 PM. Our emergency department and ICU operate 24 hours a day, 7 days a week, including public holidays." },
  { q: "Do I need an appointment for consultation?", a: "Walk-ins are welcome for general consultation, but we recommend booking an appointment to reduce wait times. You can book via WhatsApp at +234 803 426 3614 or by calling our reception." },
  { q: "What insurance plans do you accept?", a: "We accept a wide range of HMO and insurance plans including Leadway Health, AXA Mansard, Hygeia HMO, Reliance HMO, Redcare HMO, Clearline HMO, Mediplan, and NHIS. Contact us to confirm your specific plan." },
  { q: "How do I prepare for an endoscopy?", a: "Preparation typically involves fasting for 8–12 hours before the procedure and following a bowel preparation regimen for colonoscopy. Our team will provide detailed instructions when you book your appointment." },
  { q: "What specialist consultations do you offer?", a: "We offer consultations in General Surgery, Cardiothoracic Surgery, Nephrology, Cardiology, Urology, Neurosurgery, Orthopaedics, Paediatrics Surgery, Plastic Surgery, Gastroenterology, Pulmonology, Endocrinology, and Obstetrics & Gynaecology." },
  { q: "Do you have an ICU?", a: "Yes. We have a fully equipped Intensive Care Unit (ICU) and High Dependency Unit (HDU) with 24/7 monitoring, ventilator support, and a multi-disciplinary critical care team." },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message sent successfully!", description: "We will contact you shortly." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    }, 2000);
  };

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  return (
    <div>
      {/* Emergency Banner */}
      <section className="bg-destructive/10 border-b border-destructive/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-3">
          <Siren className="h-4 w-4 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            Medical Emergency? Call <a href="tel:+2348034263614" className="underline font-bold">+234 803 426 3614</a> — Available 24/7
          </p>
        </div>
      </section>

      {/* Header */}
      <section className="pt-20 pb-8 md:pt-24 md:pb-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Get In Touch</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Contact Us</h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
              We're here to help. Reach out and we'll respond promptly.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Info Column */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
            <Card>
              <CardContent className="p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p className="text-sm text-muted-foreground">67 Sam Shonibare Street, off Ogunlana Drive, Surulere, Lagos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:safecareclinix@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">safecareclinix@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a href="tel:+2348034263614" className="text-sm text-muted-foreground hover:text-primary transition-colors">+234 803 426 3614</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href="tel:+2348034263614">
                    <Button className="gap-2">
                      <Phone className="h-4 w-4" /> Call Us
                    </Button>
                  </a>
                  <a href="https://wa.me/2348034263614" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2">
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Operating Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Monday – Friday</span><span className="font-medium text-foreground">8:00 AM – 8:00 PM</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Saturday</span><span className="font-medium text-foreground">8:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Sunday</span><span className="font-medium text-foreground">Closed</span></div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-destructive font-medium">Emergency / ICU (24/7)</span>
                    <span className="font-medium text-destructive">Always Open</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Column */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input placeholder="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} className={errors.name ? "border-destructive" : ""} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Input placeholder="Email Address" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={errors.email ? "border-destructive" : ""} />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Input placeholder="Phone Number (optional)" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  </div>
                  <div>
                    <Textarea placeholder="Your message..." rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className={errors.message ? "border-destructive" : ""} />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending...</> : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Map */}
        <div className="mt-16 max-w-4xl mx-auto rounded-xl overflow-hidden border border-border">
          <iframe
            title="Safecare Clinix Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0!2d3.3567!3d6.4969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c!2sSam+Shonibare+Street+Surulere+Lagos!5e0!3m2!1sen!2sng"
            width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
