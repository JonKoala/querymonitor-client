# querymonitor-client
Client para a aplicação web _querymonitor_.

## Requisitos
 - [Node](https://nodejs.org) >= 8

## Instalação
Clone o projeto para a sua máquina e acesse o diretório do mesmo.
``` bash
$ git clone https://github.com/JonKoala/querymonitor-client.git
$ cd querymonitor-client
```
Instale as dependências.
``` bash
$ npm install
```

## Configuração
O projeto depende de um arquivo de configuração, que deve ficar no diretório `config/`. Crie uma cópia do arquivo `default.yml.example`, renomeie para `default.yml` e coloque as configurações do seu ambiente.

Exemplo de arquivo de configurações:
``` yaml
url:
  api: 'http://localhost:8080'

server:
  port: 8081
```

## Bundling
O projeto faz uso da ferramenta [webpack](https://webpack.js.org/) para gerar bundles da aplicação.

Para gerar um novo bundle do Client, basta usar o _npm_ para executar o comando `build`.
``` bash
$ npm run build
```
Caso não ocorra nenhum erro, um novo bundle da aplicação deve ser gerado, no diretório `dist/`.

## Execução
Com o bundle gerado, para subir o servidor de Client execute o comando `start` do _npm_.
``` bash
$ npm start
```
Caso não ocorra nenhum erro, um servidor deve ser criado, usando a porta especificada no arquivo de configurações (_e.g `http://localhost:8081/`_).

## Testes
O Client possui uma bateria de testes automatizados.

Para executar as rotinas de testes, basta executar o comando `test` do _npm_.
``` bash
$ npm test
```
Ao final da execução, um relatório com o desempenho do Client deve ser exibido.
