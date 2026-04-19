import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, CheckCircle2, Clock, Phone } from "lucide-react";
import buildingImg from "@/assets/building.jpg";

const categories = ["All", "Consultation", "Endoscopy", "Surgery", "Critical Care"];

const services = [
  {
    title: "General Surgery", tag: "Consultation",
    desc: "Comprehensive surgical consultation and management for a wide range of conditions including abdominal, thyroid, and breast disorders.",
    benefits: ["Pre-operative assessment", "Open & minimally invasive options", "Post-operative follow-up"],
    expect: "Initial consultation takes 30–45 minutes. Bring previous medical records."
  },
  {
    title: "Cardiothoracic Surgery", tag: "Surgery",
    desc: "Specialised surgical care for conditions of the heart, lungs, and chest. Including VATS, chest wall surgery, and esophageal procedures.",
    benefits: ["Video Assisted Thoracic Surgery (VATS)", "Chest & lung surgery", "Esophageal surgery"],
    expect: "Requires referral and pre-operative cardiac workup."
  },
  {
    title: "Nephrology", tag: "Consultation",
    desc: "Expert kidney care including chronic kidney disease management, dialysis planning, and electrolyte balance.",
    benefits: ["Chronic kidney disease management", "Dialysis access planning", "Electrolyte & fluid balance care"],
    expect: "Initial consultation includes blood work and urine analysis."
  },
  {
    title: "Cardiology", tag: "Consultation",
    desc: "Comprehensive cardiovascular assessment and management including ECG, echocardiography, and heart failure care.",
    benefits: ["Cardiac risk assessment", "ECG & echocardiography", "Heart failure management"],
    expect: "Consultation takes 30–45 minutes. Fasting may be required for blood tests."
  },
  {
    title: "Urology", tag: "Consultation",
    desc: "Specialist care for urinary tract and male reproductive conditions including prostate surgery (TURP).",
    benefits: ["Prostate assessment & TURP", "Kidney stone management", "Urinary tract care"],
    expect: "Bring any previous imaging or lab results."
  },
  {
    title: "Neurosurgery", tag: "Surgery",
    desc: "Surgical management of conditions affecting the brain, spine, and peripheral nerves by experienced neurosurgeons.",
    benefits: ["Brain & spinal surgery", "Peripheral nerve procedures", "Post-surgical rehabilitation"],
    expect: "Requires referral with MRI/CT imaging."
  },
  {
    title: "Orthopaedics Surgery", tag: "Surgery",
    desc: "Surgical care for musculoskeletal conditions including fracture management, joint surgery, and sports injuries.",
    benefits: ["Fracture fixation", "Joint replacement", "Sports injury management"],
    expect: "X-ray or MRI may be required before consultation."
  },
  {
    title: "Paediatrics Surgery", tag: "Surgery",
    desc: "Specialised surgical care for children, from neonates to adolescents, for congenital and acquired conditions.",
    benefits: ["Congenital anomaly repair", "Paediatric abdominal surgery", "Age-appropriate anaesthesia"],
    expect: "Parent/guardian must accompany the child."
  },
  {
    title: "Plastic Surgery", tag: "Surgery",
    desc: "Reconstructive and cosmetic surgical procedures performed by certified plastic surgeons.",
    benefits: ["Reconstructive surgery", "Burns management", "Cosmetic procedures"],
    expect: "Initial consultation determines surgical plan and expectations."
  },
  {
    title: "Gastroenterology", tag: "Consultation",
    desc: "Specialist care for digestive system disorders including liver disease, peptic ulcers, and inflammatory bowel disease.",
    benefits: ["Liver disease management", "GI disorder diagnosis", "Nutritional counselling"],
    expect: "Fasting may be required for certain diagnostic tests."
  },
  {
    title: "Pulmonology", tag: "Consultation",
    desc: "Respiratory medicine covering asthma, COPD, lung infections, and breathing disorders.",
    benefits: ["Lung function testing", "Asthma & COPD management", "Respiratory infection care"],
    expect: "Bring previous chest X-rays if available."
  },
  {
    title: "Endocrinology", tag: "Consultation",
    desc: "Management of hormonal and metabolic disorders including diabetes, thyroid disease, and adrenal conditions.",
    benefits: ["Diabetes management", "Thyroid disorder care", "Hormonal balance assessment"],
    expect: "Blood tests typically required; fasting from midnight before visit."
  },
  {
    title: "Obstetrics & Gynaecology", tag: "Consultation",
    desc: "Full-spectrum women's health from antenatal care through delivery, postnatal care, and gynaecological consultations.",
    benefits: ["Antenatal & postnatal care", "Routine & high-risk pregnancy", "Gynaecological surgeries"],
    expect: "Antenatal visits scheduled monthly, then bi-weekly in the third trimester."
  },
  {
    title: "Upper GI Endoscopy", tag: "Endoscopy",
    desc: "Diagnostic examination of the oesophagus, stomach, and duodenum using a high-definition endoscope.",
    benefits: ["Ulcer detection & biopsy", "H. pylori testing", "Sedation-assisted comfort"],
    expect: "Fasting for 8–12 hours required. Procedure takes 15–20 minutes."
  },
  {
    title: "Colonoscopy", tag: "Endoscopy",
    desc: "Examination of the entire large intestine for polyps, cancer screening, and inflammatory bowel disease.",
    benefits: ["Polyp detection & removal", "Cancer screening", "Biopsy capability"],
    expect: "Bowel preparation required the day before. Procedure takes 20–40 minutes."
  },
  {
    title: "Bronchoscopy", tag: "Endoscopy",
    desc: "Visual examination of the airways and lungs for diagnosis of respiratory conditions.",
    benefits: ["Airway assessment", "Biopsy & sampling", "Therapeutic interventions"],
    expect: "Fasting required. Performed under sedation or local anaesthesia."
  },
  {
    title: "Cystoscopy", tag: "Endoscopy",
    desc: "Examination of the bladder and urethra for urological conditions including stones and tumours.",
    benefits: ["Bladder visualisation", "Stone management", "Tumour assessment"],
    expect: "Local or general anaesthesia. Usually an outpatient procedure."
  },
  {
    title: "Video Laryngoscopy", tag: "Endoscopy",
    desc: "Visualisation of the larynx and vocal cords for voice disorders, swallowing difficulties, and airway assessment.",
    benefits: ["Vocal cord assessment", "Swallowing evaluation", "Airway management"],
    expect: "Quick outpatient procedure. No special preparation needed."
  },
  {
    title: "Laparoscopic Surgery", tag: "Surgery",
    desc: "Minimally invasive keyhole surgeries for abdominal conditions with faster recovery and smaller incisions.",
    benefits: ["Smaller incisions", "Faster recovery", "Less post-operative pain"],
    expect: "Pre-surgical assessment required. Usually 1–2 day hospital stay."
  },
  {
    title: "Gastric Sleeve Surgery", tag: "Surgery",
    desc: "Weight reduction surgery that removes a portion of the stomach to reduce food intake and promote weight loss.",
    benefits: ["Significant weight loss", "Improved metabolic health", "Reduced comorbidities"],
    expect: "Requires BMI assessment, nutritional counselling, and psychological evaluation."
  },
  {
    title: "Gastric Balloon Insertion", tag: "Surgery",
    desc: "Non-surgical weight reduction procedure where a balloon is placed in the stomach to promote early satiety.",
    benefits: ["Non-surgical approach", "Temporary & reversible", "Supports lifestyle changes"],
    expect: "Endoscopic procedure. Balloon typically removed after 6 months."
  },
  {
    title: "Vascular Surgery", tag: "Surgery",
    desc: "Surgical management of blood vessel conditions including varicose veins, aneurysms, and peripheral artery disease.",
    benefits: ["Varicose vein treatment", "Aneurysm repair", "Peripheral vascular care"],
    expect: "Doppler ultrasound may be required before consultation."
  },
  {
    title: "Prostate Surgery (TURP)", tag: "Surgery",
    desc: "Transurethral resection of the prostate for benign prostatic hyperplasia causing urinary symptoms.",
    benefits: ["Improved urinary flow", "Minimally invasive approach", "Short hospital stay"],
    expect: "Pre-operative PSA test and urological assessment required."
  },
  {
    title: "Intensive Care Unit (ICU)", tag: "Critical Care",
    desc: "24/7 intensive care with advanced life support, ventilator management, and round-the-clock monitoring.",
    benefits: ["Ventilator & cardiac monitoring", "Multi-disciplinary critical care team", "Advanced life support"],
    expect: "Emergency admission. Family briefed on patient progress regularly."
  },
  {
    title: "High Dependency Unit (HDU)", tag: "Critical Care",
    desc: "Step-down unit providing close monitoring for patients who require more care than a general ward but less than ICU.",
    benefits: ["Continuous monitoring", "Post-ICU step-down care", "Dedicated nursing staff"],
    expect: "Admission via ICU or post-surgical transfer."
  },
];

