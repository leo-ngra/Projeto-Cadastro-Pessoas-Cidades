# Cadastro de Pessoas e Cidades

## 💻 Projeto

Desenvolver uma plataforma que mostra quantas pessoas e cidades estão cadastradas e faz o registro de pessoas e as relaciona com as cidades.

## Sobre
Projeto desenvolvido em React com Typescript e utilizando a biblioteca do Material UI para a interface do usuário, é focado a responsividade para melhor experiencia em todos os dispositivos e a troca de tema entre claro e escuro.
Todas as pessoas e cidades cadastradas foram simuladas com uma API REST utilizando o AXIOS para as chamadas da API e o Json-server para mockar as requisições de CRUD como se estivesse utilizando um banco de dados real. A utilização da biblioteca unform foi para fazer a validação dos dados de usuários no formulário de cadastros de pessoas e cidades, a utilização do YUP é para a validação dos inputs.

## Tecnologias Utilizadas:

- ReactJS
- Typescript
- Material UI
- Axios
- JSON-Server
- Unform
- YUP

## Como utilizar:

Faça primeiro um clone deste repositório na sua máquina.

```
git clone https://github.com/leo-ngra/Projeto-Cadastro-Pessoas-Cidades.git
```

Execute o  comando abaixo para instalar todas as dependências do projeto.

```
yarn
```

Execute o comando:

```
yarn start
```
e para deixar o json server rodando na máquina:

```
yarn run json-server -w -p 3333 ./mock/database.json
```

Quando abrir o projeto, inserir um email e uma senha fake, porém o sistema armazena no LocalStorage para fazer o Login do sistema.
Entrando no projeto, pode realizar o cadastro de pessoas e cidades, modificar e apagar qualquer registro, e tudo fica armazenado em um banco de dados simulado pelo Json-server.



## Instalação das Dependencias:
```
yarn add react-router-dom@6
```
```
yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material
```
```
yarn add -D json-server
```
```
yarn add axios
```
```
yarn add @unform/web @unform/core
```
```
yarn add yup
```
