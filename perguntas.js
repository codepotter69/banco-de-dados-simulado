/* =====================================================================
   perguntas.js — banco de questões
   Formato de cada questão:
     q(tema, enunciado, [correta, errada1, errada2, errada3], explicação, extras)
   A PRIMEIRA alternativa é sempre a correta; o app embaralha a ordem.
   Marcação simples nos textos: `código` e **negrito**.
   extras: { img: "<svg...>", codigo: "SQL mostrado em bloco" }
   ===================================================================== */
const TEMAS = {
  DADOS: "Dados e segurança",
  SGBD: "BD, SGBD e MySQL",
  CHAVES: "Tabelas e chaves",
  MODELO: "brModelo e modelagem",
  CARD: "Cardinalidade",
  TIPOS: "Tipos de dados",
  DDL: "DDL",
  DML: "DML e consultas",
  DCL: "DCL e segurança no MySQL",
};

const PERGUNTAS = [];
function q(tema, enunciado, alternativas, explicacao, extras = {}) {
  PERGUNTAS.push({ id: PERGUNTAS.length + 1, tema, enunciado, alternativas, explicacao, ...extras });
}

/* ===================== DADOS E SEGURANÇA ===================== */
q(TEMAS.DADOS, "Segundo a Aula 1, o que são **dados**?",
  ["Registros brutos sobre fatos, pessoas, objetos ou eventos",
   "Informações já analisadas e prontas para a tomada de decisão",
   "O conhecimento acumulado por um especialista ao longo do tempo",
   "Somente valores numéricos guardados em planilhas"],
  "Dado é o registro bruto (nome, e-mail, foto, data e hora). Sozinho ele parece pequeno; quando é organizado e relacionado, vira informação.");

q(TEMAS.DADOS, "O fluxo da Aula 1 mostra como um dado vira informação. Qual etapa está faltando no lugar do **?**",
  ["Relacionamento", "Exclusão", "Criptografia", "Backup"],
  "O fluxo é: Coleta → Organização → **Relacionamento** → Análise → Informação/Inteligência. Relacionar dados amplia o entendimento, e é aí que surgem valor e risco.",
  { img: IMG.fluxo(["Coleta", "Organização", "?", "Análise", "Informação"]) });

q(TEMAS.DADOS, "O valor `19:00`, escrito sozinho em um papel, é melhor classificado como:",
  ["Um dado: só vira informação quando ganha contexto, como \"horário da aula\"",
   "Uma informação completa, porque é um horário válido",
   "Conhecimento, porque qualquer pessoa entende um horário",
   "Um metadado obrigatório de qualquer banco de dados"],
  "Sem contexto, `19:00` é apenas um registro. Quando dizemos \"a aula de Banco de Dados é às 19:00\", ele vira informação.");

q(TEMAS.DADOS, "O que é **OSINT**?",
  ["Coleta e análise de informações disponíveis publicamente para gerar conhecimento",
   "Uma técnica de invasão de servidores para roubar senhas",
   "Um SGBD de código aberto concorrente do MySQL",
   "Um protocolo de criptografia usado em bancos de dados"],
  "OSINT (Open Source Intelligence) usa fontes abertas como sites, redes sociais, LinkedIn, GitHub e registros públicos.");

q(TEMAS.DADOS, "Qual afirmação sobre OSINT está correta?",
  ["Não depende de invasão: baseia-se em observação, coleta e correlação de dados públicos",
   "Só funciona quando se tem acesso ao banco de dados da empresa investigada",
   "Utiliza exclusivamente registros públicos emitidos pelo governo",
   "Só gera risco quando os dados vazam de um sistema invadido"],
  "O ponto central da aula: o poder está no **cruzamento** de dados públicos. Mesmo sem invasão, a correlação aumenta o risco.");

q(TEMAS.DADOS, "Garantir que as informações sejam acessadas **apenas por pessoas autorizadas** é o pilar da:",
  ["Confidencialidade", "Disponibilidade", "Rastreabilidade", "Integridade"],
  "Confidencialidade = só quem tem autorização acessa. Integridade trata de alterações indevidas; disponibilidade, de acesso quando necessário.");

q(TEMAS.DADOS, "Um funcionário altera **por engano** o preço de 500 produtos no sistema. Qual pilar da segurança da informação foi afetado?",
  ["Integridade", "Confidencialidade", "Disponibilidade", "Privacidade"],
  "Integridade é garantir que os dados não sejam alterados de forma não autorizada **ou acidental**.");

q(TEMAS.DADOS, "O sistema da loja sai do ar e ninguém consegue consultar os pedidos por horas. Qual pilar foi afetado?",
  ["Disponibilidade", "Integridade", "Confidencialidade", "Rastreabilidade"],
  "Disponibilidade é garantir que as informações estejam acessíveis **quando forem necessárias**.");

q(TEMAS.DADOS, "Manter **logs** de quem acessou e alterou cada registro atende principalmente a qual pilar?",
  ["Rastreabilidade", "Disponibilidade", "Privacidade", "Confidencialidade"],
  "Rastreabilidade é registrar e monitorar ações para identificar origens, acessos e alterações. Os logs também apoiam auditorias.");

q(TEMAS.DADOS, "Qual boa prática diz para solicitar e armazenar **somente** os dados estritamente necessários?",
  ["Coletar apenas o necessário", "Manter backups", "Registrar atividades", "Promover conscientização"],
  "Quanto menos dados desnecessários forem guardados, menor o estrago em caso de vazamento.");

q(TEMAS.DADOS, "Manipular uma pessoa para que ela revele uma senha ou dê acesso a um sistema é chamado de:",
  ["Engenharia social", "Mapeamento de tecnologias", "Exposição de rotina", "Normalização"],
  "Engenharia social é a manipulação de pessoas para obter informações ou acesso. É um dos riscos citados na Aula 1.");

q(TEMAS.DADOS, "Segundo a Aula 1, em que momento a segurança dos dados deve começar?",
  ["No momento em que os dados são coletados",
   "Depois que o sistema entra em produção",
   "Somente após o primeiro incidente de segurança",
   "Na configuração do backup, ao final do projeto"],
  "Frase da aula: \"Segurança não começa no fim do sistema; começa no momento em que os dados são coletados.\"");

/* ===================== BD, SGBD E MYSQL ===================== */
q(TEMAS.SGBD, "Qual é a definição de **banco de dados** apresentada em aula?",
  ["Coleção organizada de dados relacionados, armazenados para serem consultados, atualizados e usados com eficiência",
   "Programa responsável por criar, consultar e administrar os dados",
   "Linguagem usada para fazer consultas em tabelas",
   "Planilha eletrônica com fórmulas e gráficos"],
  "O banco de dados é o **conjunto de dados**. O programa que o gerencia é o SGBD, e a linguagem é o SQL.");

q(TEMAS.SGBD, "O que é um **SGBD**?",
  ["O software responsável por criar, consultar, atualizar e administrar os dados",
   "O conjunto de dados armazenados em disco",
   "O diagrama que representa entidades e relacionamentos",
   "Uma tabela especial que guarda as senhas dos usuários"],
  "SGBD = Sistema Gerenciador de Banco de Dados. Exemplos: MySQL, PostgreSQL, SQL Server, Oracle e SQLite.");

q(TEMAS.SGBD, "Qual das opções **NÃO** é um SGBD?",
  ["brModelo", "PostgreSQL", "SQL Server", "SQLite"],
  "O brModelo é uma ferramenta de **modelagem** (desenho do banco). Os outros três são SGBDs.");

q(TEMAS.SGBD, "O MySQL é classificado como:",
  ["Um SGBD relacional",
   "Uma linguagem de programação para o frontend",
   "Uma ferramenta de modelagem de diagramas",
   "Um banco não relacional que guarda documentos JSON"],
  "O MySQL é um SGBD relacional: organiza os dados em tabelas que se relacionam por chaves e entende a linguagem SQL.");

q(TEMAS.SGBD, "Por que o modelo do MySQL é chamado de **relacional**?",
  ["Porque os dados ficam em relações (tabelas), ligadas umas às outras por chaves",
   "Porque só permite relacionamentos do tipo N:N",
   "Porque relaciona o banco de dados diretamente com o frontend",
   "Porque gera relatórios automaticamente"],
  "No modelo de Codd, \"relação\" é a própria tabela. As tabelas também se ligam por chave primária e chave estrangeira.");

q(TEMAS.SGBD, "Qual recurso um SGBD administra e uma planilha **não** administra bem?",
  ["Concorrência: muitos usuários alterando os mesmos dados ao mesmo tempo",
   "Armazenar textos e números",
   "Ordenar uma coluna em ordem alfabética",
   "Somar os valores de uma coluna"],
  "Slide \"Planilha x Banco de Dados\": o SGBD oferece recursos próprios para relacionamentos, **concorrência**, integridade e segurança.");

q(TEMAS.SGBD, "Na arquitetura básica de um sistema com banco de dados, o que fica no lugar do **?**",
  ["Lógica da aplicação (backend)", "Planilha de apoio", "Diagrama do brModelo", "Servidor de e-mail"],
  "Usuário → Interface (frontend) → **Lógica da aplicação** (backend, processa regras) → Banco de Dados. O banco não trabalha sozinho.",
  { img: IMG.fluxo(["Usuário", "Interface", "?", "Banco de Dados"]) });

q(TEMAS.SGBD, "Por que o frontend (navegador) **não** deve se conectar diretamente ao MySQL?",
  ["A senha do banco ficaria exposta no navegador, e qualquer pessoa poderia executar comandos",
   "Porque o MySQL não aceita conexões de nenhum programa",
   "Porque o navegador não consegue exibir dados de tabelas",
   "Porque a conexão direta deixa as consultas mais lentas em qualquer caso"],
  "O código do frontend roda na máquina do usuário. O backend funciona como porteiro: só ele conhece a senha e decide o que pode ser feito.");

q(TEMAS.SGBD, "Qual é a porta padrão em que o servidor MySQL fica \"escutando\" conexões?",
  ["3306", "5432", "80", "8080"],
  "O MySQL usa a porta 3306 por padrão. A 5432 é a padrão do PostgreSQL; 80 e 8080 são de servidores web.");

