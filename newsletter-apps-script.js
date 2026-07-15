// ========== Google Apps Script ==========
// 1. افتح https://sheets.new  (أنشئ Sheet جديد)
// 2. اسم العمود A: "email"  والعمود B: "date"
// 3. افتح Extensions > Apps Script
// 4. احذف الكود الموجود والصق الكود ده
// 5. اضغط Deploy > New Deployment > Web app
// 6. اختر "Anyone" في الوصول واضغط Deploy
// 7. انسخ URL اللي يظهر — حطه في موقعك

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    if (!email) return sendJson_(400, { error: 'Email مطلوب' });

    sheet.appendRow([email, new Date().toISOString()]);
    return sendJson_(200, { success: true, message: 'تم الاشتراك بنجاح' });
  } catch (err) {
    return sendJson_(500, { error: err.toString() });
  }
}

function doGet() {
  return HtmlService.createHtmlOutput('البوت شغال ✅');
}

function sendJson_(code, obj) {
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}
