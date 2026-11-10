/**
 * Minhas Atividades — ponte segura para Google Planilhas.
 * 1) Cole este arquivo em um projeto Google Apps Script.
 * 2) Execute setupGoogleActivitySync() uma vez e autorize.
 * 3) Implante como app da Web: executar como você; acesso: qualquer pessoa.
 * 4) Copie o token exibido no Registro de execução e a URL /exec para o app.
 */
const APP_TITLE = "Minhas Atividades — Banco de dados";
const PROP_SHEET_ID = "ACTIVITY_SPREADSHEET_ID";
const PROP_TOKEN = "ACTIVITY_SYNC_TOKEN";

function setupGoogleActivitySync() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty(PROP_SHEET_ID);
  let ss;
  if (id) {
    ss = SpreadsheetApp.openById(id);
  } else {
    ss = SpreadsheetApp.create(APP_TITLE);
    id = ss.getId();
    props.setProperty(PROP_SHEET_ID, id);
  }
  let sheet = ss.getSheetByName("Dados");
  if (!sheet) sheet = ss.getSheets()[0].setName("Dados");
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 2).setValues([["Atualizado em (UTC)", "Backup JSON"]]);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 190);
    sheet.setColumnWidth(2, 520);
  }
  let token = props.getProperty(PROP_TOKEN);
  if (!token) {
    token = Utilities.getUuid() + "-" + Utilities.getUuid();
    props.setProperty(PROP_TOKEN, token);
  }
  Logger.log("PLANILHA: " + ss.getUrl());
  Logger.log("TOKEN DE CONEXÃO (copie para Minhas Atividades): " + token);
  Logger.log("Agora implante > Nova implantação > App da Web; executar como você; acesso: qualquer pessoa.");
  return { spreadsheetUrl: ss.getUrl(), token: token };
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const props = PropertiesService.getScriptProperties();
    if (!body.token || body.token !== props.getProperty(PROP_TOKEN)) {
      return json_({ ok: false, error: "Não autorizado." });
    }
    if (!body.payload || body.payload.schema !== 1 || !body.payload.data || typeof body.payload.data !== "object") {
      return json_({ ok: false, error: "Backup inválido." });
    }
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = SpreadsheetApp.openById(props.getProperty(PROP_SHEET_ID));
      const sheet = ss.getSheetByName("Dados");
      const updatedAt = new Date().toISOString();
      const serialized = JSON.stringify(body.payload);
      if (serialized.length > 45000000) throw new Error("Backup excede o limite de armazenamento.");
      sheet.getRange(2, 1, 1, 2).setValues([[updatedAt, serialized]]);
      return json_({ ok: true, updatedAt: updatedAt });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

function doGet(e) {
  const params = (e && e.parameter) || {};
  const callback = String(params.callback || "callback");
  if (!/^[a-zA-Z_$][0-9a-zA-Z_$\.]{0,80}$/.test(callback)) {
    return ContentService.createTextOutput("/* callback inválido */").setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  let result;
  try {
    const props = PropertiesService.getScriptProperties();
    if (!params.token || params.token !== props.getProperty(PROP_TOKEN)) {
      result = { ok: false, error: "Não autorizado." };
    } else {
      const ss = SpreadsheetApp.openById(props.getProperty(PROP_SHEET_ID));
      const sheet = ss.getSheetByName("Dados");
      const row = sheet.getLastRow() >= 2 ? sheet.getRange(2, 1, 1, 2).getValues()[0] : null;
      result = row && row[1]
        ? { ok: true, updatedAt: String(row[0]), payload: JSON.parse(String(row[1])) }
        : { ok: true, updatedAt: null, payload: null };
    }
  } catch (err) {
    result = { ok: false, error: String(err && err.message || err) };
  }
  return ContentService.createTextOutput(callback + "(" + JSON.stringify(result) + ");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