q(TEMAS.SGBD, "Qual comando, digitado no terminal, entra no MySQL com o usuário root e pede a senha?",
  ["`mysql -u root -p`", "`mysql start root`", "`login mysql --root`", "`SELECT root FROM mysql;`"],
  "`-u` informa o usuário e `-p` faz o MySQL pedir a senha.");

q(TEMAS.SGBD, "Qual comando lista os bancos de dados existentes no servidor MySQL?",
  ["`SHOW DATABASES;`", "`LIST DATABASES;`", "`SELECT * FROM DATABASES;`", "`DESCRIBE DATABASES;`"],
  "`SHOW DATABASES;` lista os bancos. Para listar as tabelas do banco atual, use `SHOW TABLES;`.");

q(TEMAS.SGBD, "Você criou o banco `loja` e quer trabalhar dentro dele. Qual comando usar?",
  ["`USE loja;`", "`OPEN loja;`", "`SELECT loja;`", "`CONNECT TABLE loja;`"],
  "`USE` define o banco atual. A partir dele, `CREATE TABLE`, `SELECT` etc. agem dentro de `loja`.");

q(TEMAS.SGBD, "O modelo relacional foi proposto em 1970 por:",
  ["Edgar F. Codd, pesquisador da IBM", "Peter Chen", "C. J. Date", "Carlos Heuser"],
  "Codd é considerado o pai do modelo relacional. Peter Chen criou o Modelo Entidade-Relacionamento em 1976.");

q(TEMAS.SGBD, "Na arquitetura de três esquemas (ANSI/SPARC), qual nível descreve a visão de **cada grupo de usuários**?",
  ["Nível externo", "Nível interno", "Nível conceitual", "Nível de armazenamento"],
  "Externo = visões dos usuários; conceitual = estrutura global do banco; interno = armazenamento físico.");

q(TEMAS.SGBD, "O que é o **MariaDB**, usado no livro da disciplina?",
  ["Um SGBD derivado do MySQL e compatível com a maioria dos seus comandos",
   "Uma ferramenta de modelagem concorrente do brModelo",
   "Uma linguagem de consulta diferente do SQL",
   "Uma extensão do VS Code para escrever SQL"],
  "O MariaDB foi criado pelos desenvolvedores originais do MySQL. Os comandos vistos em aula funcionam nos dois.");

q(TEMAS.SGBD, "O que significa dizer que o banco de dados garante **persistência**?",
  ["Os dados continuam armazenados mesmo depois que o sistema é fechado ou a máquina é desligada",
   "Os dados são apagados automaticamente a cada reinicialização",
   "Cada dado é repetido em várias tabelas por segurança",
   "As consultas são executadas sempre na mesma velocidade"],
  "É por isso que um cadastro continua lá depois de você deslogar ou recarregar a página: o SGBD grava em disco.");

q(TEMAS.SGBD, "Qual linguagem você usa para conversar com o MySQL (criar tabelas, inserir e consultar dados)?",
  ["SQL", "HTML", "CSS", "UML"],
  "SQL (Structured Query Language) é a linguagem padrão dos bancos relacionais. O MySQL recebe e executa os comandos SQL.");

/* ===================== TABELAS E CHAVES ===================== */
q(TEMAS.CHAVES, "Na tabela abaixo, cada **linha** (ex.: a linha da Carla) é chamada de:",
  ["Registro (ou tupla)", "Atributo", "Entidade", "Domínio"],
  "Linha = registro/tupla (uma ocorrência). Coluna = atributo (uma característica). A tabela inteira representa a entidade.",
  { img: IMG.tabela(DADOS.cliente) });

q(TEMAS.CHAVES, "Na mesma tabela `cliente`, o que representa cada **coluna** (`nome`, `cidade`, `idade`...)?",
  ["Um atributo: uma característica do cliente", "Um registro de cliente", "Um relacionamento entre tabelas", "A cardinalidade da tabela"],
  "Cada coluna é um atributo (campo). Ela descreve uma característica de todos os registros.",
  { img: IMG.tabela(DADOS.cliente) });

q(TEMAS.CHAVES, "Qual característica **NÃO** pertence a uma chave primária?",
  ["Pode receber valor nulo quando o dado ainda não é conhecido",
   "Identifica cada registro de forma única",
   "Não pode se repetir",
   "Pode ser referenciada por uma chave estrangeira de outra tabela"],
  "A PK **nunca** pode ser nula e nunca se repete. É ela que outras tabelas referenciam com a FK.");

q(TEMAS.CHAVES, "Para memorizar, o professor comparou a chave primária com:",
  ["O CPF de uma pessoa: cada um tem o seu e nenhum se repete",
   "O nome de uma pessoa: fácil de lembrar",
   "O endereço: diz onde o registro está",
   "A idade: muda todo ano"],
  "Nomes se repetem (existem várias \"Ana\"); o CPF não. A PK precisa ser um identificador único.");

q(TEMAS.CHAVES, "O que é uma **chave estrangeira (FK)**?",
  ["Um campo que referencia a chave primária de outra tabela",
   "Um campo que identifica unicamente cada registro da própria tabela",
   "Um campo de preenchimento obrigatório",
   "Uma senha usada para acessar tabelas de outros bancos"],
  "A FK conecta tabelas e garante a integridade referencial. Ex.: `pedido.id_cliente` referencia `cliente.id_cliente`.");

q(TEMAS.CHAVES, "No modelo lógico abaixo, existem os clientes 1, 2 e 3. O que acontece ao executar o comando?",
  ["O MySQL recusa o comando com erro de chave estrangeira, porque o cliente 99 não existe",
   "O pedido é inserido e o cliente 99 é criado automaticamente",
   "O pedido é inserido com `id_cliente` igual a NULL",
   "O pedido é inserido normalmente e só aparece um aviso"],
  "A FK impede \"dados órfãos\": todo `pedido.id_cliente` precisa existir em `cliente`. O MySQL devolve o erro 1452.",
  { img: IMG.logico({ tabelas: [
      { nome: "cliente", campos: [["PK", "id_cliente"], ["", "nome"]] },
      { nome: "pedido", campos: [["PK", "id_pedido"], ["", "data"], ["FK", "id_cliente"]] }],
    links: [{ de: 0, para: 1, a: "1", b: "N" }] }),
    codigo: "INSERT INTO pedido (id_pedido, data, id_cliente)\nVALUES (500, '2026-09-20', 99);" });

q(TEMAS.CHAVES, "O que são **dados órfãos**?",
  ["Registros filhos que apontam para um registro pai que não existe",
   "Tabelas que não possuem chave primária",
   "Colunas que contêm apenas valores NULL",
   "Bancos de dados sem nenhum usuário cadastrado"],
  "Ex.: um pedido do cliente 99, sendo que o cliente 99 não existe. A FK existe para evitar isso.");

q(TEMAS.CHAVES, "Qual é a melhor escolha de chave primária para a tabela `aluno`?",
  ["`id_aluno INT AUTO_INCREMENT`", "`nome VARCHAR(100)`", "`data_nascimento DATE`", "`cidade VARCHAR(50)`"],
  "Nome, data e cidade podem se repetir entre alunos. Um id numérico gerado automaticamente é único e nunca nulo.");

q(TEMAS.CHAVES, "O que é uma **chave composta**?",
  ["Uma chave primária formada por mais de uma coluna",
   "Uma chave estrangeira que aponta para duas tabelas ao mesmo tempo",
   "Uma chave criada a partir de um atributo composto como o endereço",
   "Uma chave cujo nome tem duas palavras, como `id_cliente`"],
  "Ex.: `PRIMARY KEY (id_livro, id_autor)` na tabela intermediária `livro_autor`. O **par** não pode se repetir.");

q(TEMAS.CHAVES, "O que é uma **chave candidata**?",
  ["Um atributo que também poderia ser escolhido como chave primária, como CPF ou matrícula",
   "A chave estrangeira mais usada da tabela",
   "Uma chave temporária que aceita valores nulos",
   "A chave de uma tabela que ainda não foi criada"],
  "Uma tabela pode ter vários atributos únicos (id, CPF, matrícula). Eles são candidatos; apenas um vira a chave primária.");

q(TEMAS.CHAVES, "Quantas **chaves primárias** uma tabela pode ter?",
  ["Apenas uma, que pode ser formada por uma ou mais colunas",
   "Uma para cada coluna da tabela",
   "No máximo duas",
   "Quantas forem necessárias, sem limite"],
  "Cada tabela tem uma única PK. Quando ela tem várias colunas, é uma chave composta, mas continua sendo uma só.");

q(TEMAS.CHAVES, "O que a **integridade referencial** garante?",
  ["Que o valor de uma chave estrangeira exista como chave primária na tabela referenciada",
   "Que nenhuma coluna da tabela aceite valores nulos",
   "Que todas as colunas tenham o mesmo tipo de dado",
   "Que o banco faça backup automático todos os dias"],
  "É a regra que a FK aplica: não existe pedido apontando para cliente inexistente.");

q(TEMAS.CHAVES, "No modelo lógico abaixo, o campo `id_cliente` da tabela `pedido` é:",
  ["Uma chave estrangeira", "A chave primária de pedido", "Um atributo derivado", "Uma chave candidata de pedido"],
  "Ele fica em `pedido`, mas aponta para a PK de `cliente`: é uma FK. A PK de `pedido` é `id_pedido`.",
  { img: IMG.logico({ tabelas: [
      { nome: "cliente", campos: [["PK", "id_cliente"], ["", "nome"], ["", "cidade"]] },
      { nome: "pedido", campos: [["PK", "id_pedido"], ["", "valor"], ["FK", "id_cliente"]] }],
    links: [{ de: 0, para: 1, a: "1", b: "N" }] }) });

q(TEMAS.CHAVES, "A **restrição de domínio** de um atributo define:",
  ["O conjunto de valores permitidos: tipo, tamanho e se aceita nulo",
   "Qual tabela o atributo referencia",
   "Que o atributo identifica unicamente o registro",
   "Em qual servidor o banco está hospedado"],
  "Ex.: `idade INT NOT NULL` só aceita inteiros e não aceita vazio. O conjunto de valores possíveis é o domínio.");

