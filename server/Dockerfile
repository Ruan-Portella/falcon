FROM node:18.12.1-slim

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]