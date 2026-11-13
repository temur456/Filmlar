// sofa.ai: sertifikat. Foydalanuvchi ismi va natijalari bilan 1536x1024 rasm chizadi va PNG qilib yuklab beradi.
(function () {
  var S = window.SOFA, t = S.t, state = S.state;
  var W = 1536, H = 1024;
  var blobUrl = null;
  var FONT = "Onest, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  var DISPLAY = "Unbounded, Onest, system-ui, sans-serif";

  // ----- chizish yordamchilari -----
  function rr(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }
  function star4(c, cx, cy, r, k) {
    k = k || 0.16;
    c.beginPath();
    c.moveTo(cx, cy - r);
    c.quadraticCurveTo(cx + r * k, cy - r * k, cx + r, cy);
    c.quadraticCurveTo(cx + r * k, cy + r * k, cx, cy + r);
    c.quadraticCurveTo(cx - r * k, cy + r * k, cx - r, cy);
    c.quadraticCurveTo(cx - r * k, cy - r * k, cx, cy - r);
    c.closePath();
  }
  function textWidth(c, text, sp) {
    var w = 0;
    for (var i = 0; i < text.length; i++) w += c.measureText(text[i]).width + sp;
    return w - sp;
  }
  // Harflar orasi ochiq, markazlangan matn (letterSpacing hamma brauzerda yo'q, shuning uchun qo'lda)
  function spaced(c, text, cx, y, sp) {
    var x = cx - textWidth(c, text, sp) / 2;
    c.textAlign = "left";
    for (var i = 0; i < text.length; i++) {
      c.fillText(text[i], x, y);
      x += c.measureText(text[i]).width + sp;
    }
  }
  function fitSize(c, text, fontFn, size, maxW, sp) {
    for (var s = size; s > 18; s -= 2) {
      c.font = fontFn(s);
      if ((sp ? textWidth(c, text, sp) : c.measureText(text).width) <= maxW) return s;
    }
    return 18;
  }
  function line(c, x1, x2, y, alpha) {
    var g = c.createLinearGradient(x1, 0, x2, 0);
    g.addColorStop(0, "rgba(167,139,250,0)");
    g.addColorStop(0.5, "rgba(167,139,250," + alpha + ")");
    g.addColorStop(1, "rgba(167,139,250,0)");
    c.strokeStyle = g;
    c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(x1, y); c.lineTo(x2, y); c.stroke();
  }
  function ribbons(c) {
    var g = c.createLinearGradient(0, 0, 440, 340);
    g.addColorStop(0, "#b49bff"); g.addColorStop(0.5, "#6d4aff"); g.addColorStop(1, "#32198a");
    c.fillStyle = "#4425c4";
    c.beginPath(); c.moveTo(0, 340); c.bezierCurveTo(120, 170, 340, 70, 470, 0); c.lineTo(430, 0);
    c.bezierCurveTo(330, 60, 120, 150, 0, 330); c.closePath(); c.fill();
    c.fillStyle = g;
    c.beginPath(); c.moveTo(0, 0); c.lineTo(430, 0); c.bezierCurveTo(330, 60, 120, 150, 0, 330); c.closePath(); c.fill();
    c.fillStyle = "rgba(255,255,255,.13)";
    c.beginPath(); c.moveTo(0, 0); c.lineTo(300, 0); c.bezierCurveTo(220, 50, 90, 110, 0, 230); c.closePath(); c.fill();
  }

  // ----- asosiy chizish -----
  function draw(canvas, d) {
    canvas.width = W;
    canvas.height = H;
    var c = canvas.getContext("2d");
    c.textBaseline = "alphabetic";

    // fon
    var bg = c.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0b0820"); bg.addColorStop(0.5, "#06050d"); bg.addColorStop(1, "#0d0824");
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    var glow = c.createRadialGradient(W * 0.5, H * 0.33, 40, W * 0.5, H * 0.33, 720);
    glow.addColorStop(0, "rgba(124,92,255,.17)"); glow.addColorStop(1, "rgba(124,92,255,0)");
    c.fillStyle = glow; c.fillRect(0, 0, W, H);
    c.strokeStyle = "rgba(157,140,255,.05)"; c.lineWidth = 1.2;
    for (var i = 0; i < 16; i++) {
      c.beginPath(); c.moveTo(0, 520 + i * 22);
      c.bezierCurveTo(400, 420 + i * 18, 900, 700 - i * 10, W, 560 + i * 20); c.stroke();
    }

    // lentalar
    ribbons(c);
    c.save(); c.translate(W, H); c.rotate(Math.PI); c.scale(0.8, 0.8); ribbons(c); c.restore();

    // katta xira yulduz
    c.save();
    var sg = c.createLinearGradient(1290, 120, 1520, 380);
    sg.addColorStop(0, "rgba(167,139,250,.5)"); sg.addColorStop(1, "rgba(80,60,170,.12)");
    c.fillStyle = sg; star4(c, 1405, 250, 135, 0.13); c.fill();
    c.restore();

    // ramka
    c.strokeStyle = "rgba(167,139,250,.5)"; c.lineWidth = 2;
    c.strokeRect(30, 30, W - 60, H - 60);
    [[30, 30], [W - 30, 30], [30, H - 30], [W - 30, H - 30]].forEach(function (p) {
      c.fillStyle = "#0a0820"; c.fillRect(p[0] - 9, p[1] - 9, 18, 18);
      c.strokeStyle = "rgba(167,139,250,.65)"; c.strokeRect(p[0] - 9, p[1] - 9, 18, 18);
    });

    // yuqori logo
    c.font = "700 60px " + FONT;
    var wSofa = c.measureText("Sofa").width, wAi = c.measureText(".ai").width;
    var total = 76 + 16 + wSofa + wAi, x0 = W / 2 - total / 2;
    var lg = c.createLinearGradient(x0, 50, x0 + 76, 130);
    lg.addColorStop(0, "#a99bff"); lg.addColorStop(1, "#5b3df5");
    c.fillStyle = lg; star4(c, x0 + 38, 92, 40, 0.14); c.fill();
    c.textAlign = "left"; c.fillStyle = "#ffffff"; c.fillText("Sofa", x0 + 92, 113);
    c.fillStyle = "#8b7bff"; c.fillText(".ai", x0 + 92 + wSofa, 113);

    // CERTIFICATE
    var title = "CERTIFICATE", sp = 16;
    var ts = fitSize(c, title, function (s) { return "600 " + s + "px " + DISPLAY; }, 96, 820, sp);
    c.font = "600 " + ts + "px " + DISPLAY;
    var tg = c.createLinearGradient(0, 170, 0, 262);
    tg.addColorStop(0, "#ffffff"); tg.addColorStop(0.5, "#b9b7d2"); tg.addColorStop(0.75, "#8f8da8"); tg.addColorStop(1, "#e4e3f1");
    c.save(); c.shadowColor = "rgba(124,92,255,.4)"; c.shadowBlur = 26; c.fillStyle = tg;
    spaced(c, title, W / 2, 252, sp); c.restore();

    // OF LANGUAGE PROFICIENCY
    c.font = "500 28px " + FONT; c.fillStyle = "#b7b1f0";
    spaced(c, "OF LANGUAGE PROFICIENCY", W / 2, 302, 9);
    line(c, 225, 385, 292, 0.7); line(c, 1150, 1310, 292, 0.7);

    // ism
    c.textAlign = "center"; c.font = "italic 400 32px " + FONT; c.fillStyle = "#d7d5ee";
    c.fillText("This is to certify that", W / 2, 358);
    var ns = fitSize(c, d.name, function (s) { return "700 " + s + "px " + FONT; }, 78, 980);
    c.font = "700 " + ns + "px " + FONT; c.fillStyle = "#ffffff";
    c.save(); c.shadowColor = "rgba(139,123,255,.35)"; c.shadowBlur = 18;
    c.fillText(d.name, W / 2, 440); c.restore();
    line(c, 330, 1206, 464, 0.9);
    c.fillStyle = "#0a0820"; c.fillRect(W / 2 - 20, 452, 40, 24);
    c.fillStyle = "#a78bfa"; star4(c, W / 2, 464, 15, 0.16); c.fill();

    // tavsif
    c.textAlign = "center"; c.font = "italic 400 30px " + FONT; c.fillStyle = "#e4e2f5";
    c.fillText("has completed the Sofa.ai English practice test", W / 2, 514);
    c.fillText("and achieved the following estimated CEFR and IELTS results.", W / 2, 552);

    // IELTS va CEFR
    function panel(x, w, label, value, cx) {
      rr(c, x, 588, w, 140, 26);
      c.fillStyle = "rgba(255,255,255,.05)"; c.fill();
      c.strokeStyle = "rgba(167,139,250,.35)"; c.lineWidth = 1.5; c.stroke();
      c.textAlign = "center"; c.fillStyle = "#d9d6f0"; c.font = "500 24px " + FONT;
      c.fillText(label, cx, 623);
      c.fillStyle = "#ffffff"; c.font = "700 84px " + FONT;
      c.fillText(value, cx, 705);
    }
    panel(413, 327, "Estimated IELTS", d.band, 576);
    panel(836, 286, "CEFR Level", d.cefr, 979);
    c.strokeStyle = "rgba(167,139,250,.4)"; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(788, 595); c.lineTo(788, 722); c.stroke();

    // bo'limlar
    rr(c, 385, 752, 765, 96, 24);
    c.fillStyle = "rgba(255,255,255,.05)"; c.fill();
    c.strokeStyle = "rgba(167,139,250,.35)"; c.stroke();
    var cols = [["Listening", d.listening], ["Reading", d.reading], ["Writing", d.writing], ["Speaking", d.speaking]];
    cols.forEach(function (col, k) {
      var cx = 385 + 191.25 * k + 95.6;
      c.textAlign = "center"; c.fillStyle = "#d9d6f0"; c.font = "500 23px " + FONT; c.fillText(col[0], cx, 785);
      c.fillStyle = "#ffffff"; c.font = "700 36px " + FONT; c.fillText(col[1], cx, 827);
      if (k > 0) {
        c.strokeStyle = "rgba(167,139,250,.4)";
        c.beginPath(); c.moveTo(385 + 191.25 * k, 770); c.lineTo(385 + 191.25 * k, 832); c.stroke();
      }
    });

    // muhr
    var sx = 205, sy = 800, R = 112, r = 101, n = 48;
    c.save(); c.shadowColor = "rgba(0,0,0,.55)"; c.shadowBlur = 24; c.shadowOffsetY = 8;
    c.beginPath();
    for (var k = 0; k < n * 2; k++) {
      var ang = k * Math.PI / n, rad = k % 2 ? r : R;
      c.lineTo(sx + Math.cos(ang) * rad, sy + Math.sin(ang) * rad);
    }
    c.closePath();
    var mg = c.createRadialGradient(sx - 34, sy - 38, 8, sx, sy, R);
    mg.addColorStop(0, "#f4f3fb"); mg.addColorStop(0.5, "#b4b2c9"); mg.addColorStop(1, "#77758f");
    c.fillStyle = mg; c.fill(); c.restore();
    c.strokeStyle = "rgba(55,50,85,.5)"; c.lineWidth = 3;
    c.beginPath(); c.arc(sx, sy, 82, 0, Math.PI * 2); c.stroke();
    c.strokeStyle = "rgba(255,255,255,.55)"; c.lineWidth = 2;
    c.beginPath(); c.arc(sx, sy, 72, 0, Math.PI * 2); c.stroke();
    var stg = c.createLinearGradient(sx - 40, sy - 40, sx + 40, sy + 40);
    stg.addColorStop(0, "#4b4968"); stg.addColorStop(1, "#8987a3");
    c.fillStyle = stg; star4(c, sx, sy, 44, 0.14); c.fill();

    // imzo
    c.strokeStyle = "#e8e6f7"; c.lineWidth = 3; c.lineCap = "round";
    c.beginPath(); c.moveTo(1268, 850);
    c.bezierCurveTo(1290, 790, 1322, 768, 1352, 760);
    c.bezierCurveTo(1384, 752, 1398, 778, 1382, 808);
    c.bezierCurveTo(1368, 836, 1344, 838, 1350, 812);
    c.bezierCurveTo(1358, 788, 1402, 768, 1440, 766);
    c.stroke();
    c.strokeStyle = "rgba(255,255,255,.6)"; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(1242, 862); c.lineTo(1442, 862); c.stroke();
    c.textAlign = "center"; c.fillStyle = "#d9d6f0"; c.font = "500 24px " + FONT;
    c.fillText("Sofa.ai", 1342, 894);

    // shior
    c.fillStyle = "#9a8cf5"; c.font = "500 20px " + FONT;
    spaced(c, "A HIGHER LEVEL. A BRIGHTER FUTURE.", W / 2, 910, 7);
    line(c, 320, 470, 904, 0.7); line(c, 1066, 1216, 904, 0.7);

    // pastki logo
    c.font = "700 36px " + FONT;
    var bw = c.measureText("Sofa.ai").width, bx = W / 2 - (bw + 40) / 2;
    c.fillStyle = "#8b7bff"; star4(c, bx + 14, 945, 17, 0.16); c.fill();
    c.textAlign = "left"; c.fillText("Sofa.ai", bx + 40, 957);

    // eslatma, sana va raqam
    c.textAlign = "center"; c.font = "400 16px " + FONT; c.fillStyle = "rgba(205,201,240,.62)";
    c.fillText("Practice test result. Not an official IELTS or CEFR certificate.  ·  Issued " + d.date + "  ·  ID " + d.id, W / 2, 982);
  }

  // ----- ma'lumotlar -----
  function titleCase(s) {
    if (s !== s.toLowerCase() && s !== s.toUpperCase()) return s;
    return s.toLowerCase().replace(/(^|[\s\-'ʻʼ])(\S)/g, function (m, a, b) { return a + b.toUpperCase(); });
  }
  function certData() {
    var u = state.user || { first: "", last: "" }, r = state.results;
    var f = function (k) { return S.fmtBand(r[k].band); };
    var sum = 0;
    ["reading", "listening", "writing", "speaking"].forEach(function (k) { sum += r[k].band; });
    var ov = Math.round(sum / 4 * 2) / 2;
    var now = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; };
    var id = String(u.id || "").replace(/-/g, "").slice(0, 8).toUpperCase() || "00000000";
    return {
      name: titleCase((u.first + " " + u.last).replace(/\s+/g, " ").trim()),
      band: S.fmtBand(ov), cefr: S.cefr(ov),
      listening: f("listening"), reading: f("reading"), writing: f("writing"), speaking: f("speaking"),
      date: p(now.getDate()) + "." + p(now.getMonth() + 1) + "." + now.getFullYear(),
      id: "SOFA-" + id
    };
  }
  function allDone() {
    return ["reading", "listening", "writing", "speaking"].every(function (k) { return !!state.results[k]; });
  }

  function paint() {
    var cv = document.getElementById("certCanvas");
    if (!cv) return;
    var go = function () {
      if (!document.getElementById("certCanvas")) return;
      draw(cv, certData());
      cv.toBlob(function (b) {
        if (!b) return;
        if (blobUrl) URL.revokeObjectURL(blobUrl);
        blobUrl = URL.createObjectURL(b);
      }, "image/png");
    };
    var d = certData(), sample = d.name + "CERTIFICATE OF LANGUAGE PROFICIENCY";
    var loads = [];
    try {
      loads = [document.fonts.load("700 76px Onest", sample), document.fonts.load("500 28px Onest", sample),
        document.fonts.load("italic 400 30px Onest", sample), document.fonts.load("600 90px Unbounded", "CERTIFICATE")];
    } catch (e) {}
    go(); // darhol (zaxira shriftlar bilan)
    var done = false;
    var again = function () { if (!done) { done = true; go(); } };
    if (window.Promise && loads.length) {
      Promise.race([Promise.all(loads), new Promise(function (res) { setTimeout(res, 2500); })]).then(again, again);
    }
    cv.onclick = function () { if (blobUrl) window.open(blobUrl, "_blank"); };
  }

  S.define("certificate", {
    depth: 4, parent: "overall",
    need: allDone, fallback: "hub",
    html: function () {
      return "<h1>" + t("certificate") + "</h1>" +
        '<p class="lead">' + t("certTap") + "</p>" +
        '<canvas id="certCanvas" class="cert" width="' + W + '" height="' + H + '" aria-label="Sofa.ai certificate"></canvas>' +
        '<button class="cushion key c-mint" data-action="certDownload">' + t("certDownload") + "</button>" +
        '<p class="note">' + t("certNote") + "</p>";
    },
    after: paint
  });

  S.actions.certDownload = function () {
    if (!blobUrl) return S.toast(t("certWait"));
    var a = document.createElement("a");
    a.href = blobUrl;
    a.download = "sofa-ai-certificate.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  S.drawCertificate = draw;
})();
