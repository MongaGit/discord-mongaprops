# discord-mongaprops

Este bot faz parte de um projeto com múltiplos bots exclusivos para um canal no Discord. 

Desenvolvido e mantido por mim, com foco em **containerização** e **ciclo de vida completo do projeto**. Todo o ambiente de desenvolvimento, testes e produção é gerenciado no meu **homelab**, utilizando **Proxmox** para virtualização e **Docker** para gerenciamento de containers.

## Breve Descrição

O **discord-mongaprops** é um bot que envia automaticamente uma mensagem diária de "Bom dia" acompanhada de uma imagem. Ele utiliza:
- [Discord.js](https://discord.js.org/) para interagir com a API do Discord.
- [node-schedule](https://www.npmjs.com/package/node-schedule) para agendar o envio da mensagem.
- Docker e Docker Compose para simplificar o deploy e a manutenção do container.

## Recursos

- **Envio Diário Automatizado:** Agenda o envio de uma mensagem de "Bom dia" com imagem diariamente.
- **Modo de Teste:** Permite o envio imediato da mensagem para facilitar os testes.
- **Configuração por Variáveis de Ambiente:** Personalize facilmente os parâmetros do bot a partir do arquivo `.env` ou passando diretamente via comando Docker.
- **Deploy via Docker:** Containerizado para facilitar a distribuição e escalabilidade.

## Requisitos

- [Node.js](https://nodejs.org/) 18.x ou superior
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- Conta no [Docker Hub](https://hub.docker.com/) (para deploy de containers)

## Instalação e Configuração

1. **Clone o Repositório:**
   ```sh
   git clone <URL-do-repositório>
   cd discord-mongaprops
   ```
2. **Instale as Dependências:**
   ```sh
   npm install
   ```
3. **Crie um Arquivo `.env`:**
   ```sh
   cp .env.example .env
   ```

4. **Configure as Variáveis de Ambiente:**
   - `MONGAPROPS_DISCORD_TOKEN`: Token de autenticação do bot no Discord.
   - `MONGAPROPS_SERVER_ID`: ID do servidor do Discord.
   - `MONGAPROPS_CHANNEL_ID`: ID do canal do Discord.
   - `MONGAPROPS_MONGA_ROLE_ID`: ID do cargo do Discord.
   - `MONGAPROPS_TEST_MODE`: Modo de teste (true/false).

5. **Inicie o Bot:**
   ```sh
   npm start
   ```

## Deploy via Docker

1. **Construa a Imagem Docker:**
   ```sh
   docker build -t <nome-da-imagem> .
   ```
2. **Execute o Container:**
   ```sh
   docker run -d --env-file .env <nome-da-imagem>
   ```
