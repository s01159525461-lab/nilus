document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     1. Dictionary للترجمات (عربي & انجليزي)
  ========================================== */
  const translations = {
    ar: {
      nav_destinations: "الوجهات",
      nav_how: "إزاي بنشتغل",
      nav_booking: "احجز رحلتك",
      nav_stories: "تجارب مسافرين",
      nav_about: "مين إحنا",
      nav_cta: "ابدأ رحلتك",
      lang_btn: "English",

      hero_eyebrow: "مش باقة جاهزة… رحلة مصمّمة عليك",
      hero_title: "اختار وجهتك،<br>وسيبنا نبني الباقي",
      hero_sub: "حدد الميعاد، عدد الأيام، عدد اللي معاك، والحاجات اللي نفسك تعملها — وإحنا نجهزلك رحلة متظبطة على مزاجك، من سيوة للبحر الأحمر لشوارع مصر القديمة.",
      hero_btn_primary: "اطلب رحلتك دلوقتي",
      hero_btn_text: "شوف الوجهات",

      hc_label: "رحلتك في أرقام",
      hc_stat1: "رحلة اتصممت خصيصيا",
      hc_stat2: "وجهات رئيسية في مصر",
      hc_stat3: "رد على طلبك",
      hc_cta: "ابدأ التخطيط",

      dest_head_title: "وجهات نعرفها كويس",
      dest_head_sub: "كل وجهة ليها طابع مختلف — اختار اللي يناسب مزاجك، وقولنا وإحنا نظبطلك التفاصيل.",
      d1_tag: "رحلة نيلية",
      d1_title: "الأقصر وأسوان",
      d1_desc: "معابد فرعونية، فلوكة على النيل، وغروب مش هتنساه.",
      d2_tag: "بحر أحمر",
      d2_title: "شرم الشيخ والغردقة",
      d2_desc: "غوص، شعاب مرجانية، وأيام هادية على الشاطئ.",
      d3_tag: "واحة صحراوية",
      d3_title: "سيوة",
      d3_desc: "عيون مياه طبيعية، كثبان رملية، وسفاري تحت النجوم.",
      d4_tag: "تاريخ وثقافة",
      d4_title: "مصر القديمة",
      d4_desc: "الأهرامات، خان الخليلي، ومتاحف بتحكي حكاية بلد كاملة.",
      d5_tag: "إيقاع هادي",
      d5_title: "دهب",
      d5_desc: "البلو هول، كافيهات على البحر، وأجواء بعيدة عن الزحمة.",
      d6_tag: "صيف وسهر",
      d6_title: "الساحل الشمالي",
      d6_desc: "رمال بيضا، مياه فيروزي، ولياليها معروفة.",

      how_title: "إزاي بتحجز مع نيلوس",
      how_sub: "أربع خطوات بس، ومفيش تعقيد.",
      step1_title: "اختار وجهتك",
      step1_desc: "من الوجهات اللي عرضناها، أو قولنا مش عارف تختار وإحنا نقترح عليك.",
      step2_title: "حدد التفاصيل",
      step2_desc: "الميعاد، عدد الأيام، وعدد الأشخاص اللي مسافرين معاك.",
      step3_title: "اختار أنشطتك",
      step3_desc: "غوص، سفاري، جولة تاريخية، أو أي حاجة نفسك تجربها في الرحلة.",
      step4_title: "هنرجعلك بعرض",
      step4_desc: "هنراجع طلبك ونبعتلك تفاصيل الرحلة والسعر خلال 24 ساعة.",

      bk_eyebrow: "الخطوة الأهم",
      bk_title: "اختر رحلتك بنفسك",
      bk_sub: "مش هتختار من باقة جاهزة — إنت اللي بترسم شكل رحلتك، وإحنا بننفذ.",
      ptrack_1: "الوجهة والميعاد",
      ptrack_2: "تفاصيل الرحلة",
      ptrack_3: "الأنشطة",
      ptrack_4: "بياناتك والمراجعة",

      s1_head: "هتروح فين، وإمتى؟",
      lbl_destination: "الوجهة",
      opt_select: "اختار وجهة",
      opt_not_sure: "مش متأكد — اقترحوا عليّ",
      lbl_start_date: "تاريخ بداية الرحلة",

      s2_head: "كام يوم، وكام شخص؟",
      lbl_days: "عدد أيام الرحلة",
      lbl_people: "عدد الأشخاص",

      s3_head: "عاوز تعمل إيه في الرحلة؟",
      s3_hint: "اختار حاجة أو أكتر (اختياري).",
      act_1: "غوص واستكشاف الشعاب المرجانية",
      act_2: "سفاري في الصحراء",
      act_3: "جولة تاريخية بالمتاحف والمعابد",
      act_4: "رحلة نيلية بالفلوكة",
      act_5: "تجربة طهي محلي",
      act_6: "تصوير احترافي للرحلة",
      act_7: "استقبال VIP بالمطار",
      act_8: "تخييم ليلي بالصحراء",
      lbl_notes: "حابب تضيف حاجة تانية؟ (اختياري)",

      s4_head: "بياناتك عشان نرجعلك",
      lbl_name: "الاسم بالكامل",
      lbl_phone: "رقم الموبايل",
      lbl_email: "البريد الإلكتروني (اختياري)",
      sum_title: "ملخص طلبك",
      btn_next: "التالي",
      btn_prev: "السابق",
      btn_confirm: "أكد الطلب",

      m_title: "وصلنا طلبك!",
      m_sub1: "رقم رحلتك",
      m_sub2: "فريقنا هيتواصل معاك خلال 24 ساعة على الرقم اللي بعتهولنا.",
      m_btn: "تمام",

      st_1: "سنين خبرة في تنظيم الرحلات",
      st_2: "مسافر وثقوا فينا",
      st_3: "عملاء بيرجعوا يحجزوا تاني",
      st_4: "مرشد سياحي في فريقنا",

      st_head: "حكاية كل رحلة بتتحكي",
      st_sub: "مش إحنا اللي بنقول، خليهم هما يحكوا.",
      rev_1_p: '"طلبت رحلة سيوة بس أنا واتنين صحابي، وقولتلهم عاوزين تخييم وسفاري بس من غير زحمة مجموعات. جهزولنا برنامج مخصوص فعلاً حسينا إننا في رحلة خاصة."',
      rev_1_c: "— مريم عادل، رحلة سيوة",
      rev_2_p: '"أول مرة أحجز أونلاين وأحس إن حد بيسمعني فعلاً. حددت عدد الأيام وميعاد الغوص، وكل حاجة اتظبطت زي ما طلبت بالظبط."',
      rev_2_c: "— كريم حسن، رحلة دهب",
      rev_3_p: '"سافرنا عيلة كاملة سبع أشخاص للأقصر وأسوان، وطلبنا جولة تاريخية مبسطة عشان الأطفال. البرنامج كان متظبط على قدنا تمام."',
      rev_3_c: "— هدى فؤاد، رحلة الأقصر وأسوان",

      ab_eyebrow: "مين إحنا",
      ab_title: "نيلوس مش شركة تعرض باقات… دي طريقة تفكير",
      ab_desc: "بدأنا من فكرة بسيطة: كل مسافر مختلف عن التاني، فليه ياخد نفس البرنامج الجاهز اللي بياخده أي حد؟ من ٢٠١٦ وإحنا بنبني كل رحلة من الأول مع العميل، بنسمع اللي عاوزه فعلاً، وبنترجمه لبرنامج واقعي بسعر واضح من غير مفاجآت.",
      ab_pt1: "فريق محلي عارف كل تفصيلة في كل وجهة",
      ab_pt2: "أسعار واضحة من غير رسوم مخفية",
      ab_pt3: "دعم متواصل طول فترة الرحلة",

      f_tagline: "رحلات مصممة على مزاجك، جوه مصر.",
      f_links: "روابط",
      f_contact: "تواصل معانا",
      f_location: "القاهرة، مصر",
      f_follow: "تابعنا",
      f_rights: "نيلوس لتنظيم الرحلات. كل الحقوق محفوظة."
    },
    en: {
      nav_destinations: "Destinations",
      nav_how: "How it works",
      nav_booking: "Book your trip",
      nav_stories: "Stories",
      nav_about: "About us",
      nav_cta: "Start Your Trip",
      lang_btn: "عربي",

      hero_eyebrow: "Not a premade package… Tailored for you",
      hero_title: "Choose your destination,<br>and leave the rest to us",
      hero_sub: "Set your dates, trip duration, group size, and planned activities — we design a personalized trip from Siwa to the Red Sea to historic Cairo.",
      hero_btn_primary: "Request Your Trip Now",
      hero_btn_text: "View Destinations",

      hc_label: "Your Trip in Numbers",
      hc_stat1: "Customized Trips",
      hc_stat2: "Top Destinations",
      hc_stat3: "Response Time",
      hc_cta: "Start Planning",

      dest_head_title: "Destinations We Know Best",
      dest_head_sub: "Every destination has its own charm — pick what fits your mood and let us handle the rest.",
      d1_tag: "Nile Cruise",
      d1_title: "Luxor & Aswan",
      d1_desc: "Ancient temples, sailboat cruises, and unforgettable sunsets.",
      d2_tag: "Red Sea",
      d2_title: "Sharm El Sheikh & Hurghada",
      d2_desc: "Scuba diving, coral reefs, and relaxing days on the beach.",
      d3_tag: "Desert Oasis",
      d3_title: "Siwa Oasis",
      d3_desc: "Natural springs, sand dunes, and starry desert safaris.",
      d4_tag: "History & Culture",
      d4_title: "Old Cairo",
      d4_desc: "The Pyramids, Khan el-Khalili, and historic museums.",
      d5_tag: "Chilled Vibes",
      d5_title: "Dahab",
      d5_desc: "The Blue Hole, seaside cafes, and peaceful escapes.",
      d6_tag: "Summer & Nightlife",
      d6_title: "North Coast",
      d6_desc: "White sandy beaches, turquoise waters, and vibrant nights.",

      how_title: "How to Book with Nilus",
      how_sub: "Just four simple steps, zero hassle.",
      step1_title: "Choose Destination",
      step1_desc: "Select from our destinations, or ask us for recommendations.",
      step2_title: "Set Details",
      step2_desc: "Define dates, number of days, and traveler count.",
      step3_title: "Select Activities",
      step3_desc: "Diving, safaris, history tours, or custom preferences.",
      step4_title: "Get an Offer",
      step4_desc: "We review your request and send complete details within 24 hours.",

      bk_eyebrow: "The Main Step",
      bk_title: "Design Your Own Trip",
      bk_sub: "You don't select a rigid package — you craft your trip, we execute it.",
      ptrack_1: "Destination & Date",
      ptrack_2: "Trip Details",
      ptrack_3: "Activities",
      ptrack_4: "Review & Submit",

      s1_head: "Where and When?",
      lbl_destination: "Destination",
      opt_select: "Choose destination",
      opt_not_sure: "Not sure — Suggest for me",
      lbl_start_date: "Trip Start Date",

      s2_head: "How Many Days and Travelers?",
      lbl_days: "Trip Duration (Days)",
      lbl_people: "Number of People",

      s3_head: "What Would You Like to Do?",
      s3_hint: "Choose one or more options (Optional).",
      act_1: "Scuba Diving & Coral Reefs",
      act_2: "Desert Safari & Quad Biking",
      act_3: "Historical Museums & Temple Tour",
      act_4: "Nile River Felucca Cruise",
      act_5: "Local Culinary Experience",
      act_6: "Professional Trip Photography",
      act_7: "Airport VIP Reception",
      act_8: "Overnight Desert Camping",
      lbl_notes: "Any Special Requests? (Optional)",

      s4_head: "Your Contact Details",
      lbl_name: "Full Name",
      lbl_phone: "Mobile Number",
      lbl_email: "Email Address (Optional)",
      sum_title: "Request Summary",
      btn_next: "Next",
      btn_prev: "Previous",
      btn_confirm: "Confirm Request",

      m_title: "Request Received!",
      m_sub1: "Your Trip Ref",
      m_sub2: "Our team will contact you within 24 hours at the provided number.",
      m_btn: "Great",

      st_1: "Years of Travel Expertise",
      st_2: "Happy Travelers",
      st_3: "Returning Customers Rate",
      st_4: "Professional Tour Guides",

      st_head: "Stories from Our Travelers",
      st_sub: "Don't just take our word for it — hear from them.",
      rev_1_p: '"I booked a Siwa trip for myself and two friends, asking for camping without crowded groups. They built a fully private itinerary that exceeded expectations."',
      rev_1_c: "— Mariam Adel, Siwa Trip",
      rev_2_p: '"First time booking online where someone actually listened! Set my days and diving preferences, and everything was arranged flawlessly."',
      rev_2_c: "— Kareem Hassan, Dahab Trip",
      rev_3_p: '"We traveled as a family of seven to Luxor and Aswan with simplified historic tours for children. The program fit our needs perfectly."',
      rev_3_c: "— Hoda Fouad, Luxor & Aswan Trip",

      ab_eyebrow: "About Us",
      ab_title: "Nilus isn't just a trip provider… It's a philosophy",
      ab_desc: "We started with a simple belief: every traveler is unique. Since 2016, we build every itinerary from scratch with our clients, offering complete transparency with zero hidden charges.",
      ab_pt1: "Local expert team with deep destination insights",
      ab_pt2: "Clear pricing with no hidden fees",
      ab_pt3: "24/7 dedicated support during your trip",

      f_tagline: "Tailor-made journeys across Egypt.",
      f_links: "Links",
      f_contact: "Contact Us",
      f_location: "Cairo, Egypt",
      f_follow: "Follow Us",
      f_rights: "Nilus Tours. All rights reserved."
    }
  };

  let currentLang = "ar";
  const langToggleBtn = document.getElementById("lang-toggle");
  const langText = document.getElementById("lang-text");

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "ar" ? "en" : "ar";
      
      document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", currentLang);

      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[currentLang][key]) {
          el.innerHTML = translations[currentLang][key];
        }
      });

      if (langText) langText.textContent = translations[currentLang].lang_btn;
      updateSummary();
    });
  }

  /* ==========================================
     2. Header Scrolling & Mobile Navigation
  ========================================== */
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");

  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
      header.classList.toggle("nav-open");
    });
  }

  /* ==========================================
     3. Booking Wizard & Multi-Step Logic
  ========================================== */
  let currentStep = 1;
  const formSteps = document.querySelectorAll(".form-step");
  const progressItems = document.querySelectorAll("#progressTrack li");
  const nextBtns = document.querySelectorAll(".btn-next");
  const prevBtns = document.querySelectorAll(".btn-prev");
  const bookingForm = document.getElementById("bookingForm");

  function goToStep(step) {
    formSteps.forEach(s => s.classList.remove("active"));
    const activeForm = document.querySelector(`.form-step[data-step="${step}"]`);
    if (activeForm) activeForm.classList.add("active");

    progressItems.forEach(p => {
      const pStep = parseInt(p.getAttribute("data-step"));
      p.classList.remove("active", "done");
      if (pStep === step) p.classList.add("active");
      else if (pStep < step) p.classList.add("done");
    });

    currentStep = step;
    if (step === 4) updateSummary();
  }

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      goToStep(currentStep - 1);
    });
  });

  function validateStep(step) {
    let valid = true;
    const err1 = document.getElementById("err1");
    if (err1) err1.textContent = "";

    if (step === 1) {
      const dest = document.getElementById("destination") ? document.getElementById("destination").value : "";
      const date = document.getElementById("startDate") ? document.getElementById("startDate").value : "";
      if (!dest || !date) {
        valid = false;
        if (err1) err1.textContent = currentLang === "ar" ? "برجاء اختار الوجهة وتاريخ بداية الرحلة." : "Please select a destination and start date.";
      }
    }
    return valid;
  }

  /* ==========================================
     4. Stepper Buttons Logic (+ / -)
  ========================================== */
  document.querySelectorAll(".stepper").forEach(stepper => {
    const decBtn = stepper.querySelector('[data-action="dec"]');
    const incBtn = stepper.querySelector('[data-action="inc"]');
    const output = stepper.querySelector("output");
    const parentField = stepper.closest(".field");
    const hiddenInput = parentField ? parentField.querySelector('input[type="hidden"]') : null;

    let min = parseInt(stepper.getAttribute("data-min")) || 1;
    let max = parseInt(stepper.getAttribute("data-max")) || 30;
    let val = parseInt(stepper.getAttribute("data-value")) || min;

    function updateVal(newVal) {
      if (newVal >= min && newVal <= max) {
        val = newVal;
        if (output) output.textContent = val;
        stepper.setAttribute("data-value", val);
        if (hiddenInput) hiddenInput.value = val;
      }
    }

    if (decBtn) decBtn.addEventListener("click", () => updateVal(val - 1));
    if (incBtn) incBtn.addEventListener("click", () => updateVal(val + 1));
  });

  /* ==========================================
     5. Summary Generator
  ========================================== */
  function updateSummary() {
    const summaryList = document.getElementById("summaryList");
    if (!summaryList) return;

    const destSelect = document.getElementById("destination");
    const destText = (destSelect && destSelect.options[destSelect.selectedIndex]) ? destSelect.options[destSelect.selectedIndex].text : "-";
    const startDate = document.getElementById("startDate") ? document.getElementById("startDate").value : "-";
    const days = document.getElementById("days") ? document.getElementById("days").value : "1";
    const people = document.getElementById("people") ? document.getElementById("people").value : "1";

    const checkedActs = Array.from(document.querySelectorAll('input[name="activities"]:checked'))
      .map(cb => {
        const span = cb.closest("label") ? cb.closest("label").querySelector("[data-i18n]") : null;
        return span ? span.textContent : cb.value;
      });

    const isAr = currentLang === "ar";

    summaryList.innerHTML = `
      <div><dt>${isAr ? "الوجهة" : "Destination"}</dt><dd>${destText}</dd></div>
      <div><dt>${isAr ? "التاريخ" : "Start Date"}</dt><dd>${startDate}</dd></div>
      <div><dt>${isAr ? "المدة" : "Duration"}</dt><dd>${days} ${isAr ? "أيام" : "Days"}</dd></div>
      <div><dt>${isAr ? "الأشخاص" : "Travelers"}</dt><dd>${people} ${isAr ? "أفراد" : "People"}</dd></div>
      <div><dt>${isAr ? "الأنشطة" : "Activities"}</dt><dd>${checkedActs.length > 0 ? checkedActs.join(", ") : (isAr ? "لم يتم تحديد أنشطة" : "None selected")}</dd></div>
    `;
  }

  /* ==========================================
     6. Form Submission & Modal (Supabase Integrated)
  ========================================== */
  const successModal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");
  const refNumber = document.getElementById("refNumber");

  if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const err4 = document.getElementById("err4");
      if (err4) err4.textContent = "";

      const nameInput = document.getElementById("fullName");
      const phoneInput = document.getElementById("phone");
      const name = nameInput ? nameInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";

      if (!name || !phone) {
        if (err4) err4.textContent = currentLang === "ar" ? "برجاء كتابة الاسم ورقم الموبايل." : "Please enter your name and phone number.";
        return;
      }

      const checkedActs = Array.from(document.querySelectorAll('input[name="activities"]:checked')).map(cb => cb.value);
      const bookingData = {
        destination: document.getElementById("destination") ? document.getElementById("destination").value : "",
        startDate: document.getElementById("startDate") ? document.getElementById("startDate").value : "",
        days: document.getElementById("days") ? document.getElementById("days").value : 1,
        people: document.getElementById("people") ? document.getElementById("people").value : 1,
        activities: checkedActs,
        notes: document.getElementById("notes") ? document.getElementById("notes").value : "",
        fullName: name,
        phone: phone,
        email: document.getElementById("email") ? document.getElementById("email").value : ""
      };

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const savedBooking = await NilusDB.addBooking(bookingData);

      if (submitBtn) submitBtn.disabled = false;

      if (savedBooking) {
        if (refNumber) refNumber.textContent = savedBooking.id;
        if (successModal) successModal.removeAttribute("hidden");
      } else {
        if (err4) err4.textContent = "حدث خطأ أثناء حفظ الحجز، تأكد من اتصالك بالإنترنت وحاول مرة أخرى.";
      }
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      if (successModal) successModal.setAttribute("hidden", "true");
      if (bookingForm) bookingForm.reset();
      goToStep(1);
    });
  }

  /* ==========================================
     7. Testimonials Slider
  ========================================== */
  const stories = document.querySelectorAll(".story-card");
  const storiesDots = document.getElementById("storiesDots");

  if (stories.length && storiesDots) {
    storiesDots.innerHTML = "";
    stories.forEach((_, idx) => {
      const dot = document.createElement("button");
      if (idx === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        stories.forEach(s => s.classList.remove("active"));
        document.querySelectorAll(".stories-dots button").forEach(b => b.classList.remove("active"));
        stories[idx].classList.add("active");
        dot.classList.add("active");
      });
      storiesDots.appendChild(dot);
    });
  }

  // Set Copyright Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});