FROM node:18

EXPOSE $SERVER_PORT

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["node", "dist/app.js"]
