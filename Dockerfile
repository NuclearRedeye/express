FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./out/release/index.js ./

RUN npm ci --only=production

EXPOSE 80

CMD [ "node", "index.js" ]