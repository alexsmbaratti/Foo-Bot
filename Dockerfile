FROM node:16

LABEL description="A simple Discord bot to manage your server"
LABEL version="0.1.0"

WORKDIR /usr/src/foo-bot

COPY . .

RUN npm install

CMD [ "npm", "start" ]