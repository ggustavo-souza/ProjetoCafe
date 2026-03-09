FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN apt-get update -y && apt-get install -y openssl

COPY . .

EXPOSE 3333

CMD [ "npm", "run", "dev" ]