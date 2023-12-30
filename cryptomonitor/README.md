# TDD - Grupo04

## Description
Trabajo Práctico grupal de Técnicas de Diseño - Grupo 04

## Development
El desarrollo de este proyecto se realiza en [Node.js](https://nodejs.org/es/) junto con [Typescript](https://www.typescriptlang.org).

Para la instalación de Node en un sistema operativo Ubuntu, puede instalarse con `apt`
```bash
$ sudo apt update
$ sudo apt install nodejs
$ node -v
v18.1.0
```

También usamos el package manager `npm` para la instalación y manejo de paquetes de Node
```bash
$ sudo apt install npm
$ npm -v
8.8.0
```

Por último, instalamos Typescript como un paquete de desarrollo de Node
```bash
$ npm install typescript --save-dev
```

Para correr el servidor de desarrollo, utilizar el siguiente script:
```bash
$ npm start
```

## Testing
Para escribir tests, usamos la librería [Jest](https://jestjs.io/)
```bash
$ npm install --save-dev jest
```

Para ejecutar los tests, basta con ejecutar el comando `test` del paquete con `npm`
```bash
$ npm test
> tdd-grupo04@1.0.0 test
> jest

 PASS  tests/index.test.ts
  ✓ adding 1 plus 2 equals 3 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.143 s, estimated 1 s
Ran all test suites.
```

## Authors and acknowledgment
- Franco Riborati 
- Nicole Raveszani 
- Franco Ferrer Vieyra
- Juan Manuel Straus 
- Franco Scaccheri Cassanello
