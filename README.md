# Teste - Brain Agriculture

## Dependências e Ferramentas
- fastify
- Postgres
- Zod
- Prisma
- Dotenv
- Vitest
- Supertest
- Eslint
- TsNode
- TSX
- TSUP
- Typescript
- NPM Run All
- SOLID
- Docker
- Github Actions

## Instruções Iniciais

1.  Utilizar o comando `npm install` para instalar todas as dependências 
2. Crie o arquivo .env e copie as variáveis de ambiente do arquivo .env_example para o .env
2.  Instalar o banco de dados com o comando `docker-compose up -d` 
3.  Após criar o banco de dados rode o comando `npm run prisma:migrate:deploy` para rodar as migrations e criar as tabelas
4.  Para popular o banco de dados com o comando `npm run prisma:seed`
5.  Utilize o comando `npm run build` para criar a pasta dist com os arquivos js
6. Para rodar utilize `npm run start`

## Comandos Interessantes
- Com o comando `npm run prisma:studio` poderá ver o banco de dados pelo prisma studio
- Para rodar os testes integrados utilize o comando `npm run test`
- Para rodar os testes e2e utilize o comando `npm run test:e2e`, para utiliza-lo é preciso primeiro criar o arquivo .env, o banco de dados e rodar as migrations
- Para rodar em modo de desenvolvimento utilize o comando `npm run dev`

## Rotas
| TIPO  |                 ROTA                | DESCRIÇÃO |           EXEMPLO                 |
| ----  | ----------------------------------- | --------- | --------------------------------- |
| POST  | /rural-producer                     | Criação   |                                   
                                                            {                                 
                                                              "cpfOrCnpj": string,
                                                              "producerName": string
                                                              "farmName": string
                                                              "city": string
                                                              "state": string
                                                              "totalArea": number
                                                              "agriculturalArea": number
                                                              "vegetationArea": number
                                                              "plantedCropsEnum": ['SOJA', 'MILHO', 
                                                                'ALGODAO', 'CAFE', 'CANA_DE_ACUCAR'] 
                                                            }

| TIPO  |                 ROTA                | DESCRIÇÃO |           EXEMPLO                 |
| ----- | --------------------------------- | ----------- | --------------------------------  |
| PATCH | /rural-producer/:ruralProducerId  |   Editar    |
                                                            {
                                                              "cpfOrCnpj": string,
                                                              "producerName": string
                                                              "farmName": string
                                                              "city": string
                                                              "state": string
                                                              "totalArea": number
                                                              "agriculturalArea": number
                                                              "vegetationArea": number
                                                              "plantedCropsEnum": [{
                                                                "id": string
                                                                "rural_producer_id": string,
                                                                "name": string
                                                              }] 
                                                            }

| TIPO   |                 ROTA                | DESCRIÇÃO   |           EXEMPLO                 |
| -----  | ---------------------------------   | ----------- | --------------------------------  |
| DELETE | /rural-producer/:ruralProducerId    |   Deletar   |

| TIPO  |                 ROTA              | DESCRIÇÃO     |           EXEMPLO                 |
| ----- | --------------------------------- | -----------   | --------------------------------  |
| GET   |     /rural-producer/              |   Pegar Infos |