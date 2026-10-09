// Servidor local simples (sem dependências) para o simulado.
// Uso: npm run dev   ->   http://localhost:5173
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORTA = Number(process.env.PORT) || 5173;
const RAIZ = __dirname;
const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const servidor = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const arquivo = path.normalize(path.join(RAIZ, url === "/" ? "index.html" : url));
  // impede acessar arquivos fora da pasta do simulado
  if (!arquivo.startsWith(RAIZ)) { res.writeHead(403); return res.end("Proibido"); }
  fs.readFile(arquivo, (erro, dados) => {
    if (erro) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("Não encontrado"); }
    res.writeHead(200, { "Content-Type": TIPOS[path.extname(arquivo)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(dados);
  });
  console.log(`${new Date().toLocaleTimeString("pt-BR")}  ${req.method} ${url}`);
});

servidor.on("error", (e) => {
  if (e.code === "EADDRINUSE") console.error(`A porta ${PORTA} já está em uso. Rode com outra porta: PORT=5174 npm run dev`);
  else console.error(e);
  process.exit(1);
});

servidor.listen(PORTA, () => {
  console.log(`\n  Simulado rodando em http://localhost:${PORTA}\n  (Ctrl+C para parar)\n`);
});
