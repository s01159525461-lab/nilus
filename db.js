const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_KEY = 'YOUR_ANON_KEY';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const QawafelDB = (function () {
  
  function generateId() {
    const stamp = Date.now().toString(36).toUpperCase().slice(-4);
    const rand = Math.floor(Math.random() * 900 + 100);
    return `QF-${stamp}${rand}`;
  }

  async function addBooking(data) {
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
      createdAt: new Date().toISOString()
    };

    const { data: res, error } = await _supabase
      .from('bookings')
      .insert([booking]);

    if (error) {
      console.error("خطأ في الحفظ:", error);
      return null;
    }
    return booking;
  }

  async function getAllBookings() {
    const { data, error } = await _supabase
      .from('bookings')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error("خطأ في جلب البيانات:", error);
      return [];
    }
    return data;
  }

  async function getBookingById(id) {
    const { data, error } = await _supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  async function updateBooking(id, patch) {
    const { data, error } = await _supabase
      .from('bookings')
      .update(patch)
      .eq('id', id);

    return !error;
  }

  async function deleteBooking(id) {
    const { error } = await _supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    return !error;
  }

  function getAdminPassword() {
    return "nilus2026";
  }

  return {
    addBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getAdminPassword
  };
})();