FROM node:18-alpine

WORKDIR /app

# Copia arquivos de manifesto e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

CMD ["npm", "start"]

