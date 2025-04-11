# API de Gerenciamento de Tarefas

Este projeto é uma aplicação fullstack desenvolvida como teste técnico. Ela permite o gerenciamento de tarefas, com operações de **criação**, **edição**, **exclusão** e **listagem**.

---

## Tecnologias Utilizadas

### Backend (API REST)

- **ASP.NET Core 8**
- **Entity Framework Core**
- **SQL Server**
- **Arquitetura em camadas** (Domain, Application, Infrastructure, Presentation)

###  Frontend

- **React**
- **Axios**
- **JavaScript (ES6+)**
- **CSS Modules**

---

## Estrutura do Projeto

TaskManagerAPI/ ├── Application/ # Camada de serviços e interfaces ├── Domain/ # Entidades de domínio ├── Infrastructure/ # Repositórios e DbContext ├── Presentation/TaskManagerAPI/ │ ├── Controllers/ # Controllers da API │ ├── appsettings.json # Configurações da aplicação ├── Migrations/ # Migrações do Entity Framework ├── task-manager-frontend/ # Projeto React (frontend)


---

## Como Rodar o Projeto

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)
- [Node.js](https://nodejs.org/) e NPM
- Visual Studio 2022 (recomendado)

---

### Configurando a API

1. Abra o projeto no Visual Studio.
2. Verifique o `appsettings.json` e configure sua connection string para o SQL Server, exemplo:

"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=TaskManagerDb;Trusted_Connection=True;"}

3.Rode o comando para aplicar as migrações e criar o banco:
cd Presentation/TaskManagerAPI
dotnet ef database update

4.Em seguida, inicie a API:
dotnet run
A API estará rodando em: https://localhost:5001

--------

Rodando o Frontend (React)
Navegue até o diretório do frontend:
cd task-manager-frontend

Instale as dependências:
npm install

Inicie a aplicação React:
npm start
A aplicação estará disponível em: http://localhost:3000

---------

Funcionalidades
-Listagem de tarefas

-Criação de novas tarefas

-Edição de tarefas existentes

-Exclusão de tarefas

-Integração total com API em ASP.NET
-------------

👨‍💻 Autor
Desenvolvido por Nathália Tesch 
📧 nathtesch@gmail.com
