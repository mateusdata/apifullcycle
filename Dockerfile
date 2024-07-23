FROM node:21.7.1

WORKDIR /app
##RUN apt-get update -y && apt-get install -y openssl

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Copiar o .env para dentro do projeto, porque se rota o 
# npx prisma generate sem ter o .env a conceção com o banco de dados não vai ser comcluida

#COPY .env .env

# Instale todas as dependências

RUN npm install


# Copie o diretório prisma
COPY prisma ./prisma


# Copie todos os outros arquivos do projeto
COPY . .

# Execute o comando de build
RUN npm run build

# Gere o cliente Prisma
RUN npx prisma generate

# Exponha a porta que seu aplicativo usará
EXPOSE 3000

# Inicie o aplicativo
CMD [ "npm", "start" ]