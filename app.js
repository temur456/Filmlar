// sofa.ai: yadro (ekranlar, til, taymer, Reading/Listening testi, umumiy natija).
// Writing va Speaking ai.js faylida. Ikkalasi window.SOFA orqali bog'lanadi.
(function () {
  var STORE = "sofa_state_v1";
  var LANGS = ["uz", "ru", "en"];
  var SKILLS = ["reading", "listening", "writing", "speaking"];

  var ICONS = {
    english: '<path d="M4 5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>',
    math: '<path d="M12 3v10M7 8h10M7 19h10"/>',
    biology: '<path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15z"/><path d="M5 19l8-8"/>',
    chemistry: '<path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3M8 15h8"/>',
    reading: '<path d="M5 19.5V5a2 2 0 0 1 2-2h12v14H7a2 2 0 0 0-2 2.5z"/><path d="M9 7h6"/>',
    listening: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v6H5a1 1 0 0 1-1-1z"/><path d="M20 14h-3v6h2a1 1 0 0 0 1-1z"/>',
    writing: '<path d="M4 20l1-4L16 5a2.1 2.1 0 0 1 3 3L8 19z"/><path d="M14 7l3 3"/>',
    speaking: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    prep: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chev: '<path d="M15 5l-7 7 7 7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    play: '<path d="M7 4l13 8-13 8z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    volume: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 21h8M10 17h4"/>',
    cert: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21l4-3 4 3v-4"/>'
  };
  function icon(n) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[n] + "</svg>";
  }

  // ----- holat -----
  function detectLang() {
    var l = (navigator.language || "uz").slice(0, 2).toLowerCase();
    return LANGS.indexOf(l) >= 0 ? l : "uz";
  }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE));
      return { lang: (s && s.lang) || detectLang(), user: (s && s.user) || null, results: (s && s.results) || {}, seen: (s && s.seen) || {} };
    } catch (e) {
      return { lang: detectLang(), user: null, results: {}, seen: {} };
    }
  }
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {}
  }

  var state = load();
  var screen = "home";
  var defs = {};
  var actions = {};
  var qz = null; // joriy Reading/Listening urinishi
  var view = document.getElementById("view");
  var barLeft = document.getElementById("barLeft");
  var langsEl = document.getElementById("langs");
  var toastEl = document.getElementById("toast");
  var toastTimer;

  function t(k) {
    return (I18N[state.lang] && I18N[state.lang][k]) || I18N.en[k] || k;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }
  function bump(el) {
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  }
  function define(name, d) { defs[name] = d; }

  // ----- ball va daraja -----
  var TABLES = {
    reading: [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5]],
    listening: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5]]
  };
  function bandFromRaw(kind, correct, total) {
    var s = Math.round(correct / total * 40), tb = TABLES[kind];
    for (var i = 0; i < tb.length; i++) if (s >= tb[i][0]) return tb[i][1];
    return 2;
  }
  function cefrFromBand(b) {
    if (b >= 8.5) return "C2";
    if (b >= 7) return "C1";
    if (b >= 5.5) return "B2";
    if (b >= 4) return "B1";
    if (b >= 3) return "A2";
    return "A1";
  }
  function fmtBand(b) { return Number(b).toFixed(1); }
  function avgBand(list) {
    var s = 0;
    list.forEach(function (x) { s += x; });
    return Math.round(s / list.length * 2) / 2;
  }

  // ----- Supabase (ixtiyoriy) -----
  function cfgOk() { var c = window.SOFA_CONFIG; return !!(c && c.supabaseUrl && c.supabaseKey); }
  function post(table, row) {
    var c = window.SOFA_CONFIG;
    try {
      return fetch(c.supabaseUrl.replace(/\/$/, "") + "/rest/v1/" + table, {
        method: "POST",
        headers: { apikey: c.supabaseKey, Authorization: "Bearer " + c.supabaseKey, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify(row)
      }).then(function (r) { return r.ok; }, function () { return false; });
    } catch (e) { return Promise.resolve(false); }
  }
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return (c === "x" ? r : (r & 3 | 8)).toString(16);
    });
  }
  function ensureProfile() {
    var u = state.user;
    if (!u || u.synced || !cfgOk()) return Promise.resolve();
    if (!u.id) { u.id = uuid(); save(); }
    return post("profiles", { id: u.id, first_name: u.first, last_name: u.last, phone: u.phone }).then(function (ok) {
      if (ok) { u.synced = true; save(); }
    });
  }
  function saveResult(section, obj, details) {
    state.results[section] = obj;
    save();
    if (!cfgOk() || !state.user) return;
    ensureProfile().then(function () {
      if (state.user && state.user.synced) post("results", { user_id: state.user.id, section: section, band: obj.band, details: details || {} });
    });
  }

  // ----- taymer -----
  var tm = null;
  function fmtTime(s) {
    var m = Math.floor(s / 60), x = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (x < 10 ? "0" : "") + x;
  }
  function remaining() { return tm ? Math.max(0, Math.ceil((tm.end - Date.now()) / 1000)) : 0; }
  function stopTimer() { if (tm) { clearInterval(tm.id); tm = null; } }
  function tickTimer() {
    if (!tm) return;
    var s = remaining();
    var a = document.getElementById("tm"), box = document.getElementById("timer");
    if (a) a.textContent = fmtTime(s);
    if (box) box.classList.toggle("low", s <= 60);
    if (s <= 0) {
      var f = tm.onEnd;
      stopTimer();
      if (f) f();
    }
  }
  function startTimer(min, onEnd) {
    stopTimer();
    tm = { end: Date.now() + min * 60000, onEnd: onEnd, id: setInterval(tickTimer, 500) };
  }
  function timerChip(extra) {
    return '<div class="timer" id="timer">' + icon("clock") + '<span id="tm">' + fmtTime(remaining()) + "</span>" +
      (extra !== undefined ? '<span class="cnt" id="ans">' + extra + "</span>" : "") + "</div>";
  }

  // ----- umumiy HTML bo'laklar -----
  function badge(text) { return '<span class="badge">' + (text || t("soon")) + "</span>"; }

  function bigCushion(o) {
    return '<button class="cushion big ' + o.color + (o.soon ? " soon" : "") + '" ' + (o.go ? 'data-go="' + o.go + '"' : 'data-soon="1"') + ">" +
      (o.soon ? badge() : "") +
      '<span class="ico">' + icon(o.icon) + "</span>" +
      '<span class="txt"><span class="name">' + o.name + '</span><span class="hint">' + o.hint + "</span></span>" +
      (o.soon ? "" : '<span class="go">' + icon("arrow") + "</span>") +
      "</button>";
  }
  function smallCushion(color, ic, key) {
    return '<button class="cushion small soon ' + color + '" data-soon="1">' + badge() +
      '<span class="ico">' + icon(ic) + '</span><span class="name">' + t(key) + "</span></button>";
  }
  function skillCushion(color, key, tag) {
    return '<button class="cushion sq ' + color + '" data-go="' + key + '">' + (tag ? badge(tag) : "") +
      '<span class="ico">' + icon(key) + '</span><span class="name">' + t(key) + "</span></button>";
  }
  function field(id, label, extra) {
    return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" ' + extra + '><div class="err" id="' + id + 'Err"></div></div>';
  }
  function resultCard(label, band, chips) {
    return '<div class="cushion static result c-violet"><span class="rl">' + label + "</span>" +
      '<span class="bignum" id="bandNum" data-to="' + band + '">' + fmtBand(band) + "</span>" +
      '<span class="chips">' + chips.map(function (c) { return '<span class="chip2">' + esc(c) + "</span>"; }).join("") + "</span></div>";
  }
  function bars(items) {
    return '<div class="bars">' + items.map(function (it) {
      return '<div class="brow"><span class="bl">' + esc(it.label) + '</span><span class="bt"><span class="bf" style="--w:' +
        Math.round(it.value / 9 * 100) + '%"></span></span><span class="bv">' + fmtBand(it.value) + "</span></div>";
    }).join("") + "</div>";
  }
  function tips(title, arr, cls) {
    if (!arr || !arr.length) return "";
    return "<h2>" + title + "</h2>" + arr.map(function (x) { return '<div class="tip ' + (cls || "") + '">' + esc(x) + "</div>"; }).join("");
  }
  function countWords(s) {
    var m = String(s).trim().match(/\S+/g);
    return m ? m.length : 0;
  }

  // ====================== Reading / Listening ======================
  var QUIZ = {
    reading: { data: READING_SETS[0], advice: { mcq: "adviceMcq", tfng: "adviceTfng", gap: "adviceGap" } },
    listening: { data: LISTENING_SETS[0], advice: { mcq: "adviceLMcq", gap: "adviceLGap" } }
  };
  var SETS = { reading: READING_SETS, listening: LISTENING_SETS };
  // Oxirgi tushgan to'plamni takrorlamasdan tasodifiy tanlaydi
  function pickIndex(key, n) {
    state.seen = state.seen || {};
    var last = state.seen[key], i = Math.floor(Math.random() * (last === undefined || n < 2 ? n : n - 1));
    if (last !== undefined && n > 1 && i >= last) i++;
    state.seen[key] = i;
    save();
    return i;
  }
  var INSTR = {
    reading: { mcq: "instrMcq", tfng: "instrTfng", gap: "instrGap" },
    listening: { mcq: "instrMcq", gap: "instrLGap" }
  };
  var TYPE_NAME = { mcq: "Multiple choice", tfng: "True / False / Not given", gap: "Completion" };

  function empty(v) { return v === undefined || v === null || String(v).trim() === ""; }
  function norm(s) { return String(s).toLowerCase().replace(/[\s$.,:\-]/g, ""); }
  function isCorrect(q, ans) {
    if (empty(ans)) return false;
    if (q.type === "gap") {
      var n = norm(ans);
      return q.answer.some(function (a) { return norm(a) === n; });
    }
    return ans === q.answer;
  }
  function correctText(q) {
    if (q.type === "mcq") return q.options[q.answer];
    if (q.type === "gap") return q.answer[0];
    return q.answer;
  }
  function givenText(q, ans) {
    if (empty(ans)) return null;
    return q.type === "mcq" ? q.options[ans] : String(ans).trim();
  }
  function getQ(kind, id) {
    var qs = QUIZ[kind].data.questions;
    for (var i = 0; i < qs.length; i++) if (String(qs[i].id) === String(id)) return qs[i];
    return null;
  }
  function answeredCount() {
    var n = 0;
    if (!qz) return 0;
    QUIZ[qz.kind].data.questions.forEach(function (q) { if (!empty(qz.answers[q.id])) n++; });
    return n;
  }
  function updateAns() {
    var el = document.getElementById("ans");
    if (el && qz) el.textContent = answeredCount() + "/" + QUIZ[qz.kind].data.questions.length;
  }

  function questionHtml(q, i, val) {
    var h = '<div class="q"><div class="qt"><span class="qn">' + (i + 1) + "</span><span>" + esc(q.q) + "</span></div>";
    if (q.type === "mcq") {
      h += '<div class="opts">';
      q.options.forEach(function (o, k) {
        h += '<button type="button" class="opt' + (val === k ? " on" : "") + '" data-q="' + q.id + '" data-v="' + k + '" aria-pressed="' + (val === k) + '">' + esc(o) + "</button>";
      });
      h += "</div>";
    } else if (q.type === "tfng") {
      h += '<div class="opts row">';
      ["True", "False", "Not given"].forEach(function (o) {
        h += '<button type="button" class="opt' + (val === o ? " on" : "") + '" data-q="' + q.id + '" data-v="' + o + '" aria-pressed="' + (val === o) + '">' + o + "</button>";
      });
      h += "</div>";
    } else {
      h += '<input class="gapin" data-gap="' + q.id + '" value="' + esc(val || "") + '" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="30">';
    }
    return h + "</div>";
  }

  function playerHtml() {
    var d = QUIZ.listening.data, st = qz ? qz.audio : "idle";
    var canPlay = !!d.audio || ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    if (!canPlay) {
      return '<p class="lead">' + t("noAudio") + "</p>" + '<div class="passage">' +
        d.script.map(function (l) { return "<p>" + esc(l.text) + "</p>"; }).join("") + "</div>";
    }
    var label = st === "idle" ? t("playAudio") : st === "playing" ? t("playing") : t("played");
    return '<button class="cushion player c-pink' + (st === "playing" ? " live" : "") + '" data-action="playAudio"' + (st !== "idle" ? " disabled" : "") + ">" +
      '<span class="ico">' + icon(st === "playing" ? "volume" : "play") + '</span>' +
      '<span class="txt"><span class="name">' + label + '</span><span class="hint">' + t("audioHint") + "</span></span></button>";
  }
  function refreshPlayer() {
    var box = document.getElementById("playerBox");
    if (box) box.innerHTML = playerHtml();
  }

  function quizTestHtml(kind) {
    var d = QUIZ[kind].data, a = qz ? qz.answers : {}, html;
    if (kind === "reading") {
      html = '<div class="passage"><h2>' + esc(d.title) + "</h2>" +
        d.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>";
    } else {
      html = '<h1>' + esc(d.title) + '</h1><div id="playerBox">' + playerHtml() + "</div>";
    }
    var last = null;
    d.questions.forEach(function (q, i) {
      if (q.type !== last) {
        html += '<p class="instr">' + t(INSTR[kind][q.type]) + "</p>";
        last = q.type;
      }
      html += questionHtml(q, i, a[q.id]);
    });
    return html + '<button class="cushion key c-mint finish" data-action="finishQuiz">' + t("finish") + "</button>" +
      '<button class="link" data-action="quit">' + t("quit") + "</button>";
  }

  function quizIntroHtml(kind) {
    var d = QUIZ[kind].data;
    return "<h1>" + t(kind) + "</h1>" +
      '<p class="lead">' + t(kind + "Meta").replace("{q}", d.questions.length).replace("{m}", d.minutes) + "</p>" +
      '<p class="lead">' + t(kind + "Rules") + "</p>" +
      '<button class="cushion key c-violet" data-action="startQuiz" data-kind="' + kind + '">' + t("startTest") + "</button>";
  }

  function quizTips(kind, r) {
    var out = [];
    ["mcq", "tfng", "gap"].forEach(function (k) {
      var b = r.byType[k], key = QUIZ[kind].advice[k];
      if (b && b.t && key && b.c / b.t < 0.6) out.push("<b>" + TYPE_NAME[k] + "</b> (" + b.c + "/" + b.t + "): " + t(key));
    });
    return out;
  }
  function quizTipsPlain(kind, r) {
    return quizTips(kind, r).map(function (s) { return s.replace(/<\/?b>/g, ""); });
  }

  function quizResultHtml(kind) {
    var r = state.results[kind], d = SETS[kind][r.set || 0] || QUIZ[kind].data;
    var h = resultCard(t("estBand"), r.band, ["CEFR " + cefrFromBand(r.band), t("correctOf").replace("{c}", r.correct).replace("{t}", r.total)]);
    var tp = quizTips(kind, r);
    h += "<h2>" + t("advice") + "</h2>";
    h += tp.length ? tp.map(function (x) { return '<div class="tip">' + x + "</div>"; }).join("") : '<div class="tip ok">' + t("allGood") + "</div>";
    h += "<h2>" + t("review") + "</h2>";
    d.questions.forEach(function (q, i) {
      var ans = r.answers[q.id], ok = isCorrect(q, ans), g = givenText(q, ans);
      h += '<div class="rv ' + (ok ? "good" : "bad") + '"><span class="qn">' + (i + 1) + "</span><div>" +
        '<div class="rq">' + esc(q.q) + "</div>" +
        '<div class="ra">' + t("yourAnswer") + ": <b>" + (g === null ? t("noAnswer") : esc(g)) + "</b></div>" +
        (ok ? "" : '<div class="ra">' + t("correctAnswer") + ": <b>" + esc(correctText(q)) + "</b></div>") +
        "</div></div>";
    });
    return h + '<p class="note">' + t("estimateNote") + "</p>" +
      '<button class="cushion key c-violet" data-go="hub">' + t("backToTests") + "</button>" +
      '<button class="link" data-go="' + kind + '">' + t("retake") + "</button>";
  }

  function leaveQuiz() {
    stopTimer();
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    if (qz && qz.el) { try { qz.el.pause(); } catch (e) {} }
    qz = null;
  }
  actions.startQuiz = function (el) {
    var kind = el.getAttribute("data-kind");
    var idx = pickIndex(kind, SETS[kind].length);
    QUIZ[kind].data = SETS[kind][idx];
    qz = { kind: kind, answers: {}, audio: "idle", set: idx };
    startTimer(QUIZ[kind].data.minutes, function () {
      toast(t("timeUp"));
      finishQuiz(true);
    });
    navigate(kind + "Test");
  };
  actions.finishQuiz = function () { finishQuiz(false); };
  function finishQuiz(force) {
    if (!qz) return;
    var kind = qz.kind, d = QUIZ[kind].data;
    var left = d.questions.length - answeredCount();
    if (!force && left > 0 && !window.confirm(t("confirmUnanswered").replace("{n}", left))) return;
    var correct = 0, byType = {};
    d.questions.forEach(function (q) {
      var ok = isCorrect(q, qz.answers[q.id]);
      byType[q.type] = byType[q.type] || { c: 0, t: 0 };
      byType[q.type].t++;
      if (ok) { correct++; byType[q.type].c++; }
    });
    var total = d.questions.length, band = bandFromRaw(kind, correct, total);
    saveResult(kind, { correct: correct, total: total, band: band, byType: byType, answers: qz.answers, set: qz.set, at: Date.now() },
      { correct: correct, total: total, byType: byType, set: d.id });
    navigate(kind + "Result");
  }

  // Listening: audio
  actions.playAudio = function () {
    if (!qz || qz.kind !== "listening" || qz.audio !== "idle") return;
    var d = QUIZ.listening.data;
    qz.audio = "playing";
    refreshPlayer();
    var me = qz;
    function done() { if (qz === me) { me.audio = "done"; refreshPlayer(); } }
    function fail() { if (qz === me) { me.audio = "idle"; refreshPlayer(); toast(t("audioError")); } }
    if (d.audio) {
      var au = new Audio(d.audio);
      me.el = au;
      au.onended = done;
      au.onerror = fail;
      var p = au.play();
      if (p && p.catch) p.catch(fail);
      return;
    }
    var syn = window.speechSynthesis;
    syn.cancel();
    var voices = (syn.getVoices() || []).filter(function (v) { return /^en/i.test(v.lang); });
    var vA = voices[0], vB = voices.length > 1 ? voices[1] : voices[0];
    d.script.forEach(function (ln, i) {
      var u = new SpeechSynthesisUtterance(ln.text);
      u.lang = "en-GB";
      u.rate = 0.92;
      u.pitch = ln.s === "A" ? 1.15 : 0.85;
      var v = ln.s === "A" ? vA : vB;
      if (v) { u.voice = v; u.lang = v.lang; }
      if (i === d.script.length - 1) { u.onend = done; u.onerror = done; }
      syn.speak(u);
    });
  };

  // ====================== Umumiy natija ======================
  function sectionWeak(kind) {
    var r = state.results[kind];
    if (!r) return [];
    if (kind === "reading" || kind === "listening") return quizTipsPlain(kind, r);
    return r.weaknesses || [];
  }
  function overallHtml() {
    var res = state.results, bandsList = SKILLS.map(function (k) { return res[k].band; });
    var ov = avgBand(bandsList);
    var h = resultCard(t("overallTitle"), ov, ["CEFR " + cefrFromBand(ov), "IELTS " + fmtBand(ov)]);
    h += "<h2>" + t("bySkill") + "</h2>" + bars(SKILLS.map(function (k) { return { label: t(k), value: res[k].band }; }));
    var weakHtml = "";
    SKILLS.forEach(function (k) {
      var w = sectionWeak(k);
      if (w.length) weakHtml += "<h3>" + t(k) + "</h3>" + w.map(function (x) { return '<div class="tip">' + esc(x) + "</div>"; }).join("");
    });
    h += "<h2>" + t("weaknesses") + "</h2>" + (weakHtml || '<div class="tip ok">' + t("allGood") + "</div>");
    h += '<div style="margin-top:28px">' + bigCushion({ color: "c-orange", icon: "cert", name: t("certificate"), hint: t("certificateHint"), go: "certificate" }) + "</div>";
    return h + '<p class="note">' + t("estimateNote") + "</p>" +
      '<button class="cushion key c-violet" data-go="hub">' + t("backToTests") + "</button>";
  }

  // ====================== Ekranlar ======================
  function doneCount() {
    var n = 0;
    SKILLS.forEach(function (k) { if (state.results[k]) n++; });
    return n;
  }
  function tag(k) { return state.results[k] ? fmtBand(state.results[k].band) : ""; }

  define("home", {
    depth: 0, drop: true,
    html: function () {
      return '<h1 class="hero">' + t("tagline") + "</h1>" +
        '<div class="stack">' +
        bigCushion({ color: "c-violet", icon: "english", name: t("english"), hint: t("englishHint"), go: "english" }) +
        '<div class="row3">' +
        smallCushion("c-orange", "math", "math") +
        smallCushion("c-mint", "biology", "biology") +
        smallCushion("c-pink", "chemistry", "chemistry") +
        "</div></div>";
    }
  });
  define("english", {
    depth: 1, parent: "home",
    html: function () {
      return "<h1>" + t("beginnerEnglish") + "</h1>" +
        '<p class="lead">' + t("chooseSection") + "</p>" +
        '<div class="stack">' +
        bigCushion({ color: "c-violet", icon: "target", name: t("cefrIelts"), hint: t("cefrIeltsDesc"), go: "cefr" }) +
        bigCushion({ color: "c-orange", icon: "prep", name: t("ieltsPrep"), hint: t("ieltsPrepDesc"), soon: true }) +
        "</div>";
    }
  });
  define("register", {
    depth: 2, parent: "english",
    html: function () {
      return "<h1>" + t("registerTitle") + "</h1>" +
        '<p class="lead">' + t("registerSub") + "</p>" +
        '<form id="regForm" novalidate>' +
        field("fn", t("firstName"), 'autocomplete="given-name" maxlength="40"') +
        field("ln", t("lastName"), 'autocomplete="family-name" maxlength="40"') +
        field("ph", t("phone"), 'type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="' + t("phonePlaceholder") + '"') +
        '<button class="cushion key c-violet" type="submit">' + t("start") + "</button>" +
        '<p class="note" style="margin-top:0">' + t("privacyNote") + "</p>" +
        "</form>";
    }
  });
  define("hub", {
    depth: 2, parent: "english", drop: true,
    html: function () {
      var u = state.user || { first: "" }, n = doneCount();
      var top = n === SKILLS.length
        ? '<div class="stack" style="margin-bottom:26px">' + bigCushion({ color: "c-mint", icon: "trophy", name: t("overallTitle"), hint: t("overallHint"), go: "overall" }) + "</div>"
        : '<p class="progress">' + t("progress").replace("{n}", n) + "</p>";
      return "<h1>" + t("hello") + ", " + esc(u.first) + "!</h1>" +
        '<p class="lead">' + t("hubSub") + "</p>" + top +
        '<div class="grid2">' +
        skillCushion("c-violet", "reading", tag("reading")) +
        skillCushion("c-pink", "listening", tag("listening")) +
        skillCushion("c-orange", "writing", tag("writing")) +
        skillCushion("c-mint", "speaking", tag("speaking")) +
        "</div>" +
        '<p class="note">' + t("estimateNote") + "</p>" +
        '<button class="link" data-action="logout">' + t("logout") + "</button>";
    }
  });
  define("overall", {
    depth: 3, parent: "hub", drop: true,
    need: function () { return doneCount() === SKILLS.length; }, fallback: "hub",
    html: overallHtml
  });

  ["reading", "listening"].forEach(function (kind) {
    define(kind, { depth: 3, parent: "hub", html: function () { return quizIntroHtml(kind); } });
    define(kind + "Test", {
      depth: 4, parent: kind,
      need: function () { return !!qz && qz.kind === kind; }, fallback: kind,
      bar: function () { return timerChip(answeredCount() + "/" + QUIZ[kind].data.questions.length); },
      html: function () { return quizTestHtml(kind); },
      leave: leaveQuiz
    });
    define(kind + "Result", {
      depth: 4, parent: "hub", drop: true,
      need: function () { return !!state.results[kind]; }, fallback: kind,
      html: function () { return quizResultHtml(kind); }
    });
  });

  // ====================== Chizish va navigatsiya ======================
  function renderBar() {
    var d = defs[screen];
    if (d.bar) barLeft.innerHTML = d.bar();
    else if (screen === "home") barLeft.innerHTML = '<div class="wordmark">sofa.<span class="chip">ai</span></div>';
    else barLeft.innerHTML = '<button class="back" data-go="' + d.parent + '">' + icon("chev") + t("back") + "</button>";
  }
  function setLangUI() {
    langsEl.style.setProperty("--i", LANGS.indexOf(state.lang));
    var btns = langsEl.querySelectorAll("button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", btns[i].getAttribute("data-lang") === state.lang ? "true" : "false");
    }
    document.documentElement.lang = state.lang;
  }
  function countUp() {
    var el = document.getElementById("bandNum");
    if (!el || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var to = parseFloat(el.getAttribute("data-to")), t0 = null;
    el.textContent = "0.0";
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0 - 500) / 1100);
      if (p < 0) { requestAnimationFrame(step); return; }
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = (Math.round(to * e * 2) / 2).toFixed(1);
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmtBand(to);
    }
    requestAnimationFrame(step);
  }
  function render(o) {
    o = o || {};
    var d = defs[screen];
    if (d.need && !d.need()) { screen = d.fallback; d = defs[screen]; }
    renderBar();
    view.innerHTML = d.html();
    view.className = "view";
    if (o.anim) {
      void view.offsetWidth;
      view.classList.add("enter-" + o.anim);
    }
    if (o.drop) {
      var cs = view.querySelectorAll(".cushion");
      for (var i = 0; i < cs.length; i++) {
        cs[i].style.setProperty("--d", i * 90 + "ms");
        cs[i].classList.add("drop");
      }
      countUp();
    }
    if (d.after) d.after();
  }
  function navigate(to) {
    var target = to === "cefr" ? (state.user ? "hub" : "register") : to;
    var from = screen;
    if (defs[from] && defs[from].leave) defs[from].leave();
    screen = target;
    var d = defs[target];
    if (d.drop) render({ drop: true });
    else render({ anim: d.depth > defs[from].depth ? "fwd" : "back" });
    window.scrollTo(0, 0);
  }

  // ----- ro'yxatdan o'tish -----
  function submitRegister() {
    var fn = document.getElementById("fn").value.trim();
    var ln = document.getElementById("ln").value.trim();
    var raw = document.getElementById("ph").value.trim();
    var digits = raw.replace(/\D/g, "");
    var phone = (raw.charAt(0) === "+" ? "+" : "") + digits;
    var firstBad = null;
    function check(id, bad, msg) {
      var el = document.getElementById(id);
      document.getElementById(id + "Err").textContent = bad ? msg : "";
      if (bad) { bump(el.parentNode); if (!firstBad) firstBad = el; }
    }
    check("fn", !fn, t("required"));
    check("ln", !ln, t("required"));
    check("ph", digits.length < 9 || digits.length > 15, t("phoneInvalid"));
    if (firstBad) { firstBad.focus(); return; }
    state.user = { first: fn, last: ln, phone: phone, id: uuid(), synced: false };
    save();
    ensureProfile();
    navigate("hub");
  }

  // ----- hodisalar -----
  actions.quit = function () {
    if (window.confirm(t("confirmQuit"))) navigate("hub");
  };
  actions.logout = function () {
    state.user = null;
    state.results = {};
    save();
    navigate("home");
  };

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-go],[data-lang],[data-soon],[data-action],[data-q]");
    if (!el || el.disabled) return;

    if (el.hasAttribute("data-q")) {
      if (!qz) return;
      var q = getQ(qz.kind, el.getAttribute("data-q")), v = el.getAttribute("data-v");
      qz.answers[q.id] = q.type === "mcq" ? Number(v) : v;
      var sibs = el.parentNode.querySelectorAll(".opt");
      for (var i = 0; i < sibs.length; i++) {
        var on = sibs[i] === el;
        sibs[i].classList.toggle("on", on);
        sibs[i].setAttribute("aria-pressed", on ? "true" : "false");
      }
      updateAns();
      return;
    }
    if (el.hasAttribute("data-go")) return navigate(el.getAttribute("data-go"));
    if (el.hasAttribute("data-lang")) {
      var keep = {};
      ["fn", "ln", "ph"].forEach(function (id) {
        var x = document.getElementById(id);
        if (x) keep[id] = x.value;
      });
      state.lang = el.getAttribute("data-lang");
      save();
      setLangUI();
      render();
      Object.keys(keep).forEach(function (id) { document.getElementById(id).value = keep[id]; });
      return;
    }
    if (el.hasAttribute("data-soon")) { bump(el); return toast(t("soon")); }
    var fn = actions[el.getAttribute("data-action")];
    if (fn) fn(el);
  });

  document.addEventListener("input", function (e) {
    var el = e.target;
    if (qz && el.hasAttribute && el.hasAttribute("data-gap")) {
      qz.answers[el.getAttribute("data-gap")] = el.value;
      updateAns();
    }
  });
  document.addEventListener("submit", function (e) {
    if (e.target.id === "regForm") {
      e.preventDefault();
      submitRegister();
    }
  });

  window.SOFA = {
    define: define, actions: actions, state: state, save: save, t: t, esc: esc, icon: icon, toast: toast, bump: bump,
    navigate: navigate, render: render, fmtBand: fmtBand, cefr: cefrFromBand, saveResult: saveResult,
    resultCard: resultCard, bars: bars, tips: tips, countWords: countWords, timerChip: timerChip, fmtTime: fmtTime,
    startTimer: startTimer, stopTimer: stopTimer, badge: badge, pickIndex: pickIndex,
    start: function () { setLangUI(); render({ drop: true }); }
  };
})();