q(TEMAS.CHAVES, "Em um banco de dados, o que significa um campo com valor **NULL**?",
  ["Ausência de valor: o dado não foi informado", "O número zero", "Um texto vazio, igual a `''`", "Um espaço em branco"],
  "NULL não é zero nem texto vazio. É \"desconhecido/não informado\" e por isso é testado com `IS NULL`.");

/* ===================== BRMODELO E MODELAGEM ===================== */
q(TEMAS.MODELO, "O que é o **brModelo**?",
  ["Uma ferramenta para criar modelos conceituais e lógicos antes de escrever o SQL",
   "Um SGBD brasileiro que substitui o MySQL",
   "Uma linguagem para consultar dados",
   "Uma extensão que acelera as consultas do MySQL"],
  "O brModelo (e o brModeloWeb, usado em aula) é uma ferramenta didática de modelagem: desenho primeiro, código depois.");

q(TEMAS.MODELO, "Qual frase o professor usou para resumir a ideia da modelagem?",
  ["Primeiro modelamos, depois codificamos",
   "Primeiro codificamos, depois modelamos",
   "Primeiro inserimos os dados, depois criamos as tabelas",
   "A modelagem é opcional quando se conhece SQL"],
  "Modelar antes evita retrabalho, organiza o raciocínio e reduz erros antes da implementação.");

q(TEMAS.MODELO, "Qual é a ordem correta dos modelos em um projeto de banco de dados?",
  ["Conceitual → Lógico → Físico", "Físico → Lógico → Conceitual", "Lógico → Conceitual → Físico", "Conceitual → Físico → Lógico"],
  "Conceitual (desenho, MER/DER) → Lógico (tabelas, PK, FK) → Físico (comandos SQL no SGBD escolhido).");

q(TEMAS.MODELO, "Em qual modelo aparecem os comandos `CREATE TABLE`?",
  ["Modelo físico", "Modelo conceitual", "Modelo lógico", "Nível externo"],
  "O físico já depende do SGBD e é escrito em SQL. O conceitual é só o desenho; o lógico mostra tabelas e chaves.");

q(TEMAS.MODELO, "Qual modelo é o mais próximo do cliente, sem detalhes técnicos de tabelas ou tipos de dados?",
  ["Modelo conceitual", "Modelo físico", "Modelo lógico", "Esquema interno"],
  "O conceitual discute o negócio do cliente (entidades, atributos e relacionamentos), não a tecnologia.");

q(TEMAS.MODELO, "No brModeloWeb, o que representa o símbolo abaixo (bolinha **preenchida**)?",
  ["Atributo chave (identificador)", "Atributo comum", "Relacionamento", "Entidade fraca"],
  "Bolinha preta = chave, que vira PRIMARY KEY. Bolinha branca = atributo comum.",
  { img: IMG.simbolo("chave") });

q(TEMAS.MODELO, "No brModeloWeb, o que representa o símbolo abaixo (bolinha **vazia**)?",
  ["Atributo", "Atributo chave", "Relacionamento", "Nota explicativa"],
  "Bolinha branca = atributo: uma característica da entidade, que vira coluna da tabela.",
  { img: IMG.simbolo("atributo") });

q(TEMAS.MODELO, "No diagrama ER, o que representa o **losango**?",
  ["Um relacionamento entre entidades", "Uma entidade", "Um atributo multivalorado", "Uma tabela do modelo físico"],
  "Losango = relacionamento (ex.: REALIZA). Retângulo = entidade. Bolinhas = atributos.",
  { img: IMG.simbolo("relacionamento") });

q(TEMAS.MODELO, "No diagrama ER, o que representa o **retângulo**?",
  ["Uma entidade", "Um relacionamento", "Um atributo chave", "Uma cardinalidade"],
  "Cada retângulo é uma entidade (CLIENTE, PEDIDO...), que depois vira tabela.",
  { img: IMG.simbolo("entidade") });

q(TEMAS.MODELO, "Como costuma ser o nome de um **relacionamento** no diagrama?",
  ["Um verbo, como realiza, publica ou atende", "Um substantivo no plural", "Um número de identificação", "Um adjetivo, como ativo ou novo"],
  "Relacionamento é uma ação/associação: CLIENTE **realiza** PEDIDO. Entidades é que são substantivos.");

q(TEMAS.MODELO, "Como costuma ser o nome de uma **entidade**?",
  ["Um substantivo no singular, como CLIENTE ou PRODUTO", "Um verbo no infinitivo", "Um adjetivo", "Um número sequencial"],
  "Entidades representam pessoas, objetos, eventos ou conceitos: são substantivos. COMPRA, por exemplo, é substantivo, não verbo.");

q(TEMAS.MODELO, "Ao analisar o enunciado de um problema, os **substantivos importantes** tendem a virar:",
  ["Entidades", "Relacionamentos", "Cardinalidades", "Comandos DML"],
  "Método: substantivos → entidades; características → atributos; verbos → relacionamentos.");

q(TEMAS.MODELO, "No enunciado \"O **cliente** realiza **pedidos** de **produtos**\", quais são as candidatas a entidade?",
  ["Cliente, Pedido e Produto", "Realiza", "Cliente e Realiza", "Pedido e Realiza"],
  "Os três substantivos viram entidades. \"Realiza\" é verbo: vira relacionamento.");

q(TEMAS.MODELO, "Qual destes é um **atributo composto**?",
  ["Endereço, formado por rua, número e cidade", "CPF", "id_cliente", "Ativo (sim/não)"],
  "Atributo composto pode ser dividido em partes com significado próprio. No lógico, cada parte vira uma coluna.");

q(TEMAS.MODELO, "Qual destes é um **atributo multivalorado**?",
  ["Telefones de um cliente que pode ter vários números", "CPF", "Data de nascimento", "id_cliente"],
  "Multivalorado aceita vários valores. No lógico, vira N colunas ou uma nova tabela com FK.");

q(TEMAS.MODELO, "Qual destes é um **atributo derivado**?",
  ["Idade, calculada a partir da data de nascimento", "Nome", "CPF", "E-mail"],
  "Derivado é calculado a partir de outro atributo. Por isso nem sempre precisa ser armazenado.");

q(TEMAS.MODELO, "No diagrama abaixo, por que as datas estão ligadas ao **losango** e não a LEITOR ou a LIVRO?",
  ["Porque dependem dos dois lados ao mesmo tempo: pertencem a cada empréstimo",
   "Porque o brModelo não permite atributos de data em entidades",
   "Porque são as chaves primárias do relacionamento",
   "Foi um erro: atributos nunca podem ficar no losango"],
  "A data do empréstimo não é do leitor nem do livro, é do **empréstimo** (leitor + livro). Na conversão, vai para a tabela intermediária.",
  { img: IMG.er({ a: "LEITOR", b: "LIVRO", rel: "empresta", ca: "(0,n)", cb: "(0,n)",
      attrsA: ["*id_leitor", "nome"], attrsB: ["*id_livro", "titulo"],
      relAttrs: ["data_emprestimo", "data_devolucao"] }) });

q(TEMAS.MODELO, "No brModeloWeb, qual botão da paleta cria um **autorrelacionamento**?",
  ["Auto", "Rel", "Entity", "Nota"],
  "\"Auto\" cria um relacionamento da entidade com ela mesma (ex.: FUNCIONÁRIO supervisiona FUNCIONÁRIO).");

q(TEMAS.MODELO, "Por que modelar o banco **antes** de escrever o SQL?",
  ["Para entender o problema, evitar retrabalho e reduzir erros antes da implementação",
   "Porque o MySQL só aceita tabelas criadas a partir de um diagrama",
   "Porque o brModelo deixa as consultas mais rápidas",
   "Porque o SQL não permite criar tabelas sem um diagrama salvo"],
  "Corrigir um desenho é muito mais barato do que corrigir um banco já cheio de dados.");

q(TEMAS.MODELO, "Depois de desenhar o modelo conceitual no brModeloWeb e convertê-lo para o lógico, o que você deve conferir?",
  ["Se cada FK de um 1:N ficou no lado N e se cada N:N virou uma tabela intermediária",
   "Se as cores das entidades estão iguais",
   "Se todos os nomes estão em letras maiúsculas",
   "Se todas as entidades têm a mesma quantidade de atributos"],
  "A conversão mostra onde as chaves estrangeiras foram parar. Se uma FK ficou no lado errado, a cardinalidade está invertida.");

q(TEMAS.MODELO, "Qual nome de atributo é o mais adequado no diagrama?",
  ["`data_nascimento`", "`Data de Nascimento`", "`data nascimento`", "`data-de-nascimento!`"],
  "Use minúsculas, sem espaços, sem acentos e sem símbolos. Espaços e caracteres especiais não são nomes de coluna válidos sem aspas.");

q(TEMAS.MODELO, "Em um diagrama, todas as chaves foram chamadas de `id_primary`. Qual o problema?",
  ["No modelo lógico, as chaves estrangeiras ficam com nomes iguais e confusos",
   "O brModelo não aceita a palavra primary",
   "O MySQL proíbe o caractere sublinhado em nomes",
   "Chaves com esse nome ocupam mais espaço em disco"],
  "Em CONSULTA, por exemplo, existiriam dois campos para paciente e médico com o mesmo nome. Use `id_paciente`, `id_medico`...");

q(TEMAS.MODELO, "Quem propôs o **Modelo Entidade-Relacionamento (MER)**, em 1976?",
  ["Peter Chen", "Edgar F. Codd", "C. J. Date", "Ramez Elmasri"],
  "Peter Chen propôs o MER e o DER (retângulos, losangos e elipses). Codd propôs o modelo relacional.");

q(TEMAS.MODELO, "O que é uma **entidade fraca**?",
  ["Uma entidade que depende de outra para existir",
   "Uma entidade com poucos atributos",
   "Uma entidade que não tem nenhum relacionamento",
   "Uma entidade com poucos registros cadastrados"],
  "Ex.: um DEPENDENTE só existe ligado a um FUNCIONÁRIO. A entidade da qual ela depende é a forte.");

