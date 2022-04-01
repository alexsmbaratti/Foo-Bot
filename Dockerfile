FROM node:16

LABEL description="A simple Discord bot to manage your server"

WORKDIR /usr/src/foo-bot

COPY . .

RUN npm install

CMD [ "npm", "start" ]