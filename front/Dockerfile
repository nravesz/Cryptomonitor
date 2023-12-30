FROM node:18

EXPOSE $FRONT_PORT

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["npx", "serve", "-s", "build"]