q(TEMAS.MODELO, "Qual é a diferença entre **MER** e **DER**?",
  ["MER é o modelo conceitual; DER é a representação gráfica (o diagrama) desse modelo",
   "MER é usado no MySQL e DER no PostgreSQL",
   "MER é o modelo físico e DER é o modelo lógico",
   "Não há diferença: são nomes de ferramentas concorrentes"],
  "O Modelo Entidade-Relacionamento é o conceito; o Diagrama Entidade-Relacionamento é o desenho que o representa.");

/* ===================== CARDINALIDADE ===================== */
q(TEMAS.CARD, "O que a **cardinalidade** de um relacionamento mostra?",
  ["Quantos elementos de um lado podem se relacionar com o outro",
   "Quantas colunas a tabela possui",
   "A ordem em que os registros são exibidos",
   "O tamanho máximo de cada campo"],
  "Definição da Aula 3. No brModelo ela é escrita como (mínimo, máximo), por exemplo (0,n).");

q(TEMAS.CARD, "Na notação (mínimo, máximo), o que indica um **mínimo 0**?",
  ["Participação opcional: pode não haver nenhum", "Participação obrigatória", "Que o relacionamento é proibido", "Que existe exatamente zero sempre"],
  "Mínimo 0 = opcional (ex.: um cliente pode ainda não ter pedidos). Mínimo 1 = obrigatório.");

q(TEMAS.CARD, "O que significa a cardinalidade **(1,1)**?",
  ["Exatamente um: no mínimo um e no máximo um", "Nenhum ou um", "Um ou vários", "Vários"],
  "(1,1) = obrigatório e único. (0,1) = opcional e único. (1,n) = pelo menos um, podendo ser vários.");

q(TEMAS.CARD, "Qual é a leitura correta do relacionamento abaixo?",
  ["CURSO → ALUNO é 1:N, e ALUNO → CURSO é N:1",
   "É 1:1, porque cada aluno pertence a um único curso",
   "É N:N, porque há muitos alunos e muitos cursos",
   "ALUNO → CURSO é 1:N"],
  "Leia nos dois sentidos: um curso tem vários alunos; cada aluno tem um curso. A frase \"cada aluno tem um curso\" sozinha engana e parece 1:1.",
  { img: IMG.er({ a: "CURSO", b: "ALUNO", rel: "pertence", ca: "1", cb: "N",
      attrsA: ["*id_curso", "nome_curso"], attrsB: ["*id_aluno", "nome"] }) });

q(TEMAS.CARD, "Usando a **leitura cruzada**, em qual tabela fica a chave estrangeira desse relacionamento?",
  ["Em `livro`, como `id_editora`", "Em `editora`, como `id_livro`", "Em uma tabela intermediária `editora_livro`", "Nas duas tabelas, uma apontando para a outra"],
  "Uma editora publica (0,n) livros; um livro é publicado por (1,1) editora. É 1:N, e a FK vai sempre para o lado N (livro).",
  { img: IMG.er({ a: "EDITORA", b: "LIVRO", rel: "publica", ca: "(1,1)", cb: "(0,n)",
      attrsA: ["*id_editora", "nome"], attrsB: ["*id_livro", "titulo"] }) });

q(TEMAS.CARD, "Pela leitura cruzada, **quantas editoras** um livro pode ter neste diagrama?",
  ["Exatamente uma", "Nenhuma ou várias", "Uma ou várias", "Nenhuma ou uma"],
  "Para saber quantas editoras um livro tem, olhe o número do lado da EDITORA: (1,1).",
  { img: IMG.er({ a: "EDITORA", b: "LIVRO", rel: "publica", ca: "(1,1)", cb: "(0,n)" }) });

q(TEMAS.CARD, "Ao converter este relacionamento para o modelo lógico, o que acontece?",
  ["Cria-se uma tabela intermediária com duas chaves estrangeiras",
   "Coloca-se a chave estrangeira apenas na tabela autor",
   "Coloca-se a chave estrangeira apenas na tabela livro",
   "As duas entidades são unidas em uma única tabela"],
  "Um autor escreve vários livros e um livro tem vários autores: N:N. Todo N:N vira tabela intermediária (`livro_autor`).",
  { img: IMG.er({ a: "AUTOR", b: "LIVRO", rel: "escreve", ca: "(1,n)", cb: "(1,n)",
      attrsA: ["*id_autor", "nome"], attrsB: ["*id_livro", "titulo"] }) });

q(TEMAS.CARD, "Qual é o tipo de relacionamento representado abaixo?",
  ["1:1", "1:N", "N:N", "Autorrelacionamento"],
  "Os máximos dos dois lados são 1: um leitor tem no máximo uma carteirinha e cada carteirinha é de um único leitor.",
  { img: IMG.er({ a: "LEITOR", b: "CARTEIRINHA", rel: "possui", ca: "(1,1)", cb: "(0,1)" }) });

q(TEMAS.CARD, "Pela leitura cruzada, **quantas carteirinhas** um leitor pode ter neste diagrama?",
  ["Nenhuma ou uma", "Exatamente uma", "Uma ou várias", "Várias"],
  "O número do lado da CARTEIRINHA, (0,1), responde quantas carteirinhas um leitor tem. O mínimo 0 indica que ele pode ainda não ter.",
  { img: IMG.er({ a: "LEITOR", b: "CARTEIRINHA", rel: "possui", ca: "(1,1)", cb: "(0,1)" }) });

q(TEMAS.CARD, "Como esse autorrelacionamento fica na tabela `funcionario` do banco?",
  ["Com uma coluna `id_supervisor`, chave estrangeira que aponta para a própria tabela",
   "Não é possível representar autorrelacionamento em SQL",
   "Criando uma tabela separada para cada funcionário",
   "Fazendo a chave primária aceitar valores repetidos"],
  "A FK referencia a mesma tabela: `FOREIGN KEY (id_supervisor) REFERENCES funcionario(id_funcionario)`. Quem não tem supervisor fica com NULL.",
  { img: IMG.auto({ e: "FUNCIONARIO", rel: "supervisiona", c1: "(0,1)", c2: "(0,n)", r1: "supervisor", r2: "supervisionado" }) });

q(TEMAS.CARD, "Segundo a Aula 3, qual é um dos tipos de relacionamento mais comuns?",
  ["1:N", "N:N", "1:1", "Autorrelacionamento"],
  "\"1:N é um dos relacionamentos mais comuns\": cliente-pedido, curso-aluno, editora-livro...");

q(TEMAS.CARD, "Regra de negócio: \"Cada pedido pertence a um único cliente, e um cliente pode fazer vários pedidos.\" O relacionamento é:",
  ["1:N entre cliente e pedido", "1:1 entre cliente e pedido", "N:N entre cliente e pedido", "N:1 entre cliente e pedido, com FK em cliente"],
  "Um cliente → vários pedidos. A FK `id_cliente` vai na tabela pedido (lado N).");

q(TEMAS.CARD, "Regra: \"Um aluno cursa várias disciplinas e cada disciplina tem vários alunos.\" O relacionamento é:",
  ["N:N", "1:N", "1:1", "N:1"],
  "Vários para vários nos dois sentidos. Vira uma tabela intermediária, por exemplo `matricula`.");

q(TEMAS.CARD, "Regra: \"Cada pessoa tem no máximo um passaporte, e cada passaporte pertence a uma única pessoa.\" O relacionamento é:",
  ["1:1", "1:N", "N:N", "N:1"],
  "Máximo 1 nos dois lados. A FK costuma ir para o lado dependente (`passaporte.id_pessoa`).");

q(TEMAS.CARD, "Em um relacionamento **1:N**, onde fica a chave estrangeira no modelo lógico?",
  ["Na tabela do lado N", "Na tabela do lado 1", "Nas duas tabelas", "Em uma tabela intermediária obrigatória"],
  "Ex.: CLIENTE 1:N PEDIDO → `pedido.id_cliente`. Cada pedido aponta para o seu único cliente.");

q(TEMAS.CARD, "Um aluno desenhou PACIENTE realiza CONSULTA com **(1,n) dos dois lados**. Qual é o problema?",
  ["Vira N:N, como se uma consulta tivesse vários pacientes, e gera uma tabela intermediária desnecessária",
   "Nenhum: (1,n) dos dois lados é o padrão recomendado",
   "O brModelo não aceita (1,n) em relacionamentos",
   "A chave estrangeira iria para a tabela paciente"],
  "Na vida real, uma consulta é de um único paciente: o lado do paciente deveria ser (1,1). Colocar (1,n) em tudo \"por garantia\" é um erro comum.",
  { img: IMG.er({ a: "PACIENTE", b: "CONSULTA", rel: "realiza", ca: "(1,n)", cb: "(1,n)" }) });

q(TEMAS.CARD, "Em um N:N entre ALUNO e DISCIPLINA, onde deve ficar o atributo `nota_final`?",
  ["Na tabela intermediária (ex.: matricula), junto com as duas FKs", "Na tabela aluno", "Na tabela disciplina", "Repetido nas tabelas aluno e disciplina"],
  "A nota depende do par aluno + disciplina. Atributo de relacionamento N:N vai para a tabela intermediária.");

q(TEMAS.CARD, "No diagrama, o que um **mínimo 1** na cardinalidade indica?",
  ["Participação obrigatória: precisa existir pelo menos um", "Participação opcional", "Que o máximo também é 1", "Que é um autorrelacionamento"],
  "Ex.: (1,n) = obrigatório ter pelo menos um, podendo ter vários.");

q(TEMAS.CARD, "Um relacionamento **N:N** pode ser implementado colocando apenas uma FK em uma das duas tabelas?",
  ["Não: é preciso uma tabela intermediária com as duas chaves estrangeiras",
   "Sim: basta colocar a FK na tabela com mais registros",
   "Sim: basta colocar a FK na tabela criada primeiro",
   "Sim: desde que a FK aceite valores repetidos separados por vírgula"],
  "Uma única coluna FK só guarda um valor por linha. Para \"vários dos dois lados\", é preciso uma linha por par, na tabela intermediária.");

