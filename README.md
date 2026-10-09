# Banco de Dados — Simulado

Simulado de múltipla escolha para revisar **Banco de Dados**: MySQL, brModelo, modelagem, cardinalidade, tipos de dados, DDL, DML e DCL.

**Acesse:** https://codepotter69.github.io/banco-de-dados-simulado/

## Como funciona

- Banco com **175 questões**, cada uma com 4 alternativas; cada prova sorteia **10**.
- As questões não se repetem até você ver todas do tema escolhido.
- Muitas questões trazem **diagramas no estilo do brModelo**, modelos lógicos, tabelas de dados e código SQL.
- Ao finalizar, a página mostra acertos, erros e aproveitamento, além da **explicação de cada erro**.
- O **histórico** das provas e o tema (claro/escuro) ficam salvos no navegador (localStorage).

## Rodar localmente

Requer Node.js. Não há dependências para instalar.

```bash
npm run dev
```

Depois, abra http://localhost:5173.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página (Bootstrap 5.3) |
| `perguntas.js` | Banco de questões (a primeira alternativa é a correta; o app embaralha) |
| `imagens.js` | Gera os diagramas e as tabelas em SVG |
| `app.js` | Sorteio, correção, histórico e tema |
| `estilo.css` | Visual mobile-first, temas claro e escuro |
| `servidor.js` | Servidor local usado pelo `npm run dev` |
