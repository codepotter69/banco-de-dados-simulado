/* =====================================================================
   imagens.js — gera as imagens das questões em SVG
   (diagramas no estilo brModelo, tabelas de dados, modelo lógico e fluxos).
   As cores vêm das variáveis CSS, então funcionam nos temas claro e escuro.
   ===================================================================== */
const IMG = (() => {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = (w, h, body, label) =>
    `<svg class="qimg" viewBox="0 0 ${w} ${h}" width="${w}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const t = (x, y, s, cls = "t", anchor = "middle") =>
    `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" dominant-baseline="middle">${esc(s)}</text>`;
  const ln = (x1, y1, x2, y2, cls = "ln") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
  const rect = (x, y, w, h, cls = "shape") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}"/>`;
  const ent = (x, y, name, w = 140, h = 48) => rect(x - w / 2, y - h / 2, w, h) + t(x, y, name, "t-ent");
  const dia = (x, y, name, w = 128, h = 58) =>
    `<polygon points="${x},${y - h / 2} ${x + w / 2},${y} ${x},${y + h / 2} ${x - w / 2},${y}" class="shape"/>` + t(x, y, name, "t-rel");
  const circ = (x, y, key) => `<circle cx="${x}" cy="${y}" r="7" class="${key ? "key" : "attr"}"/>`;

  /* Atributos em leque acima (dir=-1) ou abaixo (dir=1) de um ponto */
  function attrs(list, cx, edgeY, dir, gap = 78) {
    let L = "", S = "";
    const n = list.length;
    list.forEach((a, i) => {
      const x = cx + (i - (n - 1) / 2) * gap;
      const y = edgeY + dir * 52;
      L += ln(x, y - dir * 7, cx + (i - (n - 1) / 2) * 18, edgeY);
      S += circ(x, y, a.startsWith("*"));
      S += t(x, y + dir * 18, a.replace(/^\*/, ""), "t-attr");
    });
    return { L, S };
  }

  /* Diagrama ER: A --(ca)-- <rel> --(cb)-- B
     ca = cardinalidade escrita do lado de A; cb = do lado de B.
     Atributo começando com * = chave (bolinha preta). */
  function er({ a, b, rel, ca = "", cb = "", attrsA = [], attrsB = [], relAttrs = [] }) {
    const top = attrsA.length || attrsB.length ? 95 : 30;
    const y = top + 34;
    const h = y + 40 + (relAttrs.length ? 95 : 0);
    const A = 110, R = 330, B = 550;
    let L = ln(A + 70, y, R - 64, y) + ln(R + 64, y, B - 70, y), S = "";
    const pa = attrs(attrsA, A, y - 24, -1), pb = attrs(attrsB, B, y - 24, -1);
    L += pa.L + pb.L; S += pa.S + pb.S;
    if (relAttrs.length) { const pr = attrs(relAttrs, R, y + 29, 1, 150); L += pr.L; S += pr.S; }
    S += ent(A, y, a) + ent(B, y, b) + dia(R, y, rel);
    if (ca) S += t(A + 104, y + 16, ca, "t-card");
    if (cb) S += t(B - 104, y + 16, cb, "t-card");
    return svg(660, h, L + S, `Diagrama: ${a} ${ca} ${rel} ${cb} ${b}`);
  }

  /* Autorrelacionamento */
  function auto({ e, rel, c1, c2, r1, r2 }) {
    const L = ln(290, 94, 262, 200) + ln(370, 94, 398, 200);
    const S = ent(330, 70, e, 170) + dia(330, 205, rel, 150) +
      t(255, 130, c1, "t-card") + t(405, 130, c2, "t-card") +
      t(205, 170, r1, "t-role") + t(458, 170, r2, "t-role");
    return svg(660, 250, L + S, `Autorrelacionamento ${e} ${rel}`);
  }

  /* Um símbolo isolado da paleta do brModelo */
  function simbolo(tipo) {
    const m = {
      entidade: rect(70, 30, 140, 50),
      relacionamento: `<polygon points="140,22 210,55 140,88 70,55" class="shape"/>`,
      atributo: `<circle cx="140" cy="55" r="16" class="attr"/>`,
      chave: `<circle cx="140" cy="55" r="16" class="key"/>`,
    };
    return svg(280, 110, m[tipo], "Símbolo do brModelo");
  }

  /* Tabela de dados (estilo resultado de consulta) */
  function tabela({ titulo, cols, rows }) {
    const cw = cols.map((c, i) => Math.max(c.length, ...rows.map((r) => String(r[i]).length)) * 8.4 + 26);
    const W = cw.reduce((a, b) => a + b, 0), RH = 28, top = titulo ? 28 : 0;
    let s = titulo ? t(0, 12, titulo, "t-cap", "start") : "";
    let x = 0;
    s += rect(0, top, W, RH, "th");
    cols.forEach((c, i) => { s += t(x + 12, top + RH / 2, c, "t-th", "start"); x += cw[i]; });
    rows.forEach((r, ri) => {
      const y = top + RH * (ri + 1);
      s += rect(0, y, W, RH, ri % 2 ? "tr2" : "tr1");
      x = 0;
      r.forEach((v, i) => {
        const nul = v === null;
        s += t(x + 12, y + RH / 2, nul ? "NULL" : v, nul ? "t-null" : "t-td", "start");
        x += cw[i];
      });
    });
    x = 0;
    cw.slice(0, -1).forEach((w) => { x += w; s += ln(x, top, x, top + RH * (rows.length + 1), "grid"); });
    s += rect(0, top, W, RH * (rows.length + 1), "frame");
    return svg(W + 2, top + RH * (rows.length + 1) + 2, s, `Tabela ${titulo || ""}`);
  }

  /* Modelo lógico: tabelas lado a lado. campos: [["PK","id"],["FK","id_x"],["","nome"]]
     links: {de, para, a, b} entre tabelas vizinhas; {auto: i} laço na própria tabela */
  function logico({ tabelas, links = [] }) {
    const TW = 190, GAP = 100, RH = 24;
    let L = "", S = "", maxH = 0;
    const box = tabelas.map((tb, i) => {
      const x = 10 + i * (TW + GAP), h = 32 + RH * tb.campos.length;
      maxH = Math.max(maxH, h);
      S += rect(x, 10, TW, h, "tbl") + rect(x, 10, TW, 32, "tblh") + t(x + TW / 2, 26, tb.nome, "t-tblh");
      tb.campos.forEach(([tag, nome], j) => {
        const y = 42 + RH * j + RH / 2;
        if (tag) S += t(x + 10, y, tag, tag.includes("FK") ? "t-fk" : "t-pk", "start");
        S += t(x + 66, y, nome, "t-td", "start");
      });
      return { x, h };
    });
    links.forEach((k) => {
      if (k.auto !== undefined) {
        const b = box[k.auto], x = b.x + TW;
        L += ln(x, 54, x + 34, 54) + ln(x + 34, 54, x + 34, b.h - 2) + ln(x + 34, b.h - 2, x, b.h - 2);
        S += t(x + 46, 54, "1", "t-card") + t(x + 46, b.h - 2, "N", "t-card");
      } else {
        const p = box[k.de], q = box[k.para], y = 54;
        L += ln(p.x + TW, y, q.x, y);
        S += t(p.x + TW + 14, y - 12, k.a, "t-card") + t(q.x - 14, y - 12, k.b, "t-card");
      }
    });
    const extra = links.some((k) => k.auto !== undefined) ? 60 : 0;
    return svg(10 + tabelas.length * (TW + GAP) - GAP + 10 + extra, maxH + 22, L + S, "Modelo lógico");
  }

  /* Fluxo de etapas; o item "?" fica destacado */
  function fluxo(passos) {
    const BW = 116, G = 30, H = 54;
    let s = "";
    passos.forEach((p, i) => {
      const x = 4 + i * (BW + G);
      s += rect(x, 8, BW, H, p === "?" ? "box-q" : "box") + t(x + BW / 2, 8 + H / 2, p, p === "?" ? "t-q" : "t-box");
      if (i < passos.length - 1) {
        const ax = x + BW + 4;
        s += ln(ax, 35, ax + G - 10, 35) + `<polygon points="${ax + G - 8},35 ${ax + G - 16},30 ${ax + G - 16},40" class="arrow"/>`;
      }
    });
    return svg(passos.length * (BW + G) - G + 8, 72, s, "Fluxo: " + passos.join(" → "));
  }

  return { er, auto, simbolo, tabela, logico, fluxo };
})();

/* Conjuntos de dados reutilizados em várias questões */
const DADOS = {
  cliente: {
    titulo: "tabela: cliente",
    cols: ["id", "nome", "cidade", "idade", "email"],
    rows: [
      ["1", "Ana", "Recife", "25", "ana@email.com"],
      ["2", "Bruno", "Olinda", "31", null],
      ["3", "Carla", "Recife", "40", "carla@email.com"],
      ["4", "Diego", "Caruaru", "31", "diego@email.com"],
      ["5", "Eva", "Recife", "19", null],
      ["6", "Felipe", "Olinda", "25", "felipe@email.com"],
    ],
  },
  pedido: {
    titulo: "tabela: pedido",
    cols: ["id_pedido", "id_cliente", "valor"],
    rows: [
      ["101", "1", "150.00"],
      ["102", "1", "80.00"],
      ["103", "3", "200.00"],
      ["104", "4", "50.00"],
      ["105", "3", "120.00"],
    ],
  },
};
