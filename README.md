Este é um desafio tecnico desenvolvido por mim [Ruan Portella](https://github.com/Ruan-Portella).

Desenvolvi uma aplicação full Stack para você procurar viagens.

## Ferramentas :wrench:

### Backend

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)
- [Chai](https://chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Jest](https://jestjs.io/)

### Frontend

- [React](https://pt-br.reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Shadcn](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/)

## Recursos :sparkles:

- Pesquisa de Viagem
- Escolha de Viagem
- Histórico de Viagens

## Metodologias e Design Patterns :pencil2:

- Arquitetura em camadas
- Princípios de SOLID

## Como executar a aplicação :computer:

Para executar a aplicação, você precisará ter instalada em sua máquina as seguintes ferramentas:

- Localmente: Node.js e MySQL
- Com Containers: Docker

<details>
<summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>

## 👉 Com Docker


### 1 - Clone o repositório e entre na pasta da aplicação

```sh
git clone git@github.com:Ruan-Portella/falcon.git && cd falcon
```

### 2 - Configure as variáveis de ambiente

`
 Altere o .env.example para .env na pasta raiz e preencha as variáveis de ambiente com as informações do seu banco de dados mysql e google api key.
`

### 5 - Suba o container do banco de dados, front e back.

```sh
docker-compose up -d
```

### 6 - Teste a aplicação (Opcional)

`
  Abra um outro terminal e rode o comando abaixo para testar a aplicação.
`

#### Frontend


```sh
docker-compose exec frontend npm run coverage
```

#### Backend

```sh
docker-compose exec backend npm run test
```

### 7 - Acesse a aplicação

`
Pronto! Agora é só acessar o http://localhost e se divertir!
`

## 👉 Sem Docker

### 1 - Clone o repositório e entre na pasta da aplicação

```sh
git clone git@github.com:Ruan-Portella/falcon.git && cd falcon
```

### 2 - Configure as variáveis de ambiente

`
 Altere o .env.example para .env na pasta server e preencha as variáveis de ambiente com as informações do seu banco de dados mysql e google api key.
`

### 3 - Instale as dependências

```sh
cd client && npm install && cd ../server && npm install
```

### 4 - Crie sua conexão do banco de dados e altere no arquivo database.ts na pasta server

`Para continuar sem o Docker você precisa criar uma conexão com o banco de dados mysql.`

`OU`

`Rode o comando abaixo para subir o container do banco de dados`

```sh
docker-compose up db -d
```

### 5 - Suba a aplicação front e back

```sh
cd .. && cd client && npm run dev
```

`Crie outro terminal e rode o comando abaixo`

```sh
cd .. && cd server && npm run dev
```

### 6 - Teste a aplicação (Opcional)

`
  Abra um outro terminal e rode o comando abaixo para testar a aplicação.
`

#### Frontend

```sh
cd client && npm run coverage
```

#### Backend

```sh
cd server && npm run test
```

### 7 - Acesse a aplicação

`
Pronto! Agora é só acessar o http://localhost:5173 e se divertir!
`

</details>

## Aplicação no Ar

<img src='https://i.imgur.com/2iRT0J4.png' alt='Aplicação No Ar' /> 