q(TEMAS.CARD, "Que relacionamento entre `livro` e `autor` o modelo lógico abaixo implementa?",
  ["N:N", "1:1", "1:N com FK em livro", "Autorrelacionamento"],
  "A tabela `livro_autor` tem duas FKs que formam a PK: é a tabela intermediária de um N:N.",
  { img: IMG.logico({ tabelas: [
      { nome: "livro", campos: [["PK", "id_livro"], ["", "titulo"]] },
      { nome: "livro_autor", campos: [["PK FK", "id_livro"], ["PK FK", "id_autor"]] },
      { nome: "autor", campos: [["PK", "id_autor"], ["", "nome"]] }],
    links: [{ de: 0, para: 1, a: "1", b: "N" }, { de: 1, para: 2, a: "N", b: "1" }] }) });

q(TEMAS.CARD, "Que tipo de relacionamento o modelo lógico abaixo representa?",
  ["Autorrelacionamento", "N:N", "1:1 entre duas tabelas", "Entidade fraca"],
  "A FK `id_supervisor` aponta para a própria tabela `funcionario`.",
  { img: IMG.logico({ tabelas: [
      { nome: "funcionario", campos: [["PK", "id_funcionario"], ["", "nome"], ["", "cargo"], ["FK", "id_supervisor"]] }],
    links: [{ auto: 0 }] }) });

q(TEMAS.CARD, "Diagrama: CLIENTE **(1,1)** — realiza — **(0,n)** PEDIDO. Pela leitura cruzada, quantos pedidos um cliente pode ter?",
  ["Zero ou vários", "Exatamente um", "Um ou vários", "No máximo um"],
  "O número do lado do PEDIDO, (0,n), responde quantos pedidos um cliente faz: pode ser nenhum ou vários.",
  { img: IMG.er({ a: "CLIENTE", b: "PEDIDO", rel: "realiza", ca: "(1,1)", cb: "(0,n)",
      attrsA: ["*id_cliente", "nome"], attrsB: ["*id_pedido", "data"] }) });

/* ===================== TIPOS DE DADOS ===================== */
q(TEMAS.TIPOS, "Qual é o tipo mais adequado para guardar o **preço** de um produto?",
  ["`DECIMAL(10,2)`", "`VARCHAR(10)`", "`INT`", "`BOOLEAN`"],
  "DECIMAL guarda valores exatos, sem perder precisão: ideal para dinheiro. INT perderia os centavos e VARCHAR permitiria texto.");

q(TEMAS.TIPOS, "O que significa `DECIMAL(10,2)`?",
  ["10 dígitos no total, sendo 2 depois da vírgula",
   "10 dígitos antes da vírgula e mais 2 depois",
   "Um número com 10 casas decimais",
   "Valores entre 10 e 2"],
  "Conceito da Aula 5: o primeiro número é o total de dígitos; o segundo, quantos ficam após a vírgula. O maior valor é 99999999.99.");

q(TEMAS.TIPOS, "Qual é o **maior valor** que cabe em uma coluna `DECIMAL(4,2)`?",
  ["99.99", "9999.99", "4.2", "999.99"],
  "4 dígitos no total, 2 decimais: sobram 2 dígitos inteiros. Logo, 99.99 (usado no slide para notas, como 8.75).");

q(TEMAS.TIPOS, "Qual é o tipo mais adequado para a **UF** (ex.: PE, SP)?",
  ["`CHAR(2)`", "`VARCHAR(255)`", "`TEXT`", "`INT`"],
  "UF tem sempre exatamente 2 letras: tamanho fixo é CHAR. Exemplo do próprio slide da Aula 5.");

q(TEMAS.TIPOS, "Por que o **CPF** deve ser guardado como texto (ex.: `CHAR(11)`) e não como número?",
  ["Porque não fazemos contas com CPF e ele pode começar com zero, que seria perdido em um tipo numérico",
   "Porque o MySQL não aceita números com mais de 5 dígitos",
   "Porque texto ocupa menos espaço do que qualquer número",
   "Porque números não podem ser usados em chaves"],
  "O CPF `01234567890` guardado como INT viraria `1234567890`. Identificadores sem uso matemático (CPF, CEP, telefone) ficam melhor como texto.");

q(TEMAS.TIPOS, "Qual é a diferença entre `CHAR(n)` e `VARCHAR(n)`?",
  ["CHAR tem tamanho fixo; VARCHAR tem tamanho variável até o limite n",
   "CHAR guarda números e VARCHAR guarda textos",
   "CHAR aceita no máximo 1 caractere; VARCHAR aceita vários",
   "Não há diferença, são sinônimos"],
  "`CHAR(2)` sempre usa 2 posições (UF). `VARCHAR(100)` usa só o necessário, até 100 caracteres (nome).");

q(TEMAS.TIPOS, "Para guardar a **descrição longa** de um produto, qual tipo o slide da Aula 5 indica?",
  ["`TEXT`", "`CHAR(2)`", "`INT`", "`DATE`"],
  "TEXT é para textos mais longos e flexíveis. VARCHAR é para textos com limite conhecido.");

q(TEMAS.TIPOS, "Qual tipo armazena **data e hora** juntas, como `2026-09-10 18:30:00`?",
  ["`TIMESTAMP`", "`DATE`", "`TIME`", "`CHAR(10)`"],
  "DATE guarda só a data; TIME, só a hora; TIMESTAMP guarda as duas. Ele é útil para rastreabilidade (ex.: `criado_em`).");

q(TEMAS.TIPOS, "Em que formato o MySQL espera uma data em um INSERT?",
  ["`'AAAA-MM-DD'`, como `'2026-09-01'`", "`'DD/MM/AAAA'`, como `'01/09/2026'`", "`'MM-DD-AAAA'`", "`DD.MM.AAAA` sem aspas"],
  "O padrão é ano-mês-dia, entre aspas simples: `'2026-09-01'`.");

q(TEMAS.TIPOS, "Como o MySQL armazena uma coluna declarada como `BOOLEAN`?",
  ["Como `TINYINT(1)`: 1 significa verdadeiro e 0 significa falso",
   "Como o texto 'true' ou 'false'",
   "Como os caracteres 'S' ou 'N'",
   "O MySQL não aceita a palavra BOOLEAN"],
  "Por isso as consultas da Aula 7 usam `WHERE ativo = 1` para buscar os ativos.");

q(TEMAS.TIPOS, "Na Aula 5, por que `idade INTEGER` é mais seguro do que `idade VARCHAR`?",
  ["INTEGER só aceita números inteiros e rejeita textos inválidos já na entrada",
   "VARCHAR é mais seguro, porque aceita qualquer formato",
   "INTEGER criptografa o valor da idade",
   "Os dois são iguais em termos de segurança"],
  "\"Segurança de dados começa na forma como os campos são definidos, armazenados e validados.\" O tipo correto já filtra lixo.");

q(TEMAS.TIPOS, "Na tabela de correspondências da Aula 5, o tipo Java `LocalDateTime` corresponde a qual tipo no banco?",
  ["`TIMESTAMP`", "`DATE`", "`TIME`", "`VARCHAR`"],
  "LocalDate → DATE; LocalDateTime → TIMESTAMP. Os tipos se correspondem, mas não são idênticos, pois são contextos diferentes.");

q(TEMAS.TIPOS, "Qual é o tipo mais adequado para a **quantidade em estoque** de um produto?",
  ["`INT`", "`DECIMAL(10,2)`", "`VARCHAR(20)`", "`DATE`"],
  "Estoque é contado em unidades inteiras. Não faz sentido ter 2,5 teclados.");

q(TEMAS.TIPOS, "O que significa `nome VARCHAR(100)`?",
  ["O nome pode ter até 100 caracteres", "O nome tem exatamente 100 caracteres sempre", "O nome pode ter até 100 palavras", "O campo aceita até 100 nomes"],
  "VARCHAR é variável: \"Ana\" usa 3 caracteres; o limite é 100.");

q(TEMAS.TIPOS, "Em qual grupo de comandos SQL os tipos de dados são usados **principalmente**?",
  ["DDL, ao definir a estrutura das tabelas", "DML, ao consultar dados", "DCL, ao conceder permissões", "Em nenhum: são definidos apenas no brModelo"],
  "Os tipos aparecem no `CREATE TABLE` e no `ALTER TABLE`, que são comandos DDL.");

q(TEMAS.TIPOS, "Para guardar o **peso** de um produto em kg com 3 casas decimais (ex.: 12,350), qual tipo o slide usa?",
  ["`DECIMAL(6,3)`", "`INT`", "`CHAR(6)`", "`BOOLEAN`"],
  "DECIMAL(6,3): 6 dígitos no total, 3 após a vírgula. Medidas que não podem perder exatidão usam DECIMAL.");

/* ===================== DDL ===================== */
q(TEMAS.DDL, "O que significa **DDL**?",
  ["Data Definition Language: comandos que definem a estrutura do banco",
   "Data Manipulation Language: comandos que manipulam registros",
   "Data Control Language: comandos de permissão",
   "Database Download Link: comando para baixar o banco"],
  "DDL = estrutura (CREATE, ALTER, DROP, TRUNCATE). DML = dados. DCL = permissões.");

q(TEMAS.DDL, "Qual destes comandos **NÃO** é DDL?",
  ["`INSERT`", "`CREATE`", "`ALTER`", "`TRUNCATE`"],
  "INSERT é DML, pois insere registros. CREATE, ALTER, DROP e TRUNCATE trabalham na estrutura.");

q(TEMAS.DDL, "Você quer apagar **todos os registros** da tabela `cliente`, mas **manter a tabela**. Qual comando DDL usar?",
  ["`TRUNCATE TABLE cliente;`", "`DROP TABLE cliente;`", "`ALTER TABLE cliente DROP;`", "`DELETE TABLE cliente;`"],
  "TRUNCATE limpa os dados e mantém a estrutura. DROP apagaria a tabela inteira. `DELETE TABLE` não existe.");

