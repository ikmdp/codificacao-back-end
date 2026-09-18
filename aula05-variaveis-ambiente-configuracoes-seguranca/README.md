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