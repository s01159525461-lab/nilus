(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ============================ Header ============================ */
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  });

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    header.classList.toggle("nav-open", !isOpen);
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      header.classList.remove("nav-open");
    });
  });

  /* ===================== Destination quick-select ===================== */
  document.querySelectorAll(".dest-card").forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const dest = card.dataset.dest;
      const select = document.getElementById("destination");
      if (dest && select) {
        select.value = dest;
      }
      document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ============================ Steppers ============================ */
  document.querySelectorAll(".stepper").forEach((stepper) => {
    const min = Number(stepper.dataset.min);
    const max = Number(stepper.dataset.max);
    let value = Number(stepper.dataset.value);
    const output = stepper.querySelector("output");
    const hiddenInput = stepper.parentElement.querySelector('input[type="hidden"]');

    function render() {
      output.textContent = value;
      if (hiddenInput) hiddenInput.value = value;
    }

    stepper.addEventListener("click", (e) => {
      const btn = e.target.closest(".stepper-btn");
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === "inc" && value < max) value++;
      if (action === "dec" && value > min) value--;
      render();
    });

    render();
  });

  /* ========================= Booking wizard ========================= */
  const form = document.getElementById("bookingForm");
  const steps = Array.from(form.querySelectorAll(".form-step"));
  const progressItems = Array.from(document.querySelectorAll(".progress-track li"));
  let currentStep = 1;

  function showStep(stepNum) {
    steps.forEach((s) => s.classList.toggle("active", Number(s.dataset.step) === stepNum));
    progressItems.forEach((li) => {
      const n = Number(li.dataset.step);
      li.classList.toggle("active", n === stepNum);
      li.classList.toggle("done", n < stepNum);
    });
    currentStep = stepNum;
    if (stepNum === 4) buildSummary();
    form.closest("section").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep(stepNum) {
    if (stepNum === 1) {
      const dest = document.getElementById("destination");
      const date = document.getElementById("startDate");
      const errBox = document.getElementById("err1");
      if (!dest.value) {
        errBox.textContent = "من فضلك اختار وجهة الرحلة.";
        return false;
      }
      if (!date.value) {
        errBox.textContent = "من فضلك حدد تاريخ بداية الرحلة.";
        return false;
      }
      const today = new Date().setHours(0, 0, 0, 0);
      if (new Date(date.value).setHours(0, 0, 0, 0) < today) {
        errBox.textContent = "التاريخ لازم يكون من النهاردة أو بعده.";
        return false;
      }
      errBox.textContent = "";
      return true;
    }
    if (stepNum === 4) {
      const name = document.getElementById("fullName");
      const phone = document.getElementById("phone");
      const errBox = document.getElementById("err4");
      if (!name.value.trim()) {
        errBox.textContent = "من فضلك اكتب اسمك.";
        return false;
      }
      const phoneClean = phone.value.trim();
      if (!/^01[0125][0-9]{8}$/.test(phoneClean)) {
        errBox.textContent = "من فضلك اكتب رقم موبايل مصري صحيح (مثال: 01012345678).";
        return false;
      }
      errBox.textContent = "";
      return true;
    }
    return true;
  }

  document.getElementById("startDate").min = new Date().toISOString().split("T")[0];

  form.addEventListener("click", (e) => {
    if (e.target.closest(".btn-next")) {
      if (validateStep(currentStep)) showStep(currentStep + 1);
    }
    if (e.target.closest(".btn-prev")) {
      showStep(currentStep - 1);
    }
  });

  function buildSummary() {
    const dest = document.getElementById("destination").value || "—";
    const date = document.getElementById("startDate").value;
    const dateFormatted = date
      ? new Date(date).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })
      : "—";
    const days = document.getElementById("days").value;
    const people = document.getElementById("people").value;
    const activities = Array.from(form.querySelectorAll('input[name="activities"]:checked')).map((c) => c.value);

    const rows = [
      ["الوجهة", dest],
      ["تاريخ الرحلة", dateFormatted],
      ["عدد الأيام", `${days} يوم`],
      ["عدد الأشخاص", `${people} شخص`],
      ["الأنشطة", activities.length ? activities.join("، ") : "هيتم تحديدها لاحقًا"],
    ];

    const list = document.getElementById("summaryList");
    list.innerHTML = rows
      .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
      .join("");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const data = {
      destination: document.getElementById("destination").value,
      startDate: document.getElementById("startDate").value,
      days: document.getElementById("days").value,
      people: document.getElementById("people").value,
      activities: Array.from(form.querySelectorAll('input[name="activities"]:checked')).map((c) => c.value),
      notes: document.getElementById("notes").value.trim(),
      fullName: document.getElementById("fullName").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
    };

    const booking = QawafelDB.addBooking(data);

    document.getElementById("refNumber").textContent = booking.id;
    document.getElementById("successModal").hidden = false;

    form.reset();
    document.querySelectorAll(".stepper").forEach((stepper) => {
      const min = Number(stepper.dataset.min);
      const hiddenInput = stepper.parentElement.querySelector('input[type="hidden"]');
      stepper.querySelector("output").textContent = min === 1 && stepper.dataset.value === "5" ? 5 : min;
    });
    document.getElementById("days").value = 5;
    document.getElementById("people").value = 2;
    document.querySelectorAll('.stepper output').forEach((out, i) => {
      out.textContent = i === 0 ? 5 : 2;
    });
    showStep(1);
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("successModal").hidden = true;
  });
  document.getElementById("successModal").addEventListener("click", (e) => {
    if (e.target.id === "successModal") document.getElementById("successModal").hidden = true;
  });

  /* ============================ Stories slider ============================ */
  const storyCards = Array.from(document.querySelectorAll(".story-card"));
  const dotsWrap = document.getElementById("storiesDots");
  let storyIndex = 0;

  storyCards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `قصة رقم ${i + 1}`);
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => setStory(i));
    dotsWrap.appendChild(dot);
  });

  function setStory(i) {
    storyCards.forEach((c, idx) => c.classList.toggle("active", idx === i));
    Array.from(dotsWrap.children).forEach((d, idx) => d.classList.toggle("active", idx === i));
    storyIndex = i;
  }

  setInterval(() => {
    setStory((storyIndex + 1) % storyCards.length);
  }, 6000);
})();
const translations = {
  ar: {
    hero_title: "رحلتك في أرقام",
    stat_tours: "رحلة اتصممت خصيصي",
    stat_cities: "وجهات رئيسية في مصر",
    stat_reply: "رد على طلبك س",
    btn_start: "ابدأ التخطيط ←",
    lang_btn: "English"
  },
  en: {
    hero_title: "Your Journey in Numbers",
    stat_tours: "Custom Tailored Tours",
    stat_cities: "Main Destinations in Egypt",
    stat_reply: "Response Time Hours",
    btn_start: "Start Planning →",
    lang_btn: "عربي"
  }
};

let currentLang = localStorage.getItem('app_lang') || 'ar';

function applyLanguage(lang) {
  const html = document.documentElement;
  
  // 1. تغيير الاتجاه
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // 2. تحديث العناصر النصية فقط
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // لو العنصر جواه أرقام أو عناصر تانية، بنغير النود النصي بس
      el.textContent = translations[lang][key];
    }
  });

  // 3. تحديث زر اللغة
  const langText = document.getElementById('lang-text');
  if (langText) {
    langText.textContent = translations[lang].lang_btn;
  }

  localStorage.setItem('app_lang', lang);
  currentLang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.preventDefault();
      applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  }
});