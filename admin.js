(function () {
  "use strict";

  /* ============================ Login gate (Supabase Auth) ============================ */
  const loginScreen = document.getElementById("loginScreen");
  const adminApp = document.getElementById("adminApp");
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  async function enterApp() {
    loginScreen.hidden = true;
    adminApp.hidden = false;
    await renderAll();
  }

  function showLogin() {
    adminApp.hidden = true;
    loginScreen.hidden = false;
  }

  // لو فيه جلسة دخول شغالة بالفعل (من قبل)، ادخل على طول من غير ما تطلب تسجيل دخول تاني
  (async function checkExistingSession() {
    const { data } = await supabaseClient.auth.getSession();
    if (data && data.session) {
      enterApp();
    }
  })();

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    loginError.textContent = "";

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (submitBtn) submitBtn.disabled = false;

    if (error) {
      loginError.textContent = "الإيميل أو كلمة السر غلط، جرب تاني.";
      return;
    }
    enterApp();
  });

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    showLogin();
  });

  /* ============================ State ============================ */
  let currentFilters = { search: "", status: "", destination: "" };
  let openBookingId = null;
  let cachedBookings = [];

  const tbody = document.getElementById("bookingsBody");
  const emptyState = document.getElementById("emptyState");
  const filterDestination = document.getElementById("filterDestination");

  function statusClass(status) {
    if (status === "مؤكد") return "confirmed";
    if (status === "ملغي") return "cancelled";
    return "pending";
  }

  async function renderAll() {
    cachedBookings = await QawafelDB.getAllBookings();
    renderStats(cachedBookings);
    populateDestinationFilter(cachedBookings);
    renderTable(applyFilters(cachedBookings));
  }

  function renderStats(all) {
    document.getElementById("statTotal").textContent = all.length;
    document.getElementById("statPending").textContent = all.filter((b) => b.status === "قيد المراجعة").length;
    document.getElementById("statConfirmed").textContent = all.filter((b) => b.status === "مؤكد").length;
    document.getElementById("statPeople").textContent = all.reduce((sum, b) => sum + Number(b.people || 0), 0);
  }

  function populateDestinationFilter(all) {
    const current = filterDestination.value;
    const destinations = Array.from(new Set(all.map((b) => b.destination).filter(Boolean)));
    filterDestination.innerHTML =
      '<option value="">كل الوجهات</option>' +
      destinations.map((d) => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join("");
    filterDestination.value = current;
  }

  function applyFilters(all) {
    return all.filter((b) => {
      const matchesSearch =
        !currentFilters.search ||
        [b.fullName, b.phone, b.id].some((f) => (f || "").toLowerCase().includes(currentFilters.search.toLowerCase()));
      const matchesStatus = !currentFilters.status || b.status === currentFilters.status;
      const matchesDest = !currentFilters.destination || b.destination === currentFilters.destination;
      return matchesSearch && matchesStatus && matchesDest;
    });
  }

  function renderTable(list) {
    emptyState.hidden = list.length !== 0;
    tbody.innerHTML = list
      .map(
        (b) => `
      <tr>
        <td>${b.id}</td>
        <td>${escapeHtml(b.fullName)}<br><small>${escapeHtml(b.phone)}</small></td>
        <td>${escapeHtml(b.destination)}</td>
        <td>${formatDate(b.startDate)}</td>
        <td>${b.days}</td>
        <td>${b.people}</td>
        <td><span class="status-pill ${statusClass(b.status)}">${b.status}</span></td>
        <td><button class="row-btn" data-id="${b.id}">التفاصيل</button></td>
      </tr>`
      )
      .join("");
  }

  function formatDate(dateStr) {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  }

  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  /* ============================ Filters ============================ */
  document.getElementById("searchInput").addEventListener("input", (e) => {
    currentFilters.search = e.target.value;
    renderTable(applyFilters(cachedBookings));
  });
  document.getElementById("filterStatus").addEventListener("change", (e) => {
    currentFilters.status = e.target.value;
    renderTable(applyFilters(cachedBookings));
  });
  filterDestination.addEventListener("change", (e) => {
    currentFilters.destination = e.target.value;
    renderTable(applyFilters(cachedBookings));
  });

  /* ============================ Detail modal ============================ */
  const detailModal = document.getElementById("detailModal");
  const detailList = document.getElementById("detailList");
  const statusSelect = document.getElementById("statusSelect");

  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;
    openDetail(btn.dataset.id);
  });

  function openDetail(id) {
    const b = cachedBookings.find((x) => x.id === id);
    if (!b) return;
    openBookingId = id;

    const rows = [
      ["رقم الحجز", b.id],
      ["الاسم", b.fullName],
      ["الموبايل", b.phone],
      ["البريد الإلكتروني", b.email || "—"],
      ["الوجهة", b.destination],
      ["تاريخ الرحلة", formatDate(b.startDate)],
      ["عدد الأيام", `${b.days} يوم`],
      ["عدد الأشخاص", `${b.people} شخص`],
      ["الأنشطة", b.activities.length ? b.activities.join("، ") : "—"],
      ["ملاحظات", b.notes || "—"],
      ["تاريخ الطلب", b.createdAt ? new Date(b.createdAt).toLocaleString("ar-EG") : "—"],
    ];
    detailList.innerHTML = rows
      .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
      .join("");
    statusSelect.value = b.status;
    detailModal.hidden = false;
  }

  document.getElementById("closeDetail").addEventListener("click", () => (detailModal.hidden = true));
  detailModal.addEventListener("click", (e) => {
    if (e.target.id === "detailModal") detailModal.hidden = true;
  });

  document.getElementById("saveStatusBtn").addEventListener("click", async () => {
    if (!openBookingId) return;
    const btn = document.getElementById("saveStatusBtn");
    btn.disabled = true;
    await QawafelDB.updateBooking(openBookingId, { status: statusSelect.value });
    btn.disabled = false;
    detailModal.hidden = true;
    await renderAll();
  });

  document.getElementById("deleteBookingBtn").addEventListener("click", async () => {
    if (!openBookingId) return;
    if (confirm("متأكد إنك عاوز تحذف الحجز ده؟")) {
      await QawafelDB.deleteBooking(openBookingId);
      detailModal.hidden = true;
      await renderAll();
    }
  });

  /* ============================ Export / Clear ============================ */
  function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const exportCsvBtn = document.getElementById("exportCsvBtn");
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", () => {
      const csv = QawafelDB.exportAsCSV(cachedBookings);
      if (!csv) return alert("مفيش بيانات عشان تتصدر.");
      downloadFile("qawafel-bookings.csv", "\uFEFF" + csv, "text/csv;charset=utf-8;");
    });
  }

  const exportJsonBtn = document.getElementById("exportJsonBtn");
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", () => {
      downloadFile("qawafel-bookings.json", QawafelDB.exportAsJSON(cachedBookings), "application/json");
    });
  }

  document.getElementById("clearAllBtn").addEventListener("click", async () => {
    if (confirm("هيتم حذف كل الحجوزات نهائيًا. متأكد؟")) {
      await QawafelDB.clearAll();
      await renderAll();
    }
  });
})();
