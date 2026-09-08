/*
  ===========================================================================
  NilusDB — طبقة قاعدة البيانات (Supabase / Postgres)
  ===========================================================================
  الجدول الحقيقي على Supabase مسمّياته camelCase (زي الموقع بالظبط):
  id, destination, startDate, days, people, activities, notes,
  fullName, phone, email, status, createdAt

  كل الدوال هنا async (بترجع Promise) لأنها بتكلم السيرفر عبر الإنترنت،
  فأي مكان بينادي عليها لازم يستخدم await.
  ===========================================================================
*/

const NilusDB = (function () {
  const TABLE = "bookings";

  function generateId() {
    const stamp = Date.now().toString(36).toUpperCase().slice(-4);
    const rand = Math.floor(Math.random() * 900 + 100);
    return `QF-${stamp}${rand}`;
  }

  function normalizeRow(row) {
    if (!row) return null;
    return {
      id: row.id,
      destination: row.destination || "",
      startDate: row.startDate || "",
      days: row.days || 1,
      people: row.people || 1,
      activities: Array.isArray(row.activities) ? row.activities : [],
      notes: row.notes || "",
      fullName: row.fullName || "",
      phone: row.phone || "",
      email: row.email || "",
      status: row.status || "قيد المراجعة",
      createdAt: row.createdAt,
    };
  }

  async function addBooking(data) {
    const payload = {
      id: generateId(),
      destination: data.destination || "",
      startDate: data.startDate || null,
      days: Number(data.days) || 1,
      people: Number(data.people) || 1,
      activities: Array.isArray(data.activities) ? data.activities : [],
      notes: data.notes || "",
      fullName: data.fullName || "",
      phone: data.phone || "",
      email: data.email || "",
      status: "قيد المراجعة",
    };

    // ملحوظة: متعمّد إننا مش بنطلب ".select()" بعد الإدراج، لأن الزائر العادي
    // (anon) عنده صلاحية "إضافة" بس مالوش صلاحية "قراءة" — فطلب رجوع الصف
    // بعد الحفظ كان بيتصادم مع قاعدة الحماية (RLS) ويفشل الحجز كله.
    // كل بيانات الحجز عندنا أصلاً في المتصفح، فمش محتاجين نطلبها تاني.
    const { error } = await supabaseClient.from(TABLE).insert(payload);

    if (error) {
      console.error("NilusDB.addBooking:", error.message);
      return null;
    }
    return normalizeRow(payload);
  }

  async function getAllBookings() {
    const { data, error } = await supabaseClient
      .from(TABLE)
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("NilusDB.getAllBookings:", error.message);
      return [];
    }
    return (data || []).map(normalizeRow);
  }

  async function getBookingById(id) {
    const { data, error } = await supabaseClient
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("NilusDB.getBookingById:", error.message);
      return null;
    }
    return normalizeRow(data);
  }

  async function updateBooking(id, patch) {
    const dbPatch = {};
    if (patch.status !== undefined) dbPatch.status = patch.status;
    if (patch.destination !== undefined) dbPatch.destination = patch.destination;
    if (patch.startDate !== undefined) dbPatch.startDate = patch.startDate;
    if (patch.days !== undefined) dbPatch.days = patch.days;
    if (patch.people !== undefined) dbPatch.people = patch.people;
    if (patch.activities !== undefined) dbPatch.activities = patch.activities;
    if (patch.notes !== undefined) dbPatch.notes = patch.notes;
    if (patch.fullName !== undefined) dbPatch.fullName = patch.fullName;
    if (patch.phone !== undefined) dbPatch.phone = patch.phone;
    if (patch.email !== undefined) dbPatch.email = patch.email;

    const { data, error } = await supabaseClient
      .from(TABLE)
      .update(dbPatch)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("NilusDB.updateBooking:", error.message);
      return null;
    }
    return normalizeRow(data);
  }

  async function deleteBooking(id) {
    const { error } = await supabaseClient.from(TABLE).delete().eq("id", id);
    if (error) {
      console.error("NilusDB.deleteBooking:", error.message);
      return false;
    }
    return true;
  }

  async function clearAll() {
    const { error } = await supabaseClient.from(TABLE).delete().neq("id", "");
    if (error) {
      console.error("NilusDB.clearAll:", error.message);
      return false;
    }
    return true;
  }

  function exportAsJSON(list) {
    return JSON.stringify(list, null, 2);
  }

  function exportAsCSV(list) {
    if (!list || list.length === 0) return "";
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

  return {
    addBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    clearAll,
    exportAsJSON,
    exportAsCSV,
  };
})();