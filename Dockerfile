FROM node:16

WORKDIR /usr/src/foo-bot

COPY . .
COPY example-config.json config.json

RUN npm install

CMD [ "npm", "start" ]