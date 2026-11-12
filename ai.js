// sofa.ai: Writing va Speaking (AI tahlil). app.js'dan keyin yuklanadi.
(function () {
  var S = window.SOFA, t = S.t, esc = S.esc, icon = S.icon, state = S.state;
  var wr = null; // joriy Writing urinishi
  var sp = null; // joriy Speaking urinishi

  // ----- server bilan aloqa -----
  function api(payload, ms) {
    var ctl = window.AbortController ? new AbortController() : null;
    var to = setTimeout(function () { if (ctl) ctl.abort(); }, ms || 28000);
    return fetch("/.netlify/functions/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      return r.json().catch(function () { return { error: "upstream" }; }).then(function (j) {
        clearTimeout(to);
        if (!r.ok) {
          var e = new Error(j.error || "http");
          e.code = r.status === 404 ? "not_configured" : (j.error || "upstream");
          throw e;
        }
        return j;
      });
    }, function (e) {
      clearTimeout(to);
      var err = new Error("net");
      err.code = e && e.name === "AbortError" ? "timeout" : "network";
      throw err;
    });
  }
  function errMsg(e) {
    var map = { not_configured: "errNotConfigured", rate_limited: "errRate", too_short: "errShort", timeout: "errTimeout",
      network: "errNetwork", bad_audio: "errAudio", too_long: "errLong" };
    return t(map[e && e.code] || "errUpstream");
  }
  function loadingHtml(text) {
    return '<div class="loading"><span class="spin"></span><p>' + esc(text) + "</p></div>";
  }

  // ====================== WRITING ======================
  S.define("writing", {
    depth: 3, parent: "hub",
    html: function () {
      return "<h1>" + t("writing") + "</h1>" +
        '<p class="lead">' + t("writingMeta").replace("{w}", WRITING.minWords).replace("{m}", WRITING.minutes) + "</p>" +
        '<p class="lead">' + t("writingRules") + "</p>" +
        '<button class="cushion key c-orange" data-action="startWriting">' + t("startTest") + "</button>";
    }
  });
  S.define("writingTest", {
    depth: 4, parent: "writing",
    need: function () { return !!wr; }, fallback: "writing",
    bar: function () { return S.timerChip(); },
    html: function () {
      var h = '<div class="passage"><h2>' + t("essayPrompt") + "</h2><p>" + esc(wr.prompt) + "</p></div>";
      if (wr.busy) return h + loadingHtml(t("checking"));
      var n = S.countWords(wr.text);
      h += '<textarea id="essay" class="essay" placeholder="' + esc(t("essayPlaceholder")) + '" autocapitalize="sentences" spellcheck="true">' + esc(wr.text) + "</textarea>" +
        '<div class="wc"><span id="wc">' + t("wordsCount").replace("{n}", n) + "</span><span>" + t("minHint").replace("{w}", WRITING.minWords) + "</span></div>" +
        '<div class="err" id="wrErr">' + esc(wr.err || "") + "</div>" +
        '<button class="cushion key c-mint" data-action="submitEssay">' + t("submitEssay") + "</button>" +
        '<button class="link" data-action="quit">' + t("quit") + "</button>";
      return h;
    },
    leave: function () { S.stopTimer(); wr = null; }
  });
  S.define("writingResult", {
    depth: 4, parent: "hub", drop: true,
    need: function () { return !!state.results.writing; }, fallback: "writing",
    html: function () {
      var r = state.results.writing, b = r.bands;
      var h = S.resultCard(t("estBand"), r.band, ["CEFR " + S.cefr(r.band), r.words + " " + t("words")]);
      h += "<h2>" + t("criteria") + "</h2>" + S.bars([
        { label: t("c_task"), value: b.task }, { label: t("c_coherence"), value: b.coherence },
        { label: t("c_lexical"), value: b.lexical }, { label: t("c_grammar"), value: b.grammar }]);
      h += S.tips(t("strengths"), r.strengths, "ok") + S.tips(t("weaknesses"), r.weaknesses);
      if (r.corrections && r.corrections.length) {
        h += "<h2>" + t("corrections") + "</h2>" + r.corrections.map(function (c) {
          return '<div class="tip"><span class="was">' + esc(c.original) + "</span><br><b>" + esc(c.better) + "</b></div>";
        }).join("");
      }
      return h + '<p class="note">' + t("estimateNote") + "</p>" +
        '<button class="cushion key c-violet" data-go="hub">' + t("backToTests") + "</button>" +
        '<button class="link" data-go="writing">' + t("retake") + "</button>";
    }
  });

  S.actions.startWriting = function () {
    var p = WRITING.prompts;
    wr = { prompt: p[Math.floor(Math.random() * p.length)], text: "", busy: false, err: "" };
    S.startTimer(WRITING.minutes, function () { S.toast(t("timeUp")); submitEssay(true); });
    S.navigate("writingTest");
  };
  S.actions.submitEssay = function () { submitEssay(false); };

  function submitEssay(force) {
    if (!wr || wr.busy) return;
    var words = S.countWords(wr.text);
    if (words < WRITING.submitWords) {
      if (force) { S.toast(t("errShort")); S.navigate("hub"); return; }
      wr.err = t("tooShortEssay").replace("{w}", WRITING.submitWords);
      var el = document.getElementById("wrErr");
      if (el) el.textContent = wr.err;
      return;
    }
    wr.busy = true;
    wr.err = "";
    S.render();
    var me = wr;
    api({ kind: "writing", essay: wr.text, prompt: wr.prompt, lang: state.lang }, 28000).then(function (r) {
      if (wr !== me) return;
      S.saveResult("writing", {
        band: r.overall, bands: r.bands, strengths: r.strengths, weaknesses: r.weaknesses,
        corrections: r.corrections, words: r.words, essay: me.text, at: Date.now()
      }, { bands: r.bands, words: r.words, weaknesses: r.weaknesses });
      S.navigate("writingResult");
    }).catch(function (e) {
      if (wr !== me) return;
      me.busy = false;
      me.err = errMsg(e);
      S.render();
    });
  }

  // ====================== SPEAKING ======================
  var SQ = SPEAKING.questions;

  S.define("speaking", {
    depth: 3, parent: "hub",
    html: function () {
      return "<h1>" + t("speaking") + "</h1>" +
        '<p class="lead">' + t("speakingMeta").replace("{n}", SQ.length) + "</p>" +
        '<p class="lead">' + t("speakingRules") + "</p>" +
        '<button class="cushion key c-mint" data-action="startSpeaking">' + t("startTest") + "</button>";
    }
  });
  S.define("speakingTest", {
    depth: 4, parent: "speaking",
    need: function () { return !!sp; }, fallback: "speaking",
    bar: function () { return '<div class="timer" id="timer">' + icon("speaking") + '<span id="sq">' + (sp.i + 1) + "/" + SQ.length + "</span></div>"; },
    html: speakingHtml,
    leave: function () { killRecorder(); try { window.speechSynthesis.cancel(); } catch (e) {} sp = null; }
  });
  S.define("speakingResult", {
    depth: 4, parent: "hub", drop: true,
    need: function () { return !!state.results.speaking; }, fallback: "speaking",
    html: function () {
      var r = state.results.speaking, b = r.bands;
      var h = S.resultCard(t("estBand"), r.band, ["CEFR " + S.cefr(r.band), r.words + " " + t("words")]);
      h += "<h2>" + t("criteria") + "</h2>" + S.bars([
        { label: t("c_fluency"), value: b.fluency }, { label: t("c_lexical"), value: b.lexical },
        { label: t("c_grammar"), value: b.grammar }, { label: t("c_pronunciation"), value: b.pronunciation }]);
      h += '<p class="note" style="margin-top:12px">' + t("speechNote") + "</p>";
      h += S.tips(t("strengths"), r.strengths, "ok") + S.tips(t("weaknesses"), r.weaknesses);
      h += "<h2>" + t("transcript") + "</h2>" + (r.transcripts || []).map(function (x) {
        return '<div class="tip"><b>' + esc(x.q) + "</b><br>" + esc(x.text || "…") + "</div>";
      }).join("");
      return h + '<p class="note">' + t("estimateNote") + "</p>" +
        '<button class="cushion key c-violet" data-go="hub">' + t("backToTests") + "</button>" +
        '<button class="link" data-go="speaking">' + t("retake") + "</button>";
    }
  });

  function speakingHtml() {
    var q = SQ[sp.i], last = sp.i === SQ.length - 1;
    var h = '<div class="passage"><h2>' + t("questionOf").replace("{i}", sp.i + 1).replace("{n}", SQ.length) + " · " + q.part + "</h2><p>" + esc(q.q) + "</p>";
    if (q.cue) h += "<p>" + t("cueIntro") + "</p><ul class=\"cue\">" + q.cue.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>";
    h += "</div>";
    if (sp.phase === "busy") return h + loadingHtml(t("analyzing").replace("{i}", sp.progress).replace("{n}", SQ.length));
    h += '<div class="err" id="spErr">' + esc(sp.err || "") + "</div>";

    if (sp.phase === "recording") {
      h += '<div class="recbox"><button class="recbtn on" data-action="recStop" aria-label="' + esc(t("stopRec")) + '">' + icon("stop") + "</button>" +
        '<div class="rt"><span id="rt">00:00</span> / ' + S.fmtTime(q.max) + '</div><div class="rl2">' + t("recording") + "</div></div>";
    } else if (sp.phase === "review") {
      var c = sp.clips[sp.i];
      h += '<div class="tip ok">' + t("recorded").replace("{s}", Math.round(c.secs)) + "</div>" +
        '<button class="cushion key ' + (last ? "c-mint" : "c-violet") + '" data-action="' + (last ? "submitSpeaking" : "nextQ") + '">' +
        (last ? t("submitSpeaking") : t("nextQ")) + "</button>" +
        '<button class="link" data-action="recStart">' + t("reRecord") + "</button>";
    } else {
      h += '<div class="recbox"><button class="recbtn" data-action="recStart" aria-label="' + esc(t("record")) + '">' + icon("speaking") + "</button>" +
        '<div class="rl2">' + t("record") + "</div></div>" +
        '<button class="link" data-action="speakQ">' + icon("volume") + " " + t("listenQ") + "</button>";
    }
    return h + '<button class="link" data-action="quit">' + t("quit") + "</button>";
  }

  function killRecorder() {
    if (!sp) return;
    clearInterval(sp.tick);
    if (sp.rec) {
      sp.rec.onstop = null;
      try { if (sp.rec.state !== "inactive") sp.rec.stop(); } catch (e) {}
    }
    if (sp.stream) sp.stream.getTracks().forEach(function (tr) { try { tr.stop(); } catch (e) {} });
    sp.rec = null;
    sp.stream = null;
  }

  S.actions.startSpeaking = function () {
    sp = { i: 0, phase: "idle", clips: [], answers: [], err: "", progress: 1 };
    S.navigate("speakingTest");
  };
  S.actions.speakQ = function () {
    if (!sp || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(SQ[sp.i].q);
      u.lang = "en-GB";
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  };
  S.actions.recStart = function () {
    if (!sp || sp.phase === "recording") return;
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder)) {
      sp.err = t("micUnsupported");
      return S.render();
    }
    try { window.speechSynthesis.cancel(); } catch (e) {}
    var me = sp;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      if (sp !== me) { stream.getTracks().forEach(function (tr) { tr.stop(); }); return; }
      var types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"], mime = "";
      for (var k = 0; k < types.length; k++) {
        if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(types[k])) { mime = types[k]; break; }
      }
      var opts = { audioBitsPerSecond: 32000 };
      if (mime) opts.mimeType = mime;
      var rec = new MediaRecorder(stream, opts), chunks = [];
      rec.ondataavailable = function (ev) { if (ev.data && ev.data.size) chunks.push(ev.data); };
      rec.onstop = function () { onRecorded(me, chunks, rec.mimeType || mime || "audio/webm"); };
      me.stream = stream;
      me.rec = rec;
      me.err = "";
      me.t0 = Date.now();
      me.phase = "recording";
      rec.start();
      me.tick = setInterval(function () {
        var s = Math.floor((Date.now() - me.t0) / 1000), el = document.getElementById("rt");
        if (el) el.textContent = S.fmtTime(s);
        if (s >= SQ[me.i].max) S.actions.recStop();
      }, 250);
      S.render();
    }).catch(function () {
      if (sp !== me) return;
      me.err = t("micDenied");
      S.render();
    });
  };
  S.actions.recStop = function () {
    if (sp && sp.rec && sp.rec.state !== "inactive") sp.rec.stop();
  };
  function onRecorded(me, chunks, mime) {
    if (sp !== me) return;
    clearInterval(me.tick);
    if (me.stream) me.stream.getTracks().forEach(function (tr) { tr.stop(); });
    me.rec = null;
    me.stream = null;
    var secs = (Date.now() - me.t0) / 1000;
    if (secs < 3 || !chunks.length) {
      me.phase = "idle";
      me.err = t("tooShortClip");
    } else {
      me.clips[me.i] = { blob: new Blob(chunks, { type: mime }), secs: secs, mime: mime };
      me.answers[me.i] = null; // eski tahlilni bekor qilamiz
      me.phase = "review";
      me.err = "";
    }
    S.render();
  }
  S.actions.nextQ = function () {
    if (!sp || sp.phase !== "review") return;
    sp.i++;
    sp.phase = "idle";
    sp.err = "";
    S.render();
  };

  function toBase64(blob) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(String(fr.result).split(",")[1] || ""); };
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
  }
  S.actions.submitSpeaking = function () {
    if (!sp || sp.phase === "busy") return;
    var me = sp;
    me.phase = "busy";
    me.err = "";
    me.progress = 1;
    S.render();

    var chain = Promise.resolve();
    SQ.forEach(function (q, i) {
      chain = chain.then(function () {
        if (sp !== me) throw new Error("cancel");
        if (me.answers[i]) return; // oldin tanilgan
        me.progress = i + 1;
        S.render();
        var c = me.clips[i];
        return toBase64(c.blob).then(function (b64) {
          return api({ kind: "transcribe", audio: b64, mime: c.mime }, 28000);
        }).then(function (r) {
          me.answers[i] = { q: q.q, text: r.text, duration: r.duration || c.secs, pauses: r.pauses, conf: r.conf };
        });
      });
    });
    chain.then(function () {
      if (sp !== me) return;
      return api({ kind: "speaking", answers: me.answers, lang: state.lang }, 28000).then(function (r) {
        if (sp !== me) return;
        S.saveResult("speaking", {
          band: r.overall, bands: r.bands, strengths: r.strengths, weaknesses: r.weaknesses, words: r.words,
          transcripts: me.answers.map(function (a) { return { q: a.q, text: a.text }; }), at: Date.now()
        }, { bands: r.bands, words: r.words, weaknesses: r.weaknesses });
        S.navigate("speakingResult");
      });
    }).catch(function (e) {
      if (sp !== me || (e && e.message === "cancel")) return;
      me.phase = "review";
      me.err = errMsg(e);
      S.render();
    });
  };

  // ----- Writing matn kiritish -----
  document.addEventListener("input", function (e) {
    if (e.target.id === "essay" && wr) {
      wr.text = e.target.value;
      var el = document.getElementById("wc");
      if (el) el.textContent = t("wordsCount").replace("{n}", S.countWords(wr.text));
    }
  });

  S.start();
})();
