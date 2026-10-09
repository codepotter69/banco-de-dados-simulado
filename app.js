/* =====================================================================
   app.js — lógica do simulado
   - sorteia 10 questões do banco (PERGUNTAS), sem repetir até esgotar
   - embaralha as alternativas de cada questão
   - só libera "Finalizar prova" quando todas forem respondidas
   - mostra acertos, erros e a explicação de cada erro
   ===================================================================== */
(() => {
  const POR_PROVA = 10;
  const LETRAS = ["A", "B", "C", "D"];
  const $ = (sel) => document.querySelector(sel);

  let state = { ids: [], ordens: [], respostas: [], finalizada: false, tema: "todos" };
  let vistas = new Set();

  /* ---------- histórico no navegador (localStorage) ----------
     Fica salvo só neste navegador. Cada item:
     { quando, tema, acertos, total, porTema: { "DDL": [acertos, total], ... } } */
  const CHAVE_HIST = "simulado-bd-historico-v1";
  const CHAVE_VISTAS = "simulado-bd-vistas-v1";
  function lerHist() {
    try {
      const v = JSON.parse(localStorage.getItem(CHAVE_HIST) || "[]");
      return Array.isArray(v) ? v : [];
    } catch { return []; }
  }
  function gravarHist(h) {
    try { localStorage.setItem(CHAVE_HIST, JSON.stringify(h.slice(-300))); } catch { /* navegador bloqueou: segue sem salvar */ }
  }
  function lerVistas() {
    try {
      const v = JSON.parse(localStorage.getItem(CHAVE_VISTAS) || "[]");
      return new Set(Array.isArray(v) ? v.filter((id) => PERGUNTAS.some((p) => p.id === id)) : []);
    } catch { return new Set(); }
  }
  function gravarVistas() {
    try { localStorage.setItem(CHAVE_VISTAS, JSON.stringify([...vistas])); } catch { /* ignora */ }
  }

  /* ---------- utilidades ---------- */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // marcação simples: `código` e **negrito**
  const md = (s) => esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  function embaralhar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const porId = (id) => PERGUNTAS.find((p) => p.id === id);

  /* ---------- sorteio ---------- */
  function sortear(tema) {
    const pool = PERGUNTAS.filter((p) => tema === "todos" || p.tema === tema).map((p) => p.id);
    let novas = embaralhar(pool.filter((id) => !vistas.has(id)));
    if (novas.length < Math.min(POR_PROVA, pool.length)) {
      // esgotou as inéditas deste tema: recomeça o ciclo, priorizando as que faltaram
      pool.forEach((id) => vistas.delete(id));
      novas = novas.concat(embaralhar(pool.filter((id) => !novas.includes(id))));
    }
    const ids = novas.slice(0, POR_PROVA);
    ids.forEach((id) => vistas.add(id));
    gravarVistas();
    state = {
      ids,
      ordens: ids.map(() => embaralhar([0, 1, 2, 3])),
      respostas: ids.map(() => null),
      finalizada: false,
      tema,
    };
  }

  /* ---------- renderização ---------- */
  function render() {
    const lista = $("#questoes");
    lista.innerHTML = state.ids.map((id, i) => cartao(porId(id), i)).join("");
    lista.querySelectorAll("input[type=radio]").forEach((inp) =>
      inp.addEventListener("change", (e) => {
        const [qi, ai] = e.target.value.split(":").map(Number);
        state.respostas[qi] = ai;
        marcarSelecionada(qi);
        atualizarBarra();
      }));
    state.respostas.forEach((r, i) => r !== null && marcarSelecionada(i));
    $("#tema").value = state.tema;
    atualizarBarra();
    if (state.finalizada) corrigir(false, false);
    else $("#resumo").hidden = true;
  }

  function cartao(p, i) {
    const alts = state.ordens[i].map((orig, pos) => `
      <label class="alt" id="alt-${i}-${pos}" for="q${i}a${pos}">
        <input class="visually-hidden" type="radio" name="q${i}" id="q${i}a${pos}" value="${i}:${pos}"
          ${state.respostas[i] === pos ? "checked" : ""} ${state.finalizada ? "disabled" : ""}>
        <span class="letra">${LETRAS[pos]}</span>
        <span class="alt-texto">${md(p.alternativas[orig])}</span>
        <span class="marca" aria-hidden="true"></span>
      </label>`).join("");
    return `
      <article class="questao" id="questao-${i}" aria-labelledby="enun-${i}">
        <header class="q-cab">
          <span class="q-num">Questão ${i + 1} <span class="q-de">de ${state.ids.length}</span></span>
          <span class="q-tema">${esc(p.tema)}</span>
        </header>
        <p class="q-enun" id="enun-${i}">${md(p.enunciado)}</p>
        ${p.img ? `<figure class="q-fig">${p.img}</figure>` : ""}
        ${p.codigo ? `<div class="q-code"><div class="q-code-bar">mysql&gt;</div><pre><code>${esc(p.codigo)}</code></pre></div>` : ""}
        <fieldset class="alts">
          <legend class="visually-hidden">Alternativas da questão ${i + 1}</legend>
          ${alts}
        </fieldset>
        <div class="q-feedback" id="fb-${i}" hidden></div>
      </article>`;
  }

  function marcarSelecionada(qi) {
    for (let pos = 0; pos < 4; pos++) {
      const el = document.getElementById(`alt-${qi}-${pos}`);
      if (el) el.classList.toggle("selecionada", state.respostas[qi] === pos);
    }
  }

  /* Barra inferior: segmentos mostram o progresso (e, depois, acerto/erro de cada questão).
     O botão tem 3 estados, sempre com uma ação útil:
       faltam respostas -> "Próxima" (rola até a próxima sem resposta)
       todas respondidas -> "Finalizar prova"
       prova corrigida   -> "Nova prova" */
  function modoBotao() {
    if (state.finalizada) return "nova";
    return state.respostas.every((r) => r !== null) ? "finalizar" : "proxima";
  }
  function atualizarBarra() {
    const feitas = state.respostas.filter((r) => r !== null).length;
    const total = state.ids.length;
    const segs = $("#segmentos");
    segs.style.gridTemplateColumns = `repeat(${total}, minmax(0, 1fr))`;
    segs.innerHTML = state.ids.map((id, i) => {
      if (!state.finalizada) return `<i class="${state.respostas[i] !== null ? "feito" : ""}"></i>`;
      return `<i class="${state.respostas[i] === state.ordens[i].indexOf(0) ? "ok" : "bad"}"></i>`;
    }).join("");
    if (state.finalizada) {
      const ac = state.ids.filter((id, i) => state.respostas[i] === state.ordens[i].indexOf(0)).length;
      $("#progresso-txt").innerHTML = `<b>${ac}/${total}</b> acertos`;
    } else {
      $("#progresso-txt").innerHTML = `<b>${feitas}/${total}</b> respondidas`;
    }
    const btn = $("#finalizar");
    const modo = modoBotao();
    btn.dataset.modo = modo;
    btn.disabled = false;
    btn.textContent = modo === "nova" ? "Nova prova" : modo === "finalizar" ? "Finalizar prova" : `Próxima (${total - feitas})`;
    btn.className = modo === "proxima" ? "btn-sec" : "btn-acc";
    btn.setAttribute("aria-label", modo === "proxima" ? `Ir para a próxima questão sem resposta; faltam ${total - feitas}` : btn.textContent);
  }

  function irParaPendente() {
    const falta = state.respostas.findIndex((r) => r === null);
    const alvo = document.getElementById(`questao-${falta}`);
    if (!alvo) return;
    const suave = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    alvo.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
    alvo.querySelector("input")?.focus({ preventScroll: true });
  }

  /* ---------- correção ---------- */
  function corrigir(rolar = true, salvar = true) {
    state.finalizada = true;
    let acertos = 0;
    const porTema = {};
    state.ids.forEach((id, i) => {
      const p = porId(id);
      const certaPos = state.ordens[i].indexOf(0);
      const marcada = state.respostas[i];
      const acertou = marcada === certaPos;
      if (acertou) acertos++;
      const pt = (porTema[p.tema] ||= [0, 0]);
      pt[1]++;
      if (acertou) pt[0]++;
      document.getElementById(`questao-${i}`).classList.add(acertou ? "acerto" : "erro");
      for (let pos = 0; pos < 4; pos++) {
        const el = document.getElementById(`alt-${i}-${pos}`);
        el.querySelector("input").disabled = true;
        el.classList.toggle("correta", pos === certaPos);
        el.classList.toggle("errada", pos === marcada && !acertou);
      }
      const fb = document.getElementById(`fb-${i}`);
      const textoCerta = md(p.alternativas[0]);
      fb.innerHTML = acertou
        ? `<details><summary><span class="fb-tag ok">✓ Acertou</span> Ver explicação</summary><p>${md(p.explicacao)}</p></details>`
        : `<p class="fb-linha"><span class="fb-tag bad">Quase</span> Você marcou <strong>${LETRAS[marcada]}</strong>; a correta é <strong>${LETRAS[certaPos]}</strong>: ${textoCerta}</p>
           <p class="fb-porque"><strong>Por quê:</strong> ${md(p.explicacao)}</p>`;
      fb.hidden = false;
    });
    const erros = state.ids.length - acertos;
    const pct = Math.round((acertos / state.ids.length) * 100);
    $("#res-acertos").textContent = acertos;
    $("#res-erros").textContent = erros;
    $("#res-nota").textContent = `${pct}%`;
    $("#res-titulo").textContent =
      pct === 100 ? "Gabaritou!" : pct >= 70 ? "Mandou bem!" : pct >= 50 ? "No caminho certo" : "Bora revisar";
    $("#res-msg").textContent =
      pct === 100 ? "Todas certas. Sorteie outra prova para ver questões novas."
      : pct >= 70 ? "Bom resultado. Leia as explicações das que você errou e tente outra prova."
      : pct >= 50 ? "Mais da metade certa. Revise os temas abaixo e tente de novo."
      : "Cada erro mostra a explicação logo abaixo da questão. Leia com calma e faça outra prova.";
    // anel de aproveitamento: começa vazio e preenche até a nota
    const anel = $("#anel"), arco = $("#anel-valor"), C = 326.73;
    anel.classList.toggle("otimo", pct >= 70);
    anel.classList.toggle("fraco", pct < 50);
    arco.style.transition = "none";
    arco.style.strokeDashoffset = C;
    arco.getBoundingClientRect();
    arco.style.transition = "";
    requestAnimationFrame(() => { arco.style.strokeDashoffset = C * (1 - pct / 100); });
    const temasErro = [...new Set(state.ids.filter((id, i) => state.respostas[i] !== state.ordens[i].indexOf(0)).map((id) => porId(id).tema))];
    $("#res-temas").innerHTML = temasErro.length
      ? `Temas para revisar: ${temasErro.map((t) => `<span class="chip">${esc(t)}</span>`).join(" ")}`
      : "";
    $("#resumo").hidden = false;
    if (salvar) {
      const h = lerHist();
      h.push({ quando: Date.now(), tema: state.tema, acertos, total: state.ids.length, porTema });
      gravarHist(h);
      renderHist();
    }
    atualizarBarra();
    if (rolar) $("#resumo").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  /* ---------- tela do histórico ---------- */
  const pctTxt = (a, t) => (t ? Math.round((a / t) * 100) : 0) + "%";
  function renderHist() {
    const h = lerHist();
    const corpo = $("#hist-corpo");
    $("#hist-cont").textContent = h.length ? `(${h.length} ${h.length === 1 ? "prova" : "provas"})` : "";
    if (!h.length) {
      corpo.innerHTML = `<p class="hist-vazio">Nenhuma prova finalizada ainda neste navegador. Ao clicar em <strong>Finalizar prova</strong>, o resultado aparece aqui.</p>`;
      return;
    }
    const tot = h.reduce((s, x) => [s[0] + x.acertos, s[1] + x.total], [0, 0]);
    const melhor = Math.max(...h.map((x) => Math.round((x.acertos / x.total) * 100)));
    const ult = h[h.length - 1];

    // desempenho acumulado por tema, do pior para o melhor
    const agg = {};
    h.forEach((x) => Object.entries(x.porTema || {}).forEach(([t, [a, n]]) => {
      const v = (agg[t] ||= [0, 0]); v[0] += a; v[1] += n;
    }));
    const linhasTema = Object.entries(agg)
      .sort((x, y) => x[1][0] / x[1][1] - y[1][0] / y[1][1])
      .map(([t, [a, n]]) => {
        const p = Math.round((a / n) * 100);
        return `<tr><td>${esc(t)}</td><td class="num">${a}/${n}</td>
          <td class="barra-cel"><span class="mini"><span class="mini-fill ${p < 50 ? "fraco" : p < 70 ? "medio" : ""}" style="width:${p}%"></span></span><span class="num">${p}%</span></td></tr>`;
      }).join("");

    const fmt = (ms) => new Date(ms).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const ultimas = h.slice(-10).reverse().map((x) => `
      <tr><td>${fmt(x.quando)}</td><td>${esc(x.tema === "todos" ? "Todos os temas" : x.tema)}</td>
      <td class="num">${x.acertos}/${x.total}</td><td class="num">${pctTxt(x.acertos, x.total)}</td></tr>`).join("");

    corpo.innerHTML = `
      <div class="hist-stats">
        <div><span class="n">${h.length}</span><span class="l">provas feitas</span></div>
        <div><span class="n">${pctTxt(tot[0], tot[1])}</span><span class="l">média geral</span></div>
        <div><span class="n">${melhor}%</span><span class="l">melhor prova</span></div>
        <div><span class="n">${ult.acertos}/${ult.total}</span><span class="l">última prova</span></div>
      </div>
      <h3>Desempenho por tema</h3>
      <div class="tab-wrap"><table class="hist-tab"><thead><tr><th>Tema</th><th class="num">Acertos</th><th>Aproveitamento</th></tr></thead><tbody>${linhasTema}</tbody></table></div>
      <h3>Últimas provas</h3>
      <div class="tab-wrap"><table class="hist-tab"><thead><tr><th>Data</th><th>Tema</th><th class="num">Nota</th><th class="num">%</th></tr></thead><tbody>${ultimas}</tbody></table></div>
      <div class="hist-acoes" id="hist-acoes">
        <span class="hist-nota">Salvo apenas neste navegador.</span>
        <button type="button" class="btn-sec" id="hist-limpar">Apagar histórico</button>
      </div>`;
    $("#hist-limpar").addEventListener("click", pedirConfirmacao);
  }

  // confirmação dentro da página (sem confirm())
  function pedirConfirmacao() {
    const box = $("#hist-acoes");
    box.innerHTML = `<span class="hist-nota">Apagar todas as provas salvas? Isso não pode ser desfeito.</span>
      <span class="hist-btns"><button type="button" class="btn-perigo" id="hist-sim">Apagar</button>
      <button type="button" class="btn-sec" id="hist-nao">Cancelar</button></span>`;
    $("#hist-sim").addEventListener("click", () => {
      try { localStorage.removeItem(CHAVE_HIST); localStorage.removeItem(CHAVE_VISTAS); } catch { /* ignora */ }
      renderHist();
    });
    $("#hist-nao").addEventListener("click", renderHist);
    $("#hist-sim").focus();
  }

  /* ---------- tema claro / escuro ----------
     auto  = segue o sistema (ou o tema da página onde o simulado está publicado)
     light / dark = escolha fixa, salva no navegador */
  const CHAVE_TEMA = "simulado-bd-tema";
  const raiz = document.documentElement;
  const sistemaEscuro = matchMedia("(prefers-color-scheme: dark)");
  function lerModo() {
    try { const t = localStorage.getItem(CHAVE_TEMA); return t === "light" || t === "dark" ? t : "auto"; } catch { return "auto"; }
  }
  function aplicarTema(modo, salvar) {
    if (modo === "light" || modo === "dark") raiz.setAttribute("data-theme", modo);
    else if (raiz.dataset.temaOriginal) raiz.setAttribute("data-theme", raiz.dataset.temaOriginal);
    else raiz.removeAttribute("data-theme");
    const attr = raiz.getAttribute("data-theme");
    const efetivo = attr === "light" || attr === "dark" ? attr : (sistemaEscuro.matches ? "dark" : "light");
    raiz.setAttribute("data-bs-theme", efetivo); // deixa os componentes do Bootstrap no mesmo tema
    document.querySelectorAll(".tema-sel button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.modo === modo)));
    if (salvar) {
      try { modo === "auto" ? localStorage.removeItem(CHAVE_TEMA) : localStorage.setItem(CHAVE_TEMA, modo); } catch { /* ignora */ }
    }
  }
  function iniciarTema() {
    aplicarTema(lerModo(), false);
    document.querySelectorAll(".tema-sel button").forEach((b) =>
      b.addEventListener("click", () => aplicarTema(b.dataset.modo, true)));
    sistemaEscuro.addEventListener?.("change", () => { if (lerModo() === "auto") aplicarTema("auto", false); });
  }

  /* ---------- eventos ---------- */
  function novaProva() {
    sortear($("#tema").value);
    render();
    window.scrollTo({ top: 0 });
  }

  function iniciar(data) {
    iniciarTema();
    // filtro de temas
    const sel = $("#tema");
    const temas = Object.values(TEMAS);
    sel.innerHTML = `<option value="todos">Todos os temas (${PERGUNTAS.length} questões)</option>` +
      temas.map((t) => `<option value="${esc(t)}">${esc(t)} (${PERGUNTAS.filter((p) => p.tema === t).length})</option>`).join("");
    $("#total-banco").textContent = PERGUNTAS.length;

    sel.addEventListener("change", novaProva);
    $("#nova").addEventListener("click", novaProva);
    $("#nova-2").addEventListener("click", novaProva);
    $("#finalizar").addEventListener("click", () => {
      const modo = modoBotao();
      if (modo === "finalizar") corrigir(true);
      else if (modo === "nova") novaProva();
      else irParaPendente();
    });

    // restaura uma prova em andamento (atualização da página publicada)
    const salvo = data && data.state;
    if (salvo && Array.isArray(salvo.ids) && salvo.ids.every((id) => porId(id))) {
      state = salvo;
      vistas = new Set(data.vistas || salvo.ids);
    } else {
      vistas = lerVistas(); // continua o rodízio de questões de onde parou
      sortear("todos");
    }
    render();
    renderHist();
  }

  window.claude?.hot?.snapshot?.(() => ({ state, vistas: [...vistas] }));
  if (window.claude?.hot?.ready) window.claude.hot.ready(iniciar);
  else iniciar(window.claude?.hot?.data ?? {});
})();
