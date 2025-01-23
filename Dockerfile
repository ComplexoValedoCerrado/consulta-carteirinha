FROM node:22.13.1-alpine3.21 as build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build