q(TEMAS.DDL, "O que acontece ao executar o comando abaixo?",
  ["A tabela cliente é removida do banco, junto com todos os seus dados",
   "Apenas os registros são apagados; a tabela continua existindo",
   "Apenas a última linha da tabela é apagada",
   "A tabela é desativada temporariamente e pode ser reativada"],
  "DROP TABLE remove a estrutura e os dados. Depois dele, um `SELECT * FROM cliente` dá erro: a tabela não existe.",
  { codigo: "DROP TABLE cliente;" });

q(TEMAS.DDL, "O que faz o comando abaixo?",
  ["Adiciona a coluna email à tabela cliente", "Renomeia a tabela cliente para email", "Insere um e-mail em todos os clientes", "Cria uma nova tabela chamada email"],
  "ALTER TABLE muda a estrutura. Os dados que já existem continuam; a nova coluna começa vazia (NULL).",
  { codigo: "ALTER TABLE cliente ADD email VARCHAR(100);" });

q(TEMAS.DDL, "Considerando a tabela criada abaixo e o modo padrão (estrito) do MySQL 8, o que acontece no INSERT?",
  ["Erro: a coluna nome é NOT NULL e não recebeu valor",
   "O produto é inserido com nome NULL",
   "O produto é inserido e o id fica NULL",
   "O produto é inserido com nome igual a 'produto'"],
  "NOT NULL torna o campo obrigatório. O id não é problema: o AUTO_INCREMENT gera sozinho. O erro é 1364: \"Field 'nome' doesn't have a default value\".",
  { codigo: "CREATE TABLE produto (\n  id    INT AUTO_INCREMENT PRIMARY KEY,\n  nome  VARCHAR(100) NOT NULL,\n  preco DECIMAL(10,2)\n);\n\nINSERT INTO produto (preco) VALUES (10.00);" });

q(TEMAS.DDL, "Para que serve `AUTO_INCREMENT` na coluna `id`?",
  ["Gerar automaticamente um número novo a cada registro inserido",
   "Aumentar o valor do id em 1 sempre que o registro for consultado",
   "Permitir que o id se repita",
   "Criar automaticamente uma nova tabela quando a atual encher"],
  "Com AUTO_INCREMENT você não informa o id no INSERT: o MySQL gera 1, 2, 3... A PK normalmente é usada junto com ele.");

q(TEMAS.DDL, "O que a última linha do comando abaixo garante?",
  ["Que todo valor de pedido.id_cliente exista em cliente.id",
   "Que cada cliente tenha exatamente um pedido",
   "Que id_cliente seja a chave primária de pedido",
   "Que os pedidos sejam apagados quando o cliente for consultado"],
  "FOREIGN KEY ... REFERENCES cria a ligação e a regra de integridade referencial.",
  { codigo: "CREATE TABLE pedido (\n  id_pedido  INT PRIMARY KEY,\n  id_cliente INT,\n  data       DATE,\n  FOREIGN KEY (id_cliente) REFERENCES cliente(id)\n);" });

q(TEMAS.DDL, "A tabela `pedido` tem uma FK que referencia `cliente`. Em que ordem as tabelas devem ser criadas?",
  ["Primeiro cliente, depois pedido", "Primeiro pedido, depois cliente", "Em qualquer ordem, o MySQL resolve sozinho", "As duas precisam ser criadas no mesmo comando"],
  "Uma FK só pode apontar para uma tabela que já existe. Crie primeiro as tabelas sem FK.");

q(TEMAS.DDL, "Por que o script abaixo dá erro ao ser executado?",
  ["O primeiro CREATE TABLE termina com vírgula em vez de ponto e vírgula",
   "VARCHAR precisa de dois números entre parênteses",
   "PRIMARY KEY precisa ser a última coluna",
   "INT não é um tipo válido no MySQL"],
  "Cada comando termina com `;`. Com a vírgula, o MySQL junta os dois CREATE em um só e acusa erro de sintaxe.",
  { codigo: "CREATE TABLE cliente (\n  id   INT PRIMARY KEY,\n  nome VARCHAR(100)\n),\n\nCREATE TABLE plano (\n  id   INT PRIMARY KEY,\n  nome VARCHAR(100)\n);" });

q(TEMAS.DDL, "O que faz o comando abaixo?",
  ["Remove a coluna telefone e todos os dados dela", "Apaga a tabela cliente", "Apaga os clientes que não têm telefone", "Esvazia a coluna telefone, mas mantém a coluna"],
  "ALTER TABLE ... DROP COLUMN remove a coluna da estrutura; os valores dessa coluna se perdem.",
  { codigo: "ALTER TABLE cliente DROP COLUMN telefone;" });

q(TEMAS.DDL, "O que faz o comando abaixo?",
  ["Altera o tipo/tamanho da coluna nome para VARCHAR(150)", "Cria uma nova coluna nome2", "Altera o nome de todos os clientes", "Apaga a coluna nome"],
  "MODIFY muda a definição de uma coluna existente. Para renomear uma coluna, o MySQL usa CHANGE.",
  { codigo: "ALTER TABLE cliente MODIFY nome VARCHAR(150);" });

q(TEMAS.DDL, "O comando `CREATE DATABASE escola;` faz o quê?",
  ["Cria um novo banco de dados chamado escola", "Cria uma tabela chamada escola", "Cria um usuário chamado escola", "Seleciona o banco escola para uso"],
  "Depois de criar, é preciso `USE escola;` para trabalhar dentro dele.");

q(TEMAS.DDL, "Com a FK abaixo, o que acontece ao **excluir um fornecedor** que tem produtos?",
  ["Os produtos desse fornecedor também são excluídos automaticamente",
   "A exclusão é bloqueada com um erro",
   "Os produtos ficam com o fornecedor NULL",
   "Nada acontece com os produtos"],
  "ON DELETE CASCADE propaga a exclusão para os filhos. Sem essa opção, o padrão do MySQL é bloquear (erro 1451). Assunto do livro, Unidade 4.",
  { codigo: "ALTER TABLE produto\n  ADD CONSTRAINT fk_pro_for\n  FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id)\n  ON DELETE CASCADE;" });

q(TEMAS.DDL, "Na tabela abaixo, o que a chave primária composta impede?",
  ["Que o mesmo par (id_livro, id_autor) seja cadastrado duas vezes",
   "Que o mesmo id_livro apareça em mais de uma linha",
   "Que o mesmo id_autor apareça em mais de uma linha",
   "Que a tabela tenha chaves estrangeiras"],
  "Cada coluna sozinha pode repetir (um livro tem vários autores). O que não pode repetir é a **combinação** das duas.",
  { codigo: "CREATE TABLE livro_autor (\n  id_livro INT NOT NULL,\n  id_autor INT NOT NULL,\n  PRIMARY KEY (id_livro, id_autor)\n);" });

q(TEMAS.DDL, "Qual comando mostra as colunas e os tipos de dados da tabela `cliente`?",
  ["`DESCRIBE cliente;`", "`SHOW cliente;`", "`SELECT TYPES FROM cliente;`", "`LIST COLUMNS cliente;`"],
  "`DESCRIBE` (ou `SHOW CREATE TABLE cliente;`) mostra a estrutura. É um comando de apoio para conferir o que o DDL criou.");

q(TEMAS.DDL, "Qual é a diferença entre `DROP TABLE` e `TRUNCATE TABLE`?",
  ["DROP apaga a tabela e os dados; TRUNCATE apaga só os dados e mantém a tabela",
   "DROP apaga só os dados; TRUNCATE apaga a tabela inteira",
   "Os dois fazem exatamente a mesma coisa",
   "DROP é DML e TRUNCATE é DDL"],
  "Os dois são DDL. Depois do TRUNCATE a tabela continua lá, vazia; depois do DROP ela deixa de existir.");

/* ===================== DML E CONSULTAS ===================== */
q(TEMAS.DML, "O que significa **DML**?",
  ["Data Manipulation Language: comandos que manipulam os registros",
   "Data Definition Language: comandos que definem a estrutura",
   "Data Control Language: comandos de permissão",
   "Database Management Layer: camada física do banco"],
  "DML = INSERT, SELECT, UPDATE e DELETE. Trabalha com os dados dentro das tabelas.");

q(TEMAS.DML, "Qual destes comandos **NÃO** é DML?",
  ["`CREATE`", "`INSERT`", "`UPDATE`", "`SELECT`"],
  "CREATE é DDL (cria estrutura). INSERT, UPDATE, DELETE e SELECT são DML.");

q(TEMAS.DML, "Com a tabela abaixo, quanto o comando retorna?",
  ["3", "2", "4", "6"],
  "Ana, Carla e Eva moram em Recife.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT COUNT(*) FROM cliente\nWHERE cidade = 'Recife';" });

q(TEMAS.DML, "Com a tabela abaixo, quanto retorna `COUNT(email)`?",
  ["4", "6", "2", "0"],
  "`COUNT(coluna)` ignora os valores NULL. Bruno e Eva não têm e-mail, então são 6 − 2 = 4. Já `COUNT(*)` contaria as 6 linhas.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT COUNT(email) FROM cliente;" });

q(TEMAS.DML, "Quantas linhas o comando abaixo retorna?",
  ["3", "6", "2", "1"],
  "DISTINCT remove repetições: Recife, Olinda e Caruaru.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT DISTINCT cidade FROM cliente;" });

