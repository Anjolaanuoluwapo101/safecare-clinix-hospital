import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Phone, Star, Users, Award, CheckCircle2,
  MapPin, Clock
} from "lucide-react";
import buildingImg from "@/assets/building.jpg";
import receptionImg from "@/assets/reception.jpg";

/* ── Facility images (real hospital/clinic photos from Unsplash) ── */
const facilityImages = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", caption: "Hospital Reception" },
  { src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80", caption: "Consultation Room" },
  { src: "https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=600&q=80", caption: "Operating Theatre" },
  { src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80", caption: "Patient Ward" },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80", caption: "Medical Laboratory" },
  { src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&q=80", caption: "Diagnostic Imaging" },
];

const stats = [
  { label: "Years Experience", target: 10, suffix: "+" },
  { label: "Patients Treated", target: 5000, suffix: "+" },
  { label: "Medical Staff", target: 30, suffix: "+" },
  { label: "Specialist Services", target: 15, suffix: "" },
];

const whyUs = [
  "Board-Certified Specialists",
  "State-of-the-Art Equipment",
  "24/7 Emergency Response",
  "Patient-Centered Care",
  "Affordable Premium Services",
  "Clean & Modern Facilities",
];

const serviceCategories = [
  {
    title: "Specialist Consultations",
    items: ["General Surgery", "Cardiothoracic Surgery", "Nephrology", "Cardiology", "Urology", "Neurosurgery", "Orthopaedics", "Paediatrics Surgery", "Plastic Surgery", "Gastroenterology", "Pulmonology", "Endocrinology", "Obstetrics & Gynaecology"],
  },
  {
    title: "Endoscopy Procedures",
    items: ["Upper GI Endoscopy", "Colonoscopy", "Bronchoscopy", "Cystoscopy", "Video Laryngoscopy"],
  },
  {
    title: "Advanced Surgeries",
    items: ["Laparoscopic Surgery", "Gastric Sleeve Surgery", "Gastric Balloon Insertion", "Video Assisted Thoracic Surgery (VATS)", "Chest & Lung Surgery", "Esophageal Surgery", "Vascular Surgery", "Prostate Surgery (TURP)"],
  },
  {
    title: "Critical Care",
    items: ["Intensive Care Unit (ICU)", "High Dependency Unit (HDU)"],
  },
];

const departments = [
  { key: "surgery", label: "Surgery", desc: "Our surgical department performs a wide range of procedures, from minimally invasive laparoscopic surgeries to complex cardiothoracic and vascular operations. Our theatre suites are equipped with the latest technology, and our team of surgeons, anaesthetists, and nurses ensures every patient receives safe, effective care with minimal recovery time.", image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=700&q=80" },
  { key: "maternity", label: "Maternity", desc: "Our maternity ward provides comprehensive care for expectant mothers, from first trimester consultations to delivery and postnatal support. We offer antenatal classes, routine scans, high-risk pregnancy management, and a comfortable birthing environment staffed by experienced obstetricians and midwives.", image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=700&q=80" },
  { key: "endoscopy", label: "Endoscopy", desc: "Safecare's endoscopy unit is equipped with high-definition scopes for diagnostic and therapeutic procedures including upper GI endoscopy, colonoscopy, bronchoscopy, cystoscopy, and video laryngoscopy. Our gastroenterologists adhere to international standards of sedation and infection control.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80" },
  { key: "emergency", label: "Emergency", desc: "Our 24/7 emergency department is staffed by trained emergency physicians and nurses ready to handle trauma, cardiac events, respiratory distress, and other acute conditions. With rapid triage protocols, ICU, and HDU facilities, we deliver life-saving care when every second counts.", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&q=80" },
];

const doctors = [
  { name: "Dr. Adebayo Ogunleye", specialty: "Gastroenterologist & Endoscopist", initials: "AO" },
  { name: "Dr. Chioma Nwosu", specialty: "Obstetrician & Gynaecologist", initials: "CN" },
  { name: "Dr. Emeka Okoro", specialty: "General & Laparoscopic Surgeon", initials: "EO" },
  { name: "Dr. Folake Adeyemi", specialty: "Internal Medicine Specialist", initials: "FA" },
];

const testimonials = [
  { quote: "The care I received at Safecare was exceptional. The doctors were thorough, the nurses attentive, and the facility spotless. I felt safe every step of the way.", name: "Mrs. Adesanya T.", rating: 5 },
  { quote: "I had my endoscopy here and was nervous, but the team made it so comfortable. They explained everything and followed up after discharge. Truly world-class.", name: "Mr. Ibrahim K.", rating: 5 },
  { quote: "From antenatal through delivery, Safecare was my second home. The maternity staff are wonderful — experienced, caring, and always available.", name: "Mrs. Efe O.", rating: 5 },
  { quote: "Their emergency response saved my father's life. We arrived in critical condition and they acted immediately. I cannot thank them enough.", name: "Engr. Chukwuma A.", rating: 5 },
];

const insurancePartners = [
  "Leadway Health", "AXA Mansard", "Hygeia HMO", "Redcare HMO",
  "Reliance HMO", "Clearline HMO", "Mediplan", "NHIS",
];

/* ── Animated Counter ── */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const interval = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(interval); }
            else setCount(start);
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <p className="text-3xl sm:text-4xl font-extrabold text-primary tabular-nums">
        {count.toLocaleString()}{suffix}
      </p>
    </div>
  );
}

const Index = () => {
  const [activeDept, setActiveDept] = useState("surgery");
  const dept = departments.find((d) => d.key === activeDept)!;

  return (
    <div>
      {/* ═══ 1. VIDEO HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={buildingImg}
        >
          <source src="/videos/entry.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-foreground/60" />

        <div className="container relative mx-auto px-4 py-28 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-destructive text-destructive-foreground text-xs font-semibold px-3 py-1.5 rounded">
                24/7 Emergency
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded">
                <Clock className="h-3 w-3" /> Mon–Sat: 8AM – 8PM
              </span>
            </div>

            <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-3">
              Affiliated with Maritol Medical Centre
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Premium Healthcare & Endoscopy Centre in Lagos
            </h1>
            <p className="text-white/70 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
              Delivering world-class specialist consultations, advanced surgeries, and endoscopy services with compassion and precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:+2348034263614">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Phone className="h-4 w-4" /> Book an Appointment
                </Button>
              </a>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white bg-transparent hover:bg-white/10">
                  Our Services <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-6 text-white/50 text-sm">
              <MapPin className="h-3.5 w-3.5" />
              <span>67 Sam Shonibare Street, off Ogunlana Drive, Surulere, Lagos</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. STATS BAR ═══ */}
      <section className="py-14 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <AnimatedCounter target={s.target} suffix={s.suffix} />
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. ABOUT / WHY CHOOSE US ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={receptionImg} alt="Safecare reception area" className="rounded-xl w-full object-cover aspect-[4/3]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">About Safecare Clinix</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Why Thousands of Patients Trust Us</h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Since our founding, Safecare Clinix & Endoscopy Centre — affiliated with Maritol Medical Centre — has been dedicated to delivering compassionate, evidence-based healthcare. Our facility at 67 Sam Shonibare Street, Surulere, Lagos combines experienced specialists, modern infrastructure, and a genuine commitment to every patient's well-being.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whyUs.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/services" className="inline-block mt-8">
                <Button variant="outline" className="gap-2">
                  View All Services <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 4. DOCTOR VIDEO HIGHLIGHT ═══ */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Our Specialists</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Expert Care from Board-Certified Physicians</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Our team of experienced doctors and consultants spans over 13 medical and surgical specialties. From general surgery and cardiothoracic surgery to nephrology, neurosurgery, gastroenterology, and more — every patient is seen by a qualified specialist.
              </p>
              <Link to="/contact">
                <Button className="gap-2">
                  Book a Consultation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden">
              <video autoPlay muted loop playsInline className="w-full aspect-video object-cover">
                <source src="/videos/doctor.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. FULL SERVICES OVERVIEW ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">What We Offer</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Our Medical Services</h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">
              Comprehensive specialist consultations, endoscopy procedures, advanced surgeries, and critical care — all under one roof.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full border border-border">
                  <CardContent className="p-6">
                    <h3 className="text-base font-semibold mb-4 text-foreground">{cat.title}</h3>
                    <ul className="space-y-2">
                      {cat.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" className="gap-2">
                View Detailed Services <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 6. ENDOSCOPY VIDEO SECTION ═══ */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden order-2 md:order-1">
              <video autoPlay muted loop playsInline className="w-full aspect-video object-cover">
                <source src="/videos/endoscopy.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Endoscopy Centre</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Advanced Endoscopy & Diagnostic Procedures</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Our endoscopy unit is equipped with high-definition scopes for diagnostic and therapeutic procedures. We perform upper GI endoscopy, colonoscopy, bronchoscopy, cystoscopy, and video laryngoscopy with sedation-assisted comfort.
              </p>
              <ul className="space-y-2 mb-6">
                {["Upper GI Endoscopy", "Lower GI Endoscopy (Colonoscopy)", "Bronchoscopy", "Cystoscopy", "Video Laryngoscopy"].map((item) => (
                  <li key={item} className="text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className="gap-2">
                  Schedule a Procedure <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. FEATURED DEPARTMENTS (TABS) ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Departments</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Departments</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {departments.map((d) => (
              <button
                key={d.key}
                onClick={() => setActiveDept(d.key)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  activeDept === d.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <motion.div
            key={dept.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto"
          >
            <img src={dept.image} alt={dept.label} className="rounded-xl w-full object-cover aspect-[4/3]" />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">{dept.label} Department</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">{dept.desc}</p>
              <Link to="/contact">
                <Button variant="outline" className="gap-2">
                  Enquire Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 8. CRITICAL CARE VIDEO ═══ */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Critical Care</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">ICU & High Dependency Unit</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Our intensive care unit (ICU) and high dependency unit (HDU) provide round-the-clock monitoring and advanced life support for critically ill patients. Equipped with ventilators, cardiac monitors, and a multi-disciplinary team of intensivists, we deliver life-saving care when it matters most.
              </p>
              <a href="tel:+2348034263614">
                <Button className="gap-2">
                  <Phone className="h-4 w-4" /> Emergency: +234 803 426 3614
                </Button>
              </a>
            </div>
            <div className="rounded-xl overflow-hidden">
              <video autoPlay muted loop playsInline className="w-full aspect-video object-cover">
                <source src="/videos/critical_care.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 9. MEET OUR DOCTORS ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Our Team</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Meet Our Doctors</h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
              Experienced, compassionate specialists dedicated to your health.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 max-w-4xl mx-auto">
            {doctors.map((doc, i) => (
              <motion.div key={doc.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="text-center border border-border">
                  <CardContent className="p-5 md:p-6">
                    <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">{doc.initials}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground leading-snug">{doc.specialty}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. PATIENT TESTIMONIALS ═══ */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Testimonials</p>
            <h2 className="text-2xl sm:text-3xl font-bold">What Our Patients Say</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full border border-border">
                  <CardContent className="p-5 md:p-6 flex flex-col h-full">
                    <div className="flex items-center gap-0.5 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">"{t.quote}"</p>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 11. FACILITY GALLERY ═══ */}
      <section className="py-14 overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Our Facility</h2>
          <p className="text-muted-foreground text-sm text-center mt-2">A modern, well-equipped healthcare environment.</p>
        </div>
        <div className="relative">
          <div className="flex animate-scroll gap-5 w-max">
            {[...facilityImages, ...facilityImages].map((img, i) => (
              <div key={i} className="relative shrink-0 w-[300px] sm:w-[360px]">
                <img src={img.src} alt={img.caption} className="rounded-lg w-full h-52 object-cover" loading="lazy" />
                <div className="absolute bottom-3 left-3 bg-foreground/70 text-white rounded px-2.5 py-1">
                  <span className="text-xs font-medium">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 12. CTA BANNER ═══ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "hsl(345, 78%, 28%)" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Book an Appointment Today
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto mb-8">
            Whether it's a specialist consultation, endoscopy procedure, or emergency care — our team is ready. Take the first step towards safe care.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/2348034263614" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                WhatsApp Us
              </Button>
            </a>
            <a href="tel:+2348034263614">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-white/25 text-white hover:bg-white/10">
                <Phone className="h-4 w-4" /> Call +234 803 426 3614
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 13. INSURANCE / HMO PARTNERS ═══ */}
      <section className="py-14 border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold">Accepted Insurance & HMO Partners</h2>
            <p className="text-muted-foreground text-sm mt-1">We work with leading health insurance providers across Nigeria.</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {insurancePartners.map((name) => (
              <div key={name} className="bg-muted rounded px-4 py-2.5">
                <span className="text-sm font-medium text-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 14. LOCATION ═══ */}
      <section className="py-14 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold">Find Us</h2>
            <p className="text-muted-foreground text-sm mt-1 flex items-center justify-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> 67 Sam Shonibare Street, off Ogunlana Drive, Surulere, Lagos
            </p>
          </div>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-border">
            <iframe
              title="Safecare Clinix Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0!2d3.3567!3d6.4969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c!2sSam+Shonibare+Street+Surulere+Lagos!5e0!3m2!1sen!2sng"
              width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
