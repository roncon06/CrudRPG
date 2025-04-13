# 🧙‍♂️ RPG CRUD - Gerenciamento de Personagens e Itens Mágicos

Este é um projeto desenvolvido com **NestJS** utilizando **TypeORM** e banco de dados **SQLite**. Ele permite o cadastro e gerenciamento de personagens e seus respectivos itens mágicos.

## 📋 Funcionalidades

- ✅ Criar, listar, atualizar e remover **Personagens**
- ✅ Criar, listar, atualizar e remover **Itens Mágicos**
- ✅ Listar itens por personagem
- ✅ Buscar amuleto do personagem
- ✅ Documentação automática da API com Swagger

## 🛠️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/)
- [Swagger](https://swagger.io/)
- [Class Validator](https://github.com/typestack/class-validator)

## ⚙️ Como Rodar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/roncon06/CrudRPG.git
cd CrudRPG
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Execute a Aplicação

```bash
npm run start:dev
```

A aplicação será iniciada em:  
📍 `http://localhost:3000`

### 4. Acesse a Documentação (Swagger)

📄 Acesse:  
```
http://localhost:3000/api
```

## 🧪 Exemplos de JSON para Testes

### ➕ Criar Personagem

```json
{
  "nome": "Thorin",
  "nomeAventureiro": "Martelo de Pedra",
  "classe": "Guerreiro",
  "level": 5,
  "forcaBase": 6,
  "defesaBase": 4
}
```

### ➕ Criar Item Mágico

```json
{
  "nome": "Espada Flamejante",
  "tipo": "Arma",
  "forca": 5,
  "defesa": 1,
  "personagemId": 1
}
```