q(TEMAS.DML, "Quantos clientes o comando abaixo retorna?",
  ["4", "2", "3", "6"],
  "BETWEEN inclui os limites: idades 25, 31, 31 e 25 (Ana, Bruno, Diego e Felipe).",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE idade BETWEEN 25 AND 31;" });

q(TEMAS.DML, "Quais nomes o comando abaixo retorna?",
  ["Ana, Carla e Eva", "Apenas Ana", "Ana e Carla", "Nenhum nome"],
  "`'%a'` = qualquer sequência de caracteres seguida de \"a\" no final. Ana, Carla e Eva terminam com \"a\".",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE nome LIKE '%a';" });

q(TEMAS.DML, "Quais nomes o comando abaixo retorna?",
  ["Apenas Bruno", "Bruno e Carla", "Nenhum nome", "Todos os nomes com a letra r"],
  "`_` = exatamente um caractere. `'_r%'` significa \"segunda letra é r\". Só Bruno (B-r-uno) atende.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE nome LIKE '_r%';" });

q(TEMAS.DML, "Quantos clientes o comando abaixo retorna?",
  ["3", "2", "1", "5"],
  "OR basta uma condição: Bruno e Felipe (Olinda) e Eva (19 anos).",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE cidade = 'Olinda' OR idade < 20;" });

q(TEMAS.DML, "Quais clientes o comando abaixo retorna?",
  ["Bruno e Eva", "Ana, Carla, Diego e Felipe", "Nenhum cliente", "Todos os clientes"],
  "IS NULL encontra os registros sem valor informado no campo email.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE email IS NULL;" });

q(TEMAS.DML, "O que o comando abaixo retorna?",
  ["Nenhuma linha, porque comparar com NULL usando = nunca é verdadeiro",
   "Bruno e Eva",
   "Todos os clientes",
   "Um erro de sintaxe"],
  "NULL é \"desconhecido\": `email = NULL` não dá verdadeiro nem para quem não tem e-mail. O certo é `WHERE email IS NULL`.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE email = NULL;" });

q(TEMAS.DML, "Qual é o resultado do comando abaixo?",
  ["Recife 3, Olinda 2, Caruaru 1", "Recife 1, Olinda 1, Caruaru 1", "Uma única linha com o total 6", "Seis linhas, uma por cliente"],
  "GROUP BY junta as linhas com a mesma cidade e gera **uma linha por grupo**; COUNT(*) conta cada grupo.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT cidade, COUNT(*) AS total\nFROM cliente\nGROUP BY cidade;" });

q(TEMAS.DML, "Qual é o resultado do comando abaixo?",
  ["28.5", "25", "31", "171"],
  "AVG calcula a média: (25 + 31 + 40 + 31 + 19 + 25) / 6 = 171 / 6 = 28,5.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT AVG(idade) FROM cliente;" });

q(TEMAS.DML, "Qual nome o comando abaixo retorna?",
  ["Carla", "Eva", "Bruno", "Ana"],
  "ORDER BY idade DESC coloca a maior idade (40) primeiro, e LIMIT 1 pega só a primeira linha.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nORDER BY idade DESC\nLIMIT 1;" });

q(TEMAS.DML, "Quantos clientes o comando abaixo retorna?",
  ["4", "3", "2", "5"],
  "IN verifica se o valor está na lista: 3 de Recife + 1 de Caruaru = 4. É o mesmo que `cidade = 'Recife' OR cidade = 'Caruaru'`.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE cidade IN ('Recife', 'Caruaru');" });

q(TEMAS.DML, "Quantos clientes o comando abaixo retorna?",
  ["3", "4", "2", "6"],
  "NOT inverte a condição: todos que não são de Recife (Bruno, Diego e Felipe).",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE NOT cidade = 'Recife';" });

q(TEMAS.DML, "Quais clientes o comando abaixo retorna?",
  ["Bruno, Carla e Diego", "Apenas Carla", "Ana, Eva e Felipe", "Bruno e Diego"],
  "`idade > 30`: Bruno (31), Carla (40) e Diego (31). O sinal `>` não inclui o 30.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE idade > 30;" });

q(TEMAS.DML, "Quantos clientes o comando abaixo retorna? (Atenção à precedência dos operadores.)",
  ["4", "1", "3", "5"],
  "AND é avaliado antes de OR: `cidade = 'Recife' OR (cidade = 'Olinda' AND idade > 30)`. Recife: Ana, Carla e Eva; Olinda com mais de 30: Bruno. Total 4. Use parênteses para deixar a intenção clara.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT nome FROM cliente\nWHERE cidade = 'Recife' OR cidade = 'Olinda' AND idade > 30;" });

q(TEMAS.DML, "Quanto o comando abaixo retorna?",
  ["3", "6", "2", "1"],
  "`COUNT(DISTINCT cidade)` conta as cidades diferentes: Recife, Olinda e Caruaru.",
  { img: IMG.tabela(DADOS.cliente), codigo: "SELECT COUNT(DISTINCT cidade) FROM cliente;" });

q(TEMAS.DML, "O que acontece ao executar o comando abaixo?",
  ["A cidade de todos os clientes da tabela passa a ser Recife",
   "Só o primeiro cliente tem a cidade alterada",
   "O MySQL pede confirmação e não altera nada",
   "Dá erro, porque o UPDATE exige WHERE"],
  "Sem WHERE, o UPDATE altera **todas** as linhas. Sempre filtre, de preferência pela chave primária.",
  { codigo: "UPDATE cliente SET cidade = 'Recife';" });

q(TEMAS.DML, "O que acontece ao executar o comando abaixo?",
  ["Todos os registros de cliente são apagados, mas a tabela continua existindo",
   "A tabela cliente é removida do banco",
   "Só o último cliente é apagado",
   "Dá erro, porque o DELETE exige WHERE"],
  "DELETE sem WHERE apaga todas as linhas (perigoso!). A estrutura continua. Para apagar a tabela, seria DROP.",
  { codigo: "DELETE FROM cliente;" });

q(TEMAS.DML, "Qual comando apaga **somente** o cliente de id 5?",
  ["`DELETE FROM cliente WHERE id = 5;`", "`DELETE cliente 5;`", "`DROP FROM cliente WHERE id = 5;`", "`TRUNCATE cliente WHERE id = 5;`"],
  "DELETE + WHERE remove só o que atende à condição. DROP e TRUNCATE não aceitam WHERE.");

q(TEMAS.DML, "Qual INSERT está escrito corretamente?",
  ["`INSERT INTO cliente (nome, cidade) VALUES ('Gil', 'Recife');`",
   "`ADD INTO cliente VALUES ('Gil', 'Recife');`",
   "`INSERT ('Gil', 'Recife') INTO cliente;`",
   "`INSERT INTO cliente VALUE nome = Gil;`"],
  "Formato: INSERT INTO tabela (colunas) VALUES (valores), na mesma ordem e com textos entre aspas simples.");

q(TEMAS.DML, "Se você escrever `ORDER BY nome` **sem** ASC nem DESC, qual ordenação o MySQL usa?",
  ["Crescente (ASC)", "Decrescente (DESC)", "Aleatória", "A ordem dá erro sem ASC ou DESC"],
  "ASC é o padrão: A→Z para textos e menor→maior para números.");

q(TEMAS.DML, "O que o `AS` faz no comando abaixo?",
  ["Dá o apelido total à coluna do resultado, sem alterar a tabela",
   "Cria uma nova coluna chamada total na tabela cliente",
   "Renomeia a tabela cliente para total",
   "Guarda o resultado em uma variável total"],
  "AS cria um alias: muda só o nome exibido no resultado, deixando relatórios mais claros.",
  { codigo: "SELECT COUNT(*) AS total FROM cliente;" });

q(TEMAS.DML, "Com a tabela abaixo, quanto o comando retorna?",
  ["600.00", "120.00", "5", "200.00"],
  "SUM soma a coluna: 150 + 80 + 200 + 50 + 120 = 600.",
  { img: IMG.tabela(DADOS.pedido), codigo: "SELECT SUM(valor) FROM pedido;" });

q(TEMAS.DML, "Considere as tabelas cliente (6 clientes) e pedido abaixo. Quantas linhas o INNER JOIN retorna?",
  ["5", "6", "8", "11"],
  "INNER JOIN gera uma linha para cada par que combina pela condição ON. Os 5 pedidos têm cliente válido: 5 linhas.",
  { img: IMG.tabela(DADOS.pedido), codigo: "SELECT cliente.nome, pedido.valor\nFROM cliente\nINNER JOIN pedido ON cliente.id = pedido.id_cliente;" });

q(TEMAS.DML, "Usando a tabela `cliente` (Ana=1, Bruno=2, Carla=3, Diego=4, Eva=5, Felipe=6) e a tabela `pedido` abaixo, quais clientes **NÃO** aparecem no resultado do INNER JOIN?",
  ["Bruno, Eva e Felipe", "Ana, Carla e Diego", "Apenas Eva", "Todos aparecem"],
  "INNER JOIN só traz quem tem correspondência nas duas tabelas. Os clientes 2, 5 e 6 não têm pedidos.",
  { img: IMG.tabela(DADOS.pedido), codigo: "SELECT cliente.nome\nFROM cliente\nINNER JOIN pedido ON cliente.id = pedido.id_cliente;" });

q(TEMAS.DML, "Com cliente (6 clientes) e pedido (abaixo), quantas linhas o **LEFT JOIN** retorna?",
  ["8", "5", "6", "11"],
  "LEFT JOIN traz **todos** os clientes. Ana e Carla aparecem 2 vezes (2 pedidos cada), Diego 1 vez, e Bruno, Eva e Felipe 1 vez cada com valor NULL: 2 + 2 + 1 + 3 = 8. Assunto do livro, Unidade 3.",
  { img: IMG.tabela(DADOS.pedido), codigo: "SELECT cliente.nome, pedido.valor\nFROM cliente\nLEFT JOIN pedido ON cliente.id = pedido.id_cliente;" });

q(TEMAS.DML, "Quais `id_cliente` o comando abaixo retorna?",
  ["1 e 3", "1, 3 e 4", "Apenas 3", "4"],
  "Somas por cliente: 1 → 230, 3 → 320, 4 → 50. HAVING filtra os **grupos** depois do GROUP BY: ficam 1 e 3. HAVING é assunto do livro, Unidade 3.",
  { img: IMG.tabela(DADOS.pedido), codigo: "SELECT id_cliente, SUM(valor) AS total\nFROM pedido\nGROUP BY id_cliente\nHAVING SUM(valor) > 100;" });

q(TEMAS.DML, "Qual é a diferença entre WHERE e HAVING?",
  ["WHERE filtra as linhas antes do agrupamento; HAVING filtra os grupos depois do GROUP BY",
   "WHERE só funciona com números e HAVING só com textos",
   "HAVING é usado no lugar de ORDER BY",
   "Não há diferença: são sinônimos"],
  "Para filtrar pelo resultado de uma função de agregação (ex.: `SUM(valor) > 100`), usa-se HAVING.");

