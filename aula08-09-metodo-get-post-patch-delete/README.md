# API de Convidados — Aula 08 e 09 - NestJS

 Neste exercício criamos uma API simples para **cadastrar, consultar, atualizar e remover convidados**, utilizando **NestJS e TypeScript**.

 A ideia foi praticar na prática como funcionam os principais métodos HTTP de uma API REST:

 - `GET`
- `POST`
- `PATCH`
- `DELETE`

 Também utilizamos o **Insomnia** para fazer as requisições e verificar o funcionamento dos endpoints.

---

 ## O que fizemos

 Durante o exercício, trabalhamos principalmente em três arquivos:

```
src/
├── convidados.controller.ts
├── convidados.service.ts
└── criar-convidado.dto.ts
```

 Cada arquivo possui uma responsabilidade diferente dentro da aplicação.

---

 ## 1\. `convidados.service.ts`

 No **Service** colocamos a lógica responsável pelos convidados.

 Criamos uma lista inicialmente com alguns convidados:

```
private convidados = [
  { id: 1, nome: 'Rebeca', idade: 20 },
  { id: 2, nome: 'Leonardo', idade: 18 },
  { id: 3, nome: 'Sergio', idade: 18 },
  { id: 4, nome: 'Mariano', idade: 22 },
  { id: 5, nome: 'Alvaro', idade: 21 },
];
```

 Depois criamos métodos para realizar as operações:

 ### Listar convidados

```
listarConvidados()
```

 Esse método retorna todos os convidados existentes na lista.

 ### Encontrar um convidado

```
encontrarConvidado(id)
```

 Esse método procura um convidado pelo seu `id`.

 Caso o convidado não seja encontrado, utilizamos:

```
NotFoundException
```

 para informar que aquele convidado não existe.

 ### Atualizar idade

 Criamos o método:

```
atualizarIdade(id, idade)
```

 Ele procura o convidado pelo ID e altera sua idade.

 ### Remover convidado

 Também criamos:

```
removerConvidadoLista(id)
```

 Esse método encontra o convidado pelo ID e remove ele da lista utilizando `splice()`.

---

 # 2\. `criar-convidado.dto.ts`

 Criamos um **DTO (Data Transfer Object)** para definir quais informações são necessárias para criar um convidado.

```
export class CriarConvidadoDto {
  nome: string;
  idade: number;
}
```

 Assim, quando fazemos um `POST`, esperamos receber:

```
{
  "nome": "João",
  "idade": 25
}
```

 O DTO deixa definido que o convidado possui:

 - `nome` → `string`
- `idade` → `number`

---

 # 3\. `convidados.controller.ts`

 No **Controller** criamos as rotas da API.

 Definimos o controller com:

```
@Controller('convidados')
```

 Por isso, todas as nossas requisições começam com:

```
/convidados
```

 O Controller recebe as requisições e chama os métodos que criamos no Service.

---

 # GET — Listar convidados

 Criamos uma rota `GET`:

```
@Get()
listaConvidados() {
  return this.convidadoService.listarConvidados();
}
```

 No Insomnia testamos:

```
GET http://localhost:3000/convidados
```

 Essa requisição retorna a lista de convidados.

 Exemplo:

```
[
  {
    "id": 1,
    "nome": "Rebeca",
    "idade": 20
  },
  {
    "id": 2,
    "nome": "Leonardo",
    "idade": 18
  }
]
```

---

 # POST — Criar convidado

 Depois criamos a rota `POST` para adicionar um novo convidado.

```
@Post()
criarConvidado(@Body() criarConvidado: CriarConvidadoDto) {
  ...
}
```

 No Insomnia enviamos:

```
POST http://localhost:3000/convidados
```

 Com um JSON no Body:

```
{
  "nome": "João",
  "idade": 25
}
```

 O Controller recebe os dados através do:

```
@Body()
```

 e envia essas informações para serem processadas.

---

 # PATCH — Atualizar convidado

 Também criamos uma rota `PATCH` para atualizar a idade de um convidado.

```
@Patch(':id')
```

 No Insomnia testamos:

```
PATCH http://localhost:3000/convidados/1
```

 Enviando no Body:

```
{
  "idade": 30
}
```

 Nesse caso:

 - `1` é o ID do convidado;
- `30` é a nova idade.

 Utilizamos:

```
@Param('id')
```

 para pegar o ID que veio pela URL e:

```
@Body('idade')
```

 para pegar a nova idade enviada no Body.

---

 # DELETE — Remover convidado

 Por último, criamos a rota `DELETE` para remover um convidado.

```
@Delete(':id')
```

 No Insomnia testamos:

```
DELETE http://localhost:3000/convidados/1
```

 O ID `1` é recebido através do:

```
@Param('id')
```

 Depois o Service procura esse convidado e remove ele da lista.

---

 # Testes realizados no Insomnia

 Utilizamos o **Insomnia** para testar todas as rotas que criamos.

 ### 1\. GET

```
GET /convidados
```

 Testamos se a API conseguia retornar os convidados cadastrados.

 ### 2\. POST

```
POST /convidados
```

 Testamos a criação de um novo convidado enviando `nome` e `idade`.

 ### 3\. PATCH

```
PATCH /convidados/:id
```

 Testamos a alteração da idade de um convidado existente.

 ### 4. DELETE

```
DELETE /convidados/:id
```

 Testamos a remoção de um convidado da lista.

---

 # Fluxo que aprendemos

 O funcionamento ficou dividido desta forma:

```
                 INSOMNIA
                     │
                     ▼
              HTTP Request
                     │
                     ▼
              CONTROLLER
                     │
                     ▼
                SERVICE
                     │
                     ▼
          Lista de convidados
```

 O **Insomnia** envia a requisição.

 O **Controller** identifica qual operação deve ser realizada.

 O **Service** executa a lógica da operação.

 Depois o resultado é retornado para quem fez a requisição.

---

 # Conceitos praticados

 Neste exercício praticamos:

 - Criação de API com NestJS
- Controllers
- Services
- DTO
- Injeção de dependência
- `@Controller()`
- `@Get()`
- `@Post()`
- `@Patch()`
- `@Delete()`
- `@Body()`
- `@Param()`
- `NotFoundException`
- Manipulação de arrays
- Requisições HTTP
- Testes de API utilizando Insomnia

---

 ## Resultado

 Ao final do exercício, criamos uma API de convidados capaz de realizar as quatro operações básicas:

```
GET     → consultar convidados
POST    → cadastrar convidado
PATCH   → atualizar idade
DELETE  → remover convidado
```

 Os dados foram armazenados **em memória**, dentro de um array no Service. Portanto, os dados não são persistidos em um banco de dados. O objetivo principal foi praticar a estrutura de uma API REST utilizando NestJS e entender como **Controller, Service, DTO e requisições HTTP** trabalham juntos.