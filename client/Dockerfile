FROM node:18.12.1-slim

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]