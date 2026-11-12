30/09/2026

# Aula 13 — Middlewares e Interceptors no NestJS

Projeto de estudo do curso **Codificação Back-end**. Nesta aula vemos como interceptar requisições HTTP no NestJS usando **Middlewares** (e, como complemento, **Interceptors**).

## Objetivos

- Entender o que é um middleware e onde ele atua no ciclo de vida da requisição
- Criar um middleware de **log** de requisições
- Criar uma regra de **autorização simples** via header
- Registrar o middleware no módulo da aplicação
- Conhecer a diferença entre Middleware e Interceptor

## Estrutura do projeto

```
aula13-middlewares-interceptors-nestjs/
├── src/
│   ├── logger/
│   │   ├── logger.middleware.ts
│   │   └── logger.middleware.spec.ts
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── nest-cli.json
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## Como rodar

```bash
# instalar dependências
npm install

# desenvolvimento (watch)
npm run start:dev

# testes
npm run test
```

## Ciclo de vida da requisição

```
Requisição
   ↓
Middleware
   ↓
Guards
   ↓
Interceptors (antes)
   ↓
Pipes
   ↓
Controller / Handler
   ↓
Interceptors (depois)
   ↓
Resposta
```

O middleware é executado **antes** de qualquer guard, interceptor ou pipe, logo no início da requisição.

## Middleware

Um middleware é uma função (ou classe) que tem acesso ao objeto da requisição (`req`), da resposta (`res`) e à função `next()`. Ele pode:

- Executar qualquer código
- Alterar `req` e `res`
- Encerrar o ciclo, respondendo diretamente
- Chamar `next()` para passar o controle adiante

> Se o middleware não encerrar a requisição, **é obrigatório chamar `next()`**, senão a requisição fica travada.

### Criando com a CLI

```bash
nest generate middleware logger
# ou
nest g mi logger
```

### `src/logger/logger.middleware.ts`

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentUrl = req.originalUrl || req.url;
    console.log(`[LOG] Método: ${req.method} | Rota: ${req.path}`);

    if (currentUrl.startsWith('/admin')) {
      const base = req.headers['x-user-base'];

      if (base !== 'Administrador') {
        return res.status(403).json({
          codigo: 403,
          mensagem: 'Acesso Negado: Privilégio de Administrador necessário',
          registro: new Date(),
        });
      }
    }

    next();
  }
}
```

### Explicando o código

| Trecho | Função |
| --- | --- |
| `@Injectable()` | Permite que o Nest injete e gerencie a classe |
| `implements NestMiddleware` | Obriga a implementar o método `use` |
| `req.originalUrl \|\| req.url` | Pega a URL completa da requisição (incluindo query string) |
| `req.method` / `req.path` | Método HTTP e caminho da rota, usados no log |
| `req.headers['x-user-base']` | Lê um header customizado que informa o perfil do usuário |
| `res.status(403).json({...})` | Encerra a requisição com erro de acesso negado |
| `next()` | Libera a requisição para o próximo passo |

### ⚠️ Atenção ao filtro de rota

No código da aula, a condição foi escrita como:

```ts
if (currentUrl.startsWith('')) { ... }
```

`startsWith('')` retorna **sempre `true`**, então a validação do header seria aplicada a **todas** as rotas (inclusive `/`). Para proteger só uma área, informe o prefixo desejado:

```ts
if (currentUrl.startsWith('/admin')) { ... }
```

## Registrando o middleware

O middleware é registrado no módulo, implementando `NestModule` e o método `configure`.

### `src/app.module.ts`

```ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

### Opções do `forRoutes`

```ts
// todas as rotas
consumer.apply(LoggerMiddleware).forRoutes('*');

// uma rota específica
consumer.apply(LoggerMiddleware).forRoutes('admin');

// rota + método
consumer.apply(LoggerMiddleware).forRoutes({ path: 'admin', method: RequestMethod.GET });

// um controller inteiro
consumer.apply(LoggerMiddleware).forRoutes(AppController);

// excluir rotas
consumer.apply(LoggerMiddleware).exclude('health').forRoutes('*');
```

## Testando

Com a aplicação rodando, cada requisição gera uma linha no terminal:

```
[LOG] Método: GET | Rota: /
```

Teste da regra de autorização (rota protegida):

```bash
# sem header → 403
curl -i http://localhost:3000/admin

# com header correto → liberado
curl -i http://localhost:3000/admin -H "x-user-base: Administrador"
```

Resposta de acesso negado:

```json
{
  "codigo": 403,
  "mensagem": "Acesso Negado: Privilégio de Administrador necessário",
  "registro": "2026-09-30T21:21:00.000Z"
}
```

## Interceptors

Interceptors também interceptam requisições, mas ficam **mais próximos do controller** e têm acesso ao `ExecutionContext` e ao fluxo de resposta (via RxJS). Com eles é possível:

- Executar lógica **antes e depois** do handler
- Transformar a resposta
- Medir tempo de execução
- Tratar exceções
- Aplicar cache

### Exemplo: medir tempo de execução

```ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TempoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const inicio = Date.now();

    return next
      .handle()
      .pipe(tap(() => console.log(`Executado em ${Date.now() - inicio}ms`)));
  }
}
```

Registro global (em `main.ts`):

```ts
app.useGlobalInterceptors(new TempoInterceptor());
```

Ou em um controller/rota:

```ts
@UseInterceptors(TempoInterceptor)
@Controller()
export class AppController {}
```

## Middleware × Interceptor

| | Middleware | Interceptor |
| --- | --- | --- |
| Momento | Antes de guards, pipes e interceptors | Antes **e depois** do handler |
| Acesso | `req`, `res`, `next` (Express) | `ExecutionContext` e `CallHandler` (RxJS) |
| Transforma a resposta | Não (de forma simples) | Sim |
| Conhece o handler/controller | Não | Sim |
| Uso típico | Logs, CORS, parsing, checagem de header | Formatar resposta, cache, métricas, timeout |

## Resumo

- **Middleware** roda no início do ciclo e é ideal para logs e validações simples de requisição.
- Sempre chame `next()` ou encerre a resposta.
- O registro é feito em `configure()` do módulo, com `consumer.apply(...).forRoutes(...)`.
- **Interceptors** atuam em volta do handler e permitem manipular a resposta.
- Cuidado com filtros de rota: `startsWith('')` é sempre verdadeiro.

## Tecnologias

- [NestJS](https://nestjs.com/)
- TypeScript
- Express
- Vitest