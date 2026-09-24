23/09/2026

# Aula 10 - Rotas Dinâmicas (NestJS)

Este módulo demonstra como criar **rotas dinâmicas** em uma API NestJS, usando parâmetros de rota (`@Param`), validação/transformação automática com `ParseIntPipe` e tratamento de erros com `NotFoundException`.

## 🎯 Objetivo da aula

Implementar um endpoint que busca um jogo específico pelo seu `id`, recebido diretamente na URL (ex: `/jogos/3`), e retornar erro apropriado caso o jogo não exista.

## 📁 Estrutura relevante

```
src/
├── jogos.controller.ts   # Define a rota dinâmica GET /jogos/:id
├── jogos.service.ts      # Contém os dados e a lógica de busca
├── app.module.ts
└── main.ts
```

## 🕹️ JogosController

```ts
import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { JogosService } from "./jogos.service.js";

@Controller('jogos')
export class JogosController {
    constructor(private readonly jogosService: JogosService) {}

    @Get(':id')
    buscarPorId(@Param('id', ParseIntPipe) id: string) {
        const numId = +id;
        return this.jogosService.buscarPorId(numId);
    }
}
```

### Conceitos aplicados
- **`@Get(':id')`**: define um segmento dinâmico na rota, capturado como parâmetro.
- **`@Param('id', ParseIntPipe)`**: extrai o parâmetro `id` da URL e aplica o `ParseIntPipe`, que valida se o valor é um número válido (retornando `400 Bad Request` automaticamente caso não seja).
- Conversão adicional com `+id` para garantir o tipo `number` antes de repassar ao serviço.

## 🛠️ JogosService

```ts
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class JogosService {
    private jogos = [
        { id: 1, titulo: 'MineCraft', estudio: 'Mojang Studio' },
        { id: 2, titulo: 'The Legend of Zelda: Ocarina of time', estudio: 'Nintendo' },
        { id: 3, titulo: 'Grand Theft Auto V', estudio: 'Rockstar North' },
        { id: 4, titulo: 'Elden Ring', estudio: 'FromSoftware' },
        { id: 5, titulo: 'God of War', estudio: 'Santa Monica Studio' },
    ];

    buscarPorId(id: number) {
        const jogo = this.jogos.find((j) => j.id === id);
        if (!jogo) {
            throw new NotFoundException(`Jogo com ID ${id} não localizado em nosso estoque`);
        }
        return jogo;
    }
}
```

### Conceitos aplicados
- **`@Injectable()`**: marca a classe como um *provider*, disponível para injeção de dependência.
- **Array em memória**: simula uma base de dados com uma lista de jogos.
- **`Array.prototype.find`**: localiza o jogo cujo `id` corresponde ao parâmetro recebido.
- **`NotFoundException`**: exceção nativa do NestJS que retorna automaticamente status `404 Not Found` com uma mensagem customizada, caso o jogo não seja encontrado.

## ▶️ Rotas mapeadas

| Método | Rota          | Descrição                              |
|--------|---------------|-----------------------------------------|
| GET    | `/jogos/:id`  | Retorna o jogo correspondente ao `id`   |

## 🧪 Testando

```bash
# jogo existente
GET http://localhost:3000/jogos/3
# → { "id": 3, "titulo": "Grand Theft Auto V", "estudio": "Rockstar North" }

# jogo inexistente
GET http://localhost:3000/jogos/99
# → 404 Not Found - "Jogo com ID 99 não localizado em nosso estoque"

# id inválido (não numérico)
GET http://localhost:3000/jogos/abc
# → 400 Bad Request (ParseIntPipe)
```

## 🚀 Executando o projeto

```bash
npm install
npm run start:dev
```

O terminal exibirá o log do NestJS confirmando o mapeamento da rota dinâmica:

```
[RouterExplorer] Mapped {/jogos/:id, GET} route
```

## 📚 Resumo dos aprendizados

- Como criar rotas com parâmetros dinâmicos usando `:parametro`.
- Como extrair parâmetros de rota com o decorator `@Param`.
- Como usar *pipes* (`ParseIntPipe`) para validar/transformar dados de entrada.
- Como lançar exceções HTTP padronizadas (`NotFoundException`) quando um recurso não é encontrado.