q(TEMAS.DML, "Qual é a ordem correta das cláusulas em um SELECT?",
  ["SELECT → FROM → WHERE → GROUP BY → ORDER BY",
   "SELECT → WHERE → FROM → ORDER BY → GROUP BY",
   "FROM → SELECT → GROUP BY → WHERE → ORDER BY",
   "SELECT → FROM → ORDER BY → WHERE → GROUP BY"],
  "Escreva sempre nessa ordem: o que mostrar, de onde, quais linhas, como agrupar e como ordenar.");

q(TEMAS.DML, "No comando abaixo, o que a cláusula **ON** indica?",
  ["A condição que liga as tabelas, normalmente PK = FK",
   "Que o JOIN está ligado e o servidor está online",
   "A coluna usada para ordenar o resultado",
   "Que os registros nulos devem ser exibidos"],
  "Aqui, `cliente.id` (PK) = `pedido.id_cliente` (FK). É assim que o JOIN sabe qual pedido é de qual cliente.",
  { codigo: "SELECT cliente.nome, pedido.produto\nFROM cliente\nINNER JOIN pedido\nON cliente.id = pedido.id_cliente;" });

q(TEMAS.DML, "O cliente 1 (Ana) possui pedidos na tabela `pedido`, ligada por uma FK sem CASCADE. O que acontece ao executar o comando?",
  ["O MySQL bloqueia a exclusão com erro de chave estrangeira",
   "Ana e todos os seus pedidos são apagados",
   "Ana é apagada e os pedidos ficam com id_cliente NULL",
   "Ana é apagada e os pedidos continuam apontando para o id 1"],
  "Por padrão, o MySQL não deixa apagar o \"pai\" que ainda tem \"filhos\" (erro 1451). Apague primeiro os pedidos, ou use ON DELETE CASCADE.",
  { codigo: "DELETE FROM cliente WHERE id = 1;" });

q(TEMAS.DML, "Para que serve o `GROUP BY`?",
  ["Reunir as linhas com o mesmo valor em uma coluna para calcular agregações por grupo",
   "Ordenar o resultado em ordem alfabética",
   "Criar grupos de usuários com permissões",
   "Remover as linhas duplicadas da tabela física"],
  "Ex.: total de clientes por cidade. O resultado mostra uma linha por grupo.");

q(TEMAS.DML, "Qual função retorna o **maior** valor de uma coluna?",
  ["`MAX()`", "`MIN()`", "`SUM()`", "`TOP()`"],
  "COUNT conta, SUM soma, AVG faz a média, MIN pega o menor e MAX o maior. TOP não é função do MySQL.");

q(TEMAS.DML, "No comando abaixo, para que serve `cliente.nome` (nome da tabela + ponto + coluna)?",
  ["Indicar de qual tabela vem a coluna, evitando ambiguidade quando as duas tabelas têm colunas com o mesmo nome",
   "Criar uma nova coluna chamada cliente.nome",
   "Juntar o nome do cliente ao nome da tabela no resultado",
   "É obrigatório em qualquer SELECT, mesmo com uma só tabela"],
  "Se cliente e produto tiverem uma coluna `nome`, escrever só `nome` seria ambíguo.",
  { codigo: "SELECT cliente.nome, produto.nome\nFROM cliente\nINNER JOIN produto ON ...;" });

q(TEMAS.DML, "Qual comando lista os produtos com preço **entre 50 e 200, incluindo os limites**?",
  ["`SELECT * FROM produto WHERE preco BETWEEN 50 AND 200;`",
   "`SELECT * FROM produto WHERE preco IN (50, 200);`",
   "`SELECT * FROM produto WHERE preco LIKE '50%200';`",
   "`SELECT * FROM produto WHERE preco > 50 OR preco < 200;`"],
  "BETWEEN é inclusivo. IN pegaria só os preços exatamente 50 ou 200, e o OR traria todos os produtos.");

/* ===================== DCL ===================== */
q(TEMAS.DCL, "O que significa **DCL**?",
  ["Data Control Language: comandos que controlam permissões de acesso",
   "Data Change Language: comandos que alteram registros",
   "Data Create Language: comandos que criam tabelas",
   "Database Copy Log: registro de cópias do banco"],
  "DCL = GRANT (conceder) e REVOKE (revogar). Assunto do livro, Unidade 4, ligado ao \"controlar acessos\" da Aula 1.");

q(TEMAS.DCL, "Qual comando **concede** uma permissão a um usuário?",
  ["`GRANT`", "`REVOKE`", "`COMMIT`", "`ALLOW`"],
  "GRANT concede; REVOKE retira. ALLOW não existe no MySQL, e COMMIT é de controle de transações.");

q(TEMAS.DCL, "Qual comando **retira** uma permissão já concedida?",
  ["`REVOKE`", "`GRANT`", "`DROP`", "`DELETE`"],
  "REVOKE desfaz um GRANT. DROP e DELETE apagam estrutura e dados, respectivamente.");

q(TEMAS.DCL, "Qual comando retira de `ana` a permissão de INSERT na tabela pedido do banco loja?",
  ["`REVOKE INSERT ON loja.pedido FROM 'ana'@'localhost';`",
   "`REVOKE INSERT ON loja.pedido TO 'ana'@'localhost';`",
   "`DELETE GRANT INSERT FROM ana;`",
   "`GRANT NOT INSERT ON loja.pedido TO 'ana'@'localhost';`"],
  "Regra para decorar: GRANT ... **TO** (concede **para**); REVOKE ... **FROM** (retira **de**).");

q(TEMAS.DCL, "O que o usuário `relatorio` pode fazer após o comando abaixo?",
  ["Apenas consultar (SELECT) todas as tabelas do banco loja",
   "Consultar, inserir e apagar dados no banco loja",
   "Criar e apagar tabelas no banco loja",
   "Consultar todos os bancos do servidor"],
  "`loja.*` = todas as tabelas do banco loja. Só SELECT foi concedido; qualquer INSERT, UPDATE ou DELETE será negado.",
  { codigo: "GRANT SELECT ON loja.* TO 'relatorio'@'localhost';" });

q(TEMAS.DCL, "Após o comando abaixo, o usuário `rh` executa `SELECT cpf FROM loja.cliente;`. O que acontece?",
  ["O comando é negado: ele só pode ver as colunas nome e cidade",
   "Ele vê o CPF normalmente",
   "Ele vê o CPF com os números mascarados",
   "O MySQL apaga a permissão dele por segurança"],
  "É possível conceder permissão por coluna. Isso protege dados pessoais (privacidade, Aula 1).",
  { codigo: "GRANT SELECT (nome, cidade) ON loja.cliente TO 'rh'@'localhost';" });

q(TEMAS.DCL, "Para que serve o comando `SHOW GRANTS FOR 'ana'@'localhost';`?",
  ["Listar as permissões que o usuário ana possui",
   "Conceder todas as permissões ao usuário ana",
   "Mostrar a senha do usuário ana",
   "Listar as tabelas criadas pela ana"],
  "Use SHOW GRANTS para conferir o resultado de um GRANT ou REVOKE.");

q(TEMAS.DCL, "No comando abaixo, o que significa `'localhost'`?",
  ["Que o usuário só pode se conectar a partir da própria máquina do servidor",
   "Que o usuário pode se conectar de qualquer computador da internet",
   "O nome do banco de dados ao qual o usuário pertence",
   "A senha padrão do usuário"],
  "O usuário no MySQL é a combinação nome@host. 'localhost' restringe a origem da conexão.",
  { codigo: "CREATE USER 'ana'@'localhost' IDENTIFIED BY 'Senha#2026';" });

q(TEMAS.DCL, "O usuário `relatorio` tem apenas `GRANT SELECT` no banco loja e tenta executar `DELETE FROM loja.cliente WHERE id = 1;`. O que acontece?",
  ["O MySQL nega o comando por falta de permissão",
   "O cliente é apagado normalmente",
   "O cliente é apagado, mas fica registrado em log",
   "O MySQL transforma o DELETE em SELECT"],
  "Com só SELECT, qualquer alteração é recusada. Esse é o princípio de conceder o mínimo necessário.");

q(TEMAS.DCL, "Classifique, na ordem, os comandos **GRANT**, **INSERT** e **ALTER**:",
  ["DCL, DML e DDL", "DML, DDL e DCL", "DDL, DML e DCL", "DCL, DDL e DML"],
  "GRANT controla permissão (DCL); INSERT manipula dados (DML); ALTER muda estrutura (DDL).");

q(TEMAS.DCL, "O que é **SQL injection**?",
  ["Inserir comandos SQL maliciosos em campos de entrada de uma aplicação para alterar a consulta",
   "Um comando oficial do MySQL para inserir vários registros de uma vez",
   "A técnica de criar índices para acelerar consultas",
   "Uma forma de importar arquivos .sql no VS Code"],
  "Acontece quando o backend cola o texto digitado direto no SQL. A defesa é usar consultas parametrizadas e validar as entradas.");

q(TEMAS.DCL, "Qual prática **reduz** o risco de SQL injection em uma aplicação?",
  ["Usar consultas parametrizadas em vez de concatenar o texto digitado pelo usuário",
   "Dar permissão total (ALL PRIVILEGES) ao usuário da aplicação",
   "Guardar a senha do banco no código do frontend",
   "Desligar as chaves estrangeiras do banco"],
  "Com parâmetros, o que o usuário digita é tratado como dado, nunca como comando. Somado a permissões mínimas, o estrago possível diminui.");

q(TEMAS.DCL, "Qual comando dá ao usuário `dev` **todas** as permissões apenas no banco `loja`?",
  ["`GRANT ALL PRIVILEGES ON loja.* TO 'dev'@'localhost';`",
   "`GRANT ALL PRIVILEGES ON *.* TO 'dev'@'localhost';`",
   "`REVOKE ALL PRIVILEGES ON loja.* FROM 'dev'@'localhost';`",
   "`GRANT SELECT ON loja.* TO 'dev'@'localhost';`"],
  "`loja.*` limita ao banco loja. `*.*` daria acesso a todos os bancos do servidor, mais do que o necessário.");
