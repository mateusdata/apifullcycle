FROM node:21.7.1

WORKDIR /app


RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3

COPY script.sh ./
RUN chmod +x script.sh

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY . .

RUN npm run build   

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start" ]