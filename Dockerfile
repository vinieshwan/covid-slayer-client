# Build client
FROM node:12.20

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --silent && npm run build

EXPOSE 3000

CMD ["npm","start"]