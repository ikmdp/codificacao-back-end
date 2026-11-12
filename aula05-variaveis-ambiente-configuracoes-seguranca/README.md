18/09/2026
📘 Aula 05 — Variáveis de Ambiente e Configurações de Segurança

1. Objetivo

Aprender a separar configurações sensíveis do código-fonte usando variáveis de ambiente, com apoio do pacote dotenv, e aplicar boas práticas de segurança no Node.js.

2. Conceitos da aula
O que são variáveis de ambiente e por que usá-las
Diferença entre .env (real) e .env.example (modelo)
Carregamento de variáveis com dotenv
Validação de variáveis obrigatórias na inicialização
Boas práticas de segurança para não expor credenciais

3. Estrutura do projeto
aula05-variaveis-ambiente-configuracoes-seguranca/
├── node_modules/
├── .env              # variáveis reais (NÃO versionado)
├── .env.example      # modelo de variáveis (versionado)
├── .gitignore
├── app.js
├── package.json
└── package-lock.json
4. Passo a passo do código

1. dotenv.config() carrega as variáveis do arquivo .env para dentro de process.env.

2. const porta = process.env.PORT || 8080
   Lê a variável PORT; se não existir, usa 8080 como valor padrão.

3. const apiKey = process.env.API_KEY_PAGAMENTO
   Lê a chave de API a partir das variáveis de ambiente.

4. const dbUrl = process.env.DATABASE_URL
   Lê a URL de conexão com o banco de dados.

5. if(!apiKey){ ... }
   Verifica se a chave obrigatória foi definida. Se não foi, exibe um
   erro crítico no console e encerra a aplicação com process.exit(1).

6. console.log(...)
   Exibe no terminal as configurações carregadas: porta, banco de dados,
   chave de API e o tamanho da chave (usado aqui apenas como exemplo
   didático de status/autenticação).

7. iniciarAplicacao()
   Chama a função ao final do arquivo, executando todo o fluxo acima
   assim que o script é iniciado.