FROM alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add npm && npm install

COPY . .

RUN npm run dev:start && npm run build:view

VOLUME /usr/src/app

CMD npm run start:server
