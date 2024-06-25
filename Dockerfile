FROM node:20

WORKDIR /app
##RUN apt-get update -y && apt-get install -y openssl

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale todas as dependências

RUN npm install

# Copie o diretório prisma
COPY prisma ./prisma

# Gere o cliente Prisma
RUN npx prisma generate

# Copie todos os outros arquivos do projeto
COPY . .

# Execute o comando de build
RUN npm run build

# Exponha a porta que seu aplicativo usará
EXPOSE 3000

# Inicie o aplicativo
CMD [ "npm", "start" ]