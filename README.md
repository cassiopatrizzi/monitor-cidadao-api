
# Monitor Cidadão API

## Descrição
API RESTful para monitoramento de índices que influenciam a vida dos moradores de uma cidade. Permite cadastro, autenticação, consulta e atualização de usuários, além de relatos e visualização de informações agregadas sobre qualidade do ar, prefeitura local, estabelecimentos ou serviços próximos (Google Places), baseados na localização do usuário.

## Funcionalidades
- Cadastro e login de usuários
- Consulta e alteração de dados do usuário
- Inserção de cidade, estado, endereço ou localização
- Adição e consulta de relatos
- Visualização de informações urbanas agregadas (qualidade do ar, prefeitura local e estabelecimentos próximos)
- Integração com APIs externas (OpenWeatherMap, Nominatim, Google Places)
- Envio de e-mail de validação de cadastro
- Documentação Swagger

## Regras de Negócio
- Usuário deve informar nome, e-mail, senha, cidade, estado e endereço
- Cadastro exige validação por e-mail
- Apenas usuários autenticados podem consultar seu próprio perfil
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
- Consulta de informações urbanas agregadas (qualidade do ar, prefeitura local e estabelecimentos próximos)
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
1. Instale as dependências: 
```bash
    npm install
```
2. Inicie a API: 
```bash
    npm start
```
3. Acesse a documentação em `/api-docs`

## Configuração do arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (preencha com suas próprias credenciais):

```
SMTP_HOST=smtp.seu_host_email.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_aplicativo
SMTP_FROM=no-reply@monitorcidadao.com
OPENWEATHER_KEY=seu_token_openweather
GOOGLE_PLACES_KEY=seu_token_google_places
```

- O arquivo `.env` é obrigatório para o funcionamento das integrações externas (e-mail, clima, Google Places).
- Nunca compartilhe seu `.env` publicamente.

## Observações
- As informações agregadas do endpoint `/info/all` são baseadas em dados de APIs externas reais e localização informada pelo usuário.

## Filtro de tipo de local (Google Places)

O endpoint `/info/all` aceita o parâmetro opcional `type` na query string para filtrar o tipo de local retornado pela Google Places API. Você pode informar o tipo em português (ex: `type=restaurante`, `type=rodoviaria`, `type=hospital`, etc) e o sistema faz a conversão automática para o tipo correspondente em inglês exigido pela API.

Exemplos de tipos aceitos em português:

- restaurante → restaurant
- hospital → hospital
- escola → school
- farmacia → pharmacy
- banco → bank
- supermercado → supermarket
- policia → police
- parque → park
- bar → bar
- hotel → lodging
- academia → gym
- rodoviaria → bus_station
- museu → museum
- cinema → movie_theater
- igreja → church

## Sobre a URL retornada (campo `places.url`)

No retorno do endpoint `/info/all`, o campo `places.url` mostra a URL de exemplo utilizada para a busca no Google Places. Se você informar o parâmetro `type`, ele será interpolado na URL como `includedTypes`, refletindo exatamente o filtro aplicado na consulta. Exemplo:

```
"places": {
    "info": { ... },
    "url": "https://places.googleapis.com/v1/places:searchNearby?location.latitude=-23.5&location.longitude=-46.6&includedTypes=restaurant&key=SEU_GOOGLE_PLACES_KEY"
}
```
Se não informar o parâmetro `type`, a URL não terá o parâmetro `includedTypes` e retorna todos os tipos de locais próximos.

# Testes automatizados e mock do serviço de e-mail

Para evitar sobrecarga e requisições reais ao serviço de e-mail durante os testes automatizados, o projeto utiliza um mock do `nodemailer` configurado em `test/setup.js`. Esse mock intercepta todas as chamadas de envio de e-mail, garantindo que nenhum e-mail real seja disparado durante a execução dos testes. Isso protege o serviço de e-mail contra stress e bloqueios, além de tornar os testes mais rápidos e confiáveis.

**Como funciona:**
- O arquivo `test/setup.js` mocka o método `createTransport` do `nodemailer` antes dos testes rodarem.
- Para garantir que o mock seja aplicado corretamente, execute os testes com:
    ```bash
    NODE_ENV=test npx mocha --require test/setup.js
    ```
- O código do serviço de usuário também verifica a variável de ambiente `NODE_ENV` e desabilita o envio real de e-mails em ambiente de teste.

# Geração automática de relatório dos testes

O projeto inclui um script para rodar os testes e gerar um relatório visual em HTML usando o reporter `mochawesome`. O relatório é salvo em `mochawesome-report/mochawesome.html` e pode ser aberto automaticamente após a execução dos testes.

**Script no package.json:**
```json
"scripts": {
    "test:report": "NODE_ENV=test mocha --require test/setup.js --reporter mochawesome && start mochawesome-report/mochawesome.html"
}
```

**Como usar:**
```bash
npm run test:report
```

Esse comando executa todos os testes, gera o relatório HTML e abre automaticamente o resultado no navegador padrão (Windows). Isso facilita a análise dos testes e a visualização dos resultados.