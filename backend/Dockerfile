
FROM node:22-alpine AS builder

WORKDIR /app


COPY package*.json ./


RUN npm ci

COPY . .


FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app . 

EXPOSE 4000


CMD ["npm", "start"]