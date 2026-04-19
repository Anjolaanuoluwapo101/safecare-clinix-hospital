import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, ArrowLeft, Share2, BookOpen, X } from "lucide-react";
import medFact1 from "@/assets/med_fact_1.jpg";
import medFact2 from "@/assets/med_fact_2.jpg";
import lastCheckup from "@/assets/last_checkup.jpg";

const articles = [
  {
    id: 1, title: "The Health Benefits of Laughter", image: medFact1, readTime: 4,
    category: "Wellness",
    excerpt: "Laughter reduces stress hormones, boosts immunity, and promotes overall well-being. Discover why doctors recommend a daily dose of humor.",
    content: [
      "Laughter has long been recognised as a powerful tool for improving both mental and physical health. When you laugh, your body releases endorphins — the brain's natural feel-good chemicals — which create a sense of well-being and can even temporarily relieve pain. Research conducted at institutions such as the Mayo Clinic and Loma Linda University has consistently shown that laughter triggers positive physiological changes that can last for hours after the moment has passed.",
      "One of the most significant benefits of laughter is its ability to reduce stress. When we laugh, cortisol and adrenaline levels drop, and the body's relaxation response kicks in. This is why a good laugh can feel like pressing a reset button after a difficult day. For patients dealing with chronic conditions such as hypertension, diabetes, or heart disease, managing stress is a critical component of treatment — and laughter therapy is now being incorporated into care plans at progressive healthcare facilities worldwide.",
      "Laughter also strengthens the immune system. Studies have demonstrated that laughter increases the production of antibodies and activates immune cells like T-cells and natural killer cells, helping the body fight off infections more effectively. In a clinical setting, patients who maintain a positive outlook and engage in laughter-based activities have been observed to recover faster from surgeries and illnesses compared to those who do not.",
      "Beyond the physiological effects, laughter plays a vital social role. It strengthens relationships, diffuses tension, and fosters a sense of connection between people. In hospital environments, clown doctors and laughter therapy sessions have been used with remarkable success, especially in paediatric wards. The simple act of sharing a genuine laugh can reduce a patient's anxiety before a procedure and create a more healing environment overall.",
      "At Safecare Clinix, we encourage our patients to embrace the lighter side of life as part of a holistic approach to health. While laughter alone cannot replace medical treatment, it is a cost-free, side-effect-free complement that supports healing, boosts mood, and enhances quality of life. So the next time someone tells you laughter is the best medicine — they may be more right than you think."
    ]
  },
  {
    id: 2, title: "What is a Colonoscopy?", image: medFact2, readTime: 6,
    category: "Procedures",
    excerpt: "A colonoscopy is a vital screening procedure that helps detect colon cancer early. Learn what to expect before, during, and after the procedure.",
    content: [
      "A colonoscopy is a medical procedure that allows a gastroenterologist to examine the inner lining of the large intestine (colon and rectum) using a thin, flexible tube called a colonoscope. This instrument is equipped with a tiny camera and light source, which transmits real-time images to a monitor, enabling the doctor to identify abnormalities such as polyps, ulcers, inflammation, or signs of colorectal cancer.",
      "Colonoscopy is widely regarded as the gold standard for colorectal cancer screening. Colorectal cancer is one of the most common cancers globally, yet it is also one of the most preventable when detected early. During a colonoscopy, precancerous polyps can be identified and removed on the spot — effectively preventing cancer before it develops. Medical guidelines recommend that adults begin routine colonoscopy screening at age 45, or earlier if there is a family history of colorectal cancer or other risk factors.",
      "Preparation for a colonoscopy typically involves a bowel preparation regimen the day before the procedure. This includes a clear liquid diet and a prescribed laxative solution that clears the colon so the doctor can see the lining clearly. While the preparation can be uncomfortable, it is a crucial step in ensuring an accurate examination. At Safecare Clinix, our team provides detailed, easy-to-follow preparation instructions and is available to answer any questions patients may have.",
      "During the procedure itself, patients are usually given sedation to ensure comfort. The colonoscope is gently inserted through the rectum and advanced through the colon. The entire procedure typically takes between 20 and 40 minutes. If polyps or abnormal tissue are found, they can often be removed or biopsied during the same session. Most patients feel little to no discomfort and can return home the same day, although they will need someone to drive them due to the sedation.",
      "After the procedure, patients may experience mild bloating or cramping as the air introduced during the examination is expelled. Results from biopsies, if taken, are usually available within a few days. At Safecare Clinix, our endoscopy unit is staffed by experienced gastroenterologists who perform hundreds of colonoscopies annually, adhering to international standards of care and infection control. We believe early detection saves lives, and we encourage every eligible patient to schedule their screening."
    ]
  },
  {
    id: 3, title: "When Was Your Last Medical Check-Up?", image: lastCheckup, readTime: 3,
    category: "Prevention",
    excerpt: "Regular health check-ups can catch potential issues early. Find out which screenings you should schedule based on your age and risk factors.",
    content: [
      "Preventive healthcare is one of the most effective strategies for maintaining long-term health. Regular medical check-ups allow your doctor to assess your overall health status, identify risk factors for common diseases, and detect conditions at an early stage when they are most treatable. Yet despite the clear benefits, many people only visit a doctor when they feel unwell — missing the opportunity to prevent illness before symptoms appear.",
      "The specific screenings recommended for you depend on factors such as age, sex, family history, and lifestyle. For adults over 30, routine check-ups should include blood pressure measurement, blood glucose testing, cholesterol screening, and a complete blood count. Women should also undergo cervical cancer screening (Pap smear) and breast examinations, while men over 40 should discuss prostate screening with their doctor. These tests are quick, minimally invasive, and can reveal conditions like hypertension, diabetes, and high cholesterol that often develop silently over years.",
      "For patients over 45, additional screenings become important. These include colonoscopy for colorectal cancer, bone density scans (especially for postmenopausal women), cardiac stress testing for those with risk factors, and eye examinations for conditions like glaucoma and diabetic retinopathy. Liver and kidney function tests are also recommended, particularly for patients with a history of alcohol use, diabetes, or long-term medication use.",
      "At Safecare Clinix, we offer comprehensive health check-up packages tailored to different age groups and risk profiles. Our packages are designed to be thorough yet affordable, and our medical team takes the time to discuss results with every patient, providing personalised advice on lifestyle modifications, dietary changes, and follow-up care. We believe that every patient deserves to know where they stand with their health — and that knowledge is the first step towards a longer, healthier life.",
      "Don't wait for symptoms to appear. Schedule your check-up today and take control of your health. Whether you're 25 or 65, there's always something proactive you can do. At Safecare Clinix, prevention isn't just a slogan — it's a core part of how we care for our community."
    ]
  },
  {
    id: 4, title: "Understanding High Blood Pressure", image: medFact1, readTime: 5,
    category: "Wellness",
    excerpt: "Hypertension is a silent killer affecting millions of Nigerians. Learn the risk factors, symptoms to watch for, and how to manage your blood pressure effectively.",
    content: [
      "High blood pressure, or hypertension, is often called the 'silent killer' because it typically produces no symptoms until it has caused significant damage to the heart, kidneys, brain, or blood vessels. According to the World Health Organization, hypertension affects more than 1.3 billion people worldwide, and Nigeria has one of the highest prevalence rates in Africa, with an estimated 30–45% of adults affected.",
      "Blood pressure is measured in millimetres of mercury (mmHg) and recorded as two numbers: systolic (the pressure when the heart beats) over diastolic (the pressure when the heart rests). A normal reading is below 120/80 mmHg. Readings consistently at or above 140/90 mmHg indicate hypertension. Risk factors include a family history of the condition, obesity, excessive salt intake, physical inactivity, chronic stress, smoking, and excessive alcohol consumption.",
      "The consequences of uncontrolled hypertension are severe. Over time, high blood pressure damages the walls of arteries, making them less elastic and reducing blood flow to vital organs. This increases the risk of heart attack, stroke, kidney failure, and vision loss. In pregnant women, hypertension can lead to pre-eclampsia, a dangerous condition that threatens both mother and baby.",
      "Managing hypertension involves a combination of lifestyle changes and, in many cases, medication. Dietary modifications such as reducing salt intake, eating more fruits and vegetables, and limiting processed foods can have a significant impact. Regular physical activity — even 30 minutes of brisk walking most days — helps lower blood pressure naturally. For patients who require medication, several classes of antihypertensive drugs are available, and your doctor will work with you to find the most effective regimen with the fewest side effects.",
      "At Safecare Clinix, we provide comprehensive hypertension screening, management, and follow-up. Our doctors take the time to educate patients about their condition and empower them with the tools to manage it effectively. If you haven't had your blood pressure checked recently, we encourage you to visit us for a simple, quick assessment that could save your life."
    ]
  },
  {
    id: 5, title: "Preparing for Surgery: What You Need to Know", image: medFact2, readTime: 7,
    category: "Procedures",
    excerpt: "Going in for surgery can be daunting. Here's a comprehensive guide on how to prepare physically and mentally for a successful surgical experience.",
    content: [
      "Surgery, whether elective or emergency, is a significant medical event that requires careful preparation. Understanding what to expect before, during, and after your procedure can help reduce anxiety, improve outcomes, and speed up recovery. At Safecare Clinix, we believe that an informed patient is an empowered patient, and we take the time to walk every surgical candidate through the entire process.",
      "Pre-operative preparation typically begins with a thorough assessment by your surgeon and anaesthetist. This includes a review of your medical history, current medications, allergies, and any previous surgeries. Blood tests, imaging studies, and an electrocardiogram (ECG) may be ordered to ensure you are fit for surgery. Patients taking blood-thinning medications, herbal supplements, or certain vitamins may be advised to stop them several days before the procedure to reduce the risk of bleeding.",
      "On the day of surgery, patients are usually required to fast — typically no food or drink for at least 8 hours before the procedure. This is essential to reduce the risk of aspiration during anaesthesia. You should wear comfortable, loose clothing and leave valuables at home. A responsible adult should accompany you, as you will not be able to drive yourself home after receiving anaesthesia or sedation.",
      "Post-operative care is equally important. Depending on the type of surgery, you may be monitored in a recovery ward for several hours or admitted overnight. Pain management, wound care, and early mobilisation are key components of post-surgical recovery. Your medical team will provide specific instructions on diet, activity restrictions, medication schedules, and warning signs that should prompt a return visit. Following these instructions carefully is critical to preventing complications such as infection, blood clots, or delayed healing.",
      "At Safecare Clinix, our surgical team includes experienced surgeons, anaesthetists, and theatre nurses who work together to provide the safest possible surgical experience. From your first consultation to your final follow-up visit, we are committed to your care and recovery. If you have questions about an upcoming procedure, don't hesitate to reach out — we are here to help you every step of the way."
    ]
  },
  {
    id: 6, title: "The Importance of Vaccinations for Adults", image: lastCheckup, readTime: 4,
    category: "Prevention",
    excerpt: "Vaccinations aren't just for children. Discover which immunisations adults should consider and why staying up to date matters for your health.",
    content: [
      "While most people associate vaccinations with childhood, immunisation remains an important part of adult healthcare. Vaccines protect against infectious diseases that can cause serious illness, hospitalisation, or death — even in otherwise healthy adults. As we age, our immune system naturally weakens, making booster doses and new vaccinations increasingly important.",
      "Key vaccines recommended for adults include the annual influenza (flu) vaccine, which is especially important for adults over 65, pregnant women, and those with chronic conditions such as diabetes, asthma, or heart disease. The pneumococcal vaccine protects against pneumonia and is recommended for adults over 65 and those with certain medical conditions. Hepatitis B vaccination is recommended for healthcare workers, travellers, and anyone who may not have been vaccinated in childhood.",
      "The tetanus-diphtheria-pertussis (Tdap) booster should be given every 10 years, and the shingles (herpes zoster) vaccine is recommended for adults over 50. For travellers, additional vaccines such as yellow fever, typhoid, and meningococcal vaccines may be required depending on the destination. Your doctor can help you determine which vaccines are appropriate based on your age, health status, travel plans, and occupation.",
      "At Safecare Clinix, we maintain a comprehensive adult vaccination programme and can advise you on which immunisations you need. Our nurses administer vaccines in a comfortable clinical setting, and we maintain records that you can access whenever needed — for travel, employment, or personal health tracking.",
      "Staying up to date with your vaccinations is one of the simplest and most effective ways to protect yourself and those around you. If you're unsure about your vaccination status, visit Safecare Clinix for a review. Prevention is always better than cure, and vaccines are a proven, safe, and cost-effective form of preventive medicine."
    ]
  },
];

