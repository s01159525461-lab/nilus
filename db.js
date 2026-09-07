/*
  ===========================================================================
  QawafelDB — طبقة قاعدة البيانات
  ===========================================================================
  دي طبقة بسيطة بتحفظ حجوزات العملاء في المتصفح (localStorage) بشكل منظم،
  زي أي قاعدة بيانات فيها جدول واحد اسمه "bookings" وكل صف فيه شكل ثابت (schema).

  ملحوظة مهمة:
  الـ localStorage بيتخزن جوه متصفح كل عميل لوحده، يعني الحجوزات اللي بتحصل
  من جهاز العميل مش هتظهر تلقائي عندك في لوحة الإدارة على جهاز تاني، إلا لو
  فتحت لوحة الإدارة على نفس المتصفح والجهاز. عشان تجمع الحجوزات من كل
  العملاء في مكان واحد حقيقي (على السيرفر)، محتاج تربط الموقع بقاعدة بيانات
  حقيقية زي MySQL / PostgreSQL / Firebase / MongoDB من خلال سيرفر خلفي
  (Backend / API). الكود هنا اتصمم عشان يبقى سهل تستبدله بنداءات API حقيقية
  لاحقًا من غير ما تغيّر شكل باقي الموقع — كل الحفظ والقراءة بتعدي من خلال
  الدوال دي بس.
  ===========================================================================
*/

const QawafelDB = (function () {
  const STORAGE_KEY = "qawafel_bookings_v1";
  const CONFIG_KEY = "qawafel_admin_config_v1";

  /* ---------- أدوات مساعدة داخلية ---------- */

  function readRaw() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("QawafelDB: تعذرت قراءة البيانات", err);
      return [];
    }
  }

  function writeRaw(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (err) {
      console.error("QawafelDB: تعذر حفظ البيانات", err);
      return false;
    }
  }

  function generateId() {
    const stamp = Date.now().toString(36).toUpperCase().slice(-4);
    const rand = Math.floor(Math.random() * 900 + 100);
    return `QF-${stamp}${rand}`;
  }

  /* ---------- الشكل الأساسي لأي حجز (schema) ----------
    {
      id: "QF-XXXXXXX",
      destination: string,
      startDate: "YYYY-MM-DD",
      days: number,
      people: number,
      activities: string[],
      notes: string,
      fullName: string,
      phone: string,
      email: string,
      status: "قيد المراجعة" | "مؤكد" | "ملغي",
      createdAt: ISOString
    }
  */

  function addBooking(data) {
    const list = readRaw();
    const booking = {
      id: generateId(),
      destination: data.destination || "",
      startDate: data.startDate || "",
      days: Number(data.days) || 1,
      people: Number(data.people) || 1,
      activities: Array.isArray(data.activities) ? data.activities : [],
      notes: data.notes || "",
      fullName: data.fullName || "",
      phone: data.phone || "",
      email: data.email || "",
      status: "قيد المراجعة",
      createdAt: new Date().toISOString(),
    };
    list.unshift(booking);
    writeRaw(list);
    return booking;
  }

  function getAllBookings() {
    return readRaw();
  }

  function getBookingById(id) {
    return readRaw().find((b) => b.id === id) || null;
  }

  function updateBooking(id, patch) {
    const list = readRaw();
    const idx = list.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...patch };
    writeRaw(list);
    return list[idx];
  }

  function deleteBooking(id) {
    const list = readRaw().filter((b) => b.id !== id);
    writeRaw(list);
    return true;
  }

  function clearAll() {
    writeRaw([]);
  }

  function exportAsJSON() {
    return JSON.stringify(readRaw(), null, 2);
  }

  function exportAsCSV() {
    const list = readRaw();
    if (list.length === 0) return "";
    const headers = [
      "id", "fullName", "phone", "email", "destination",
      "startDate", "days", "people", "activities", "notes",
      "status", "createdAt",
    ];
    const rows = list.map((b) =>
      headers
        .map((h) => {
          let val = b[h];
          if (Array.isArray(val)) val = val.join(" | ");
          val = String(val ?? "").replace(/"/g, '""');
          return `"${val}"`;
        })
        .join(",")
    );
    return [headers.join(","), ...rows].join("\n");
  }

  /* ---------- إعدادات بسيطة للوحة الإدارة (كلمة السر) ---------- */

  function getAdminPassword() {
    try {
      const cfg = JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");
      return cfg.password || "qawafel2026";
    } catch {
      return "qawafel2026";
    }
  }

  function setAdminPassword(newPassword) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify({ password: newPassword }));
  }

  return {
    addBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    clearAll,
    exportAsJSON,
    exportAsCSV,
    getAdminPassword,
    setAdminPassword,
  };
})();
