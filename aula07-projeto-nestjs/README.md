21/09/2026

# Aula 07 - Projeto NestJS

Projeto de introdução ao **NestJS**, cobrindo a estrutura básica de uma aplicação, criação de módulos, controllers, services, e depuração de um worker de observabilidade (telemetria).

## 📦 Estrutura do projeto

```
aula-07-projeto-nestjs/
├── src/
│   ├── app.controller.ts       # Controller principal (rota /status)
│   ├── app.controller.spec.ts  # Testes do controller
│   ├── app.module.ts           # Módulo raiz da aplicação
│   ├── app.service.ts          # Service com a lógica de negócio
│   └── main.ts                 # Ponto de entrada da aplicação
├── test/
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Rodando o projeto

```bash
npm install
npm run start
```

A aplicação sobe com o **NestFactory**, carrega os módulos (`AppModule`, `ObserveModule`) e registra as rotas — nesse caso, a rota `GET /status` mapeada pelo `AppController`.

## 🔧 O que foi feito na aula

### 1. Criação do `AppService`

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Servidor Nest.JS Ativo [Aula 07]';
  }
}
```

- `@Injectable()` marca a classe como um **provider**, permitindo que o NestJS a injete em outros lugares (como no `AppController`) via injeção de dependência.

### 2. Log de inicialização da aplicação

Ao rodar `npm run start`, o terminal mostra o ciclo de boot do Nest:

```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [InstanceLoader] DiscoveryModule dependencies initialized
[Nest] LOG [InstanceLoader] AppModule dependencies initialized
[Nest] LOG [InstanceLoader] ObserveModule dependencies initialized
[Nest] LOG [RoutesResolver] AppController {/status}:
[Nest] LOG [RouterExplorer] Mapped {/status, GET} route
[Nest] LOG [ObserveAgentWorker] Observe agent worker initialized.
[Nest] LOG [NestApplication] Nest application successfully started
```


## 🖥️ Comandos de terminal usados

| Comando | Uso |
|---|---|
| `Get-ChildItem` (ou `ls` / `dir`) | Lista os arquivos e pastas do diretório atual no PowerShell |
| `git init` | Inicializa um repositório Git na pasta do projeto |
| `git status` | Mostra os arquivos rastreados/não rastreados |
| `git add .` | Adiciona todos os arquivos modificados ao stage |
| `git commit -m "mensagem"` | Cria um commit com as mudanças |


## 📚 Aprendizados da aula

- Estrutura básica de uma aplicação NestJS (Controller → Service → Module)
- Injeção de dependência com `@Injectable()`
- Interpretação dos logs de boot do Nest
- Depuração de erros de autenticação em módulos externos (telemetria)
- Comandos básicos do PowerShell e inicialização de um repositório Git