const categories_list = ["All", "Wellness", "Procedures", "Prevention"];

const Education = () => {
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  const toggleLike = (id: number) => setLikes((prev) => ({ ...prev, [id]: !prev[id] }));

  const filtered = articles.filter(
    (a) => activeCategory === "All" || a.category === activeCategory
  );

  return (
    <div>
      {/* Hero */}
      <section className="pt-20 pb-10 md:pt-24 md:pb-14 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <Badge variant="outline" className="mb-3 text-xs text-primary border-primary/30">
              <BookOpen className="h-3 w-3 mr-1" /> Patient Education Hub
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Health Articles & Insights</h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
              Stay informed with expert-written articles on wellness, medical procedures, and preventive care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden border border-border">
          <div className="grid md:grid-cols-2">
            <img src={articles[0].image} alt={articles[0].title} className="w-full h-48 md:h-full object-cover" />
            <CardContent className="p-6 md:p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-3 bg-primary/10 text-primary border-0 text-[11px]">Featured Article</Badge>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">{articles[0].title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{articles[0].excerpt}</p>
              <Button variant="outline" size="sm" className="w-fit gap-2" onClick={() => setSelectedArticle(articles[0])}>
                Read Full Article <ArrowLeft className="h-3 w-3 rotate-180" />
              </Button>
            </CardContent>
          </div>
        </Card>
      </section>

      {/* Category Tabs */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories_list.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((article, i) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="overflow-hidden border border-border hover:border-primary/15 hover:shadow-md transition-all duration-200 h-full flex flex-col cursor-pointer" onClick={() => setSelectedArticle(article)}>
                <div className="relative">
                  <img src={article.image} alt={article.title} className="w-full h-48 object-cover" loading="lazy" />
                  <span className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Clock className="h-3 w-3" />{article.readTime} min read
                  </span>
                  <Badge className="absolute top-3 right-3 bg-primary/80 text-primary-foreground text-[10px] border-0">{article.category}</Badge>
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-semibold mb-2 text-foreground leading-snug">{article.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(article.id); }}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                        likes[article.id] ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Heart className={`h-4 w-4 transition-colors ${likes[article.id] ? "fill-primary text-primary" : ""}`} />
                      {likes[article.id] ? "Liked" : "Like"}
                    </button>
                    <span className="text-xs text-primary font-medium">Read More →</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-[80]"
              onClick={() => setSelectedArticle(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-x-4 top-[5vh] bottom-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-card rounded-2xl shadow-2xl z-[85] overflow-hidden flex flex-col"
            >
              {/* Modal Header Image */}
              <div className="relative shrink-0">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-48 md:h-56 object-cover" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                >
                  <X className="h-4 w-4 text-foreground" />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <Badge className="bg-primary/90 text-primary-foreground text-[10px] border-0">{selectedArticle.category}</Badge>
                  <Badge variant="outline" className="bg-card/90 backdrop-blur-sm text-foreground text-[10px] border-0">
                    <Clock className="h-3 w-3 mr-1" />{selectedArticle.readTime} min read
                  </Badge>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 leading-snug">{selectedArticle.title}</h2>
                <div className="space-y-4">
                  {selectedArticle.content.map((paragraph, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                {/* Share & Related */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Share this article with friends and family</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Related Articles</h3>
                  <div className="grid gap-3">
                    {articles
                      .filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category)
                      .slice(0, 2)
                      .map((a) => (
                        <button key={a.id} onClick={() => setSelectedArticle(a)} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
                          <img src={a.image} alt={a.title} className="h-12 w-12 rounded-md object-cover shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{a.title}</p>
                            <p className="text-xs text-muted-foreground">{a.readTime} min read</p>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border shrink-0 flex items-center justify-between">
                <button
                  onClick={() => toggleLike(selectedArticle.id)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    likes[selectedArticle.id] ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${likes[selectedArticle.id] ? "fill-primary text-primary" : ""}`} />
                  {likes[selectedArticle.id] ? "Liked" : "Like"}
                </button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(null)}>Close</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Education;
