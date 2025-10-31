
# Monitor Cidadão API

## Descrição
API RESTful para monitoramento de índices que influenciam a vida dos moradores de uma cidade. Permite cadastro, autenticação, consulta e atualização de usuários, além de relatos e visualização de informações sobre qualidade do ar, barulho, iluminação, buracos, lixo, obras, áreas alagadas, transporte público e relatos de moradores.

## Funcionalidades
- Cadastro e login de usuários
- Consulta e alteração de dados do usuário
- Inserção de cidade, estado, endereço ou localização
- Adição e consulta de relatos
- Visualização de indicadores urbanos
- Integração com APIs externas (meteorologia, qualidade do ar, energia, prefeituras, transporte público, redes sociais)
- Envio de e-mail de validação de cadastro
- Documentação Swagger

## Regras de Negócio
- Usuário deve informar nome, e-mail, senha, cidade, estado e endereço
- Cadastro exige validação por e-mail
- Relatos podem ser consultados por todos os usuários
- Dados armazenados em banco de dados em memória

## Tecnologias
- Node.js
- Express
- Swagger (OpenAPI)
- Mensageria para e-mail
- Banco de dados em memória

# Requisitos Funcionais

- Cadastro, autenticação e atualização de usuários
- Consulta de perfil do usuário autenticado
- Cadastro e consulta de relatos urbanos
- Consulta de indicadores urbanos agregados (qualidade do ar, ruído, iluminação, buracos, lixo, obras, áreas alagadas, transporte público, redes sociais)
- Integração com APIs externas para dados dinâmicos
- Envio de e-mail de validação de cadastro
- Documentação interativa via Swagger

# Requisitos Não Funcionais

- API RESTful desenvolvida em Node.js com Express
- Documentação OpenAPI (Swagger)
- Armazenamento em banco de dados em memória (para fins de demonstração)
- Autenticação JWT para rotas protegidas
- Código modularizado por camadas (controllers, services, models, routes)
- Validação de dados de entrada e tratamento de erros
- Facilidade de execução local (npm install/start)

## Estrutura do Projeto

```
monitor-cidadao-api/
├── resources/
│   └── swagger.json
├── src/
│   ├── controllers/
│   │   ├── infoController.js
│   │   ├── reportController.js
│   │   └── userController.js
│   ├── index.js
│   ├── middleware/
│   │   └── authenticateJWT.js
│   ├── models/
│   │   ├── Report.js
│   │   └── User.js
│   ├── routes/
│   │   ├── infoRoutes.js
│   │   ├── reportRoutes.js
│   │   └── userRoutes.js
│   └── services/
│       ├── infoService.js
│       ├── reportService.js
│       └── userService.js
├── .env
├── node_modules/
├── package-lock.json
├── package.json
├── README.md
```

## Como executar
1. Instale as dependências: `npm install`
2. Inicie a API: `npm start`
3. Acesse a documentação em `/api-docs`

## Observações
- Todas as informações são baseadas em dados fornecidos pelos usuários