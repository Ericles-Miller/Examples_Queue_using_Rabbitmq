# RabbitMQ - Exemplos de Implementações de Filas

Este repositório contém diferentes implementações de filas usando RabbitMQ e NestJS, cada uma demonstrando diferentes características e configurações. O objetivo é fornecer exemplos práticos de como implementar diferentes tipos de filas de acordo com suas necessidades específicas.

## 🎯 Objetivo

O propósito deste repositório é servir como referência para desenvolvedores que precisam implementar diferentes tipos de filas em seus projetos, demonstrando as melhores práticas e configurações para cada caso de uso.

## 📑 Índice de Implementações

Cada implementação está em uma branch separada, com sua própria documentação e exemplo completo.

### Implementações Disponíveis

1. **[Fila Durável com Persistência e Confirmação](https://github.com/Ericles-Miller/Work_RabbitMq_Micro_Services_Simple_Queue/tree/queue_durable_persistent_)** - Branch: `durable-persistent-ack`
   - ✅ Durabilidade: Fila sobrevive a reinicializações
   - ✅ Persistência: Mensagens salvas em disco
   - ✅ Confirmação: Acknowledgment manual de mensagens
   - 📝 [Documentação Detalhada](./QueueREADME.MD)

## 🚀 Como Usar

1. Clone o repositório
```bash
git clone https://github.com/ericles/Work_RabbitMq_Micro_Services_Simple_Queue.git
```

2. Escolha a implementação
```bash
git checkout <nome-da-branch>
```

3. Instale as dependências
```bash
yarn install
```

4. Inicie o RabbitMQ
```bash
docker-compose up -d
```

5. Execute o projeto
```bash
# development
yarn run start

# watch mode
yarn run start:dev api && yarn start:dev rabbit-mq-process
```

## 💡 Próximas Implementações

As seguintes implementações estão planejadas para serem adicionadas:

- [ ] Fila Simples (sem confirmação/não durável)
- [ ] Fila com Dead Letter Exchange
- [ ] Fila com TTL (Time-To-Live)
- [ ] Fila com Prioridade
- [ ] Fila com Retry Pattern

## 📚 Recursos

- [Documentação do RabbitMQ](https://www.rabbitmq.com/documentation.html)
- [Documentação do NestJS](https://docs.nestjs.com/)
- [Microservices com NestJS](https://docs.nestjs.com/microservices/rabbitmq)

## 📝 Licença

Este projeto está sob a licença MIT.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