const Services = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = services.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.tag.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "All" || s.tag === activeTag;
    return matchSearch && matchTag;
  });

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${buildingImg})` }}>
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container relative mx-auto px-4 py-10 md:py-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">Safecare Clinix & Endoscopy Centre</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">Our Medical Services</h1>
            <p className="text-white/70 max-w-lg text-sm sm:text-base">
              {services.length} specialist services across consultations, endoscopy, advanced surgeries, and critical care.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTag(cat)}
              className={`px-3.5 py-1.5 rounded text-xs font-medium transition-colors ${
                activeTag === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-md mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} service{filtered.length !== 1 ? "s" : ""} found</p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => {
              const isExpanded = expanded === s.title;
              return (
                <motion.div key={s.title} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}>
                  <Card
                    className="cursor-pointer border border-border hover:border-primary/20 transition-colors h-full"
                    onClick={() => setExpanded(isExpanded ? null : s.title)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-sm text-foreground">{s.title}</h3>
                        <span className="text-[10px] font-medium text-primary bg-primary/5 px-2 py-0.5 rounded">{s.tag}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">{s.desc}</p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                            <div className="pt-3 border-t border-border mt-2 space-y-3">
                              <div>
                                <p className="text-xs font-semibold text-foreground mb-1.5">Key Benefits</p>
                                {s.benefits.map((b) => (
                                  <div key={b} className="flex items-start gap-1.5 mb-1">
                                    <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                                    <span className="text-xs text-muted-foreground">{b}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-start gap-1.5">
                                <Clock className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                                <span className="text-xs text-muted-foreground">{s.expect}</span>
                              </div>
                              <a href="tel:+2348034263614" onClick={(e) => e.stopPropagation()}>
                                <Button className="w-full mt-1 gap-2 text-xs" size="sm">
                                  <Phone className="h-3.5 w-3.5" /> Book Appointment
                                </Button>
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!isExpanded && (
                        <button className="flex items-center gap-1 text-xs font-medium text-primary mt-2">
                          View Details <ArrowRight className="h-3 w-3" />
                        </button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-10 text-sm">No services match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Services;
