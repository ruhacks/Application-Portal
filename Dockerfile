FROM node:15.12.0-alpine3.10

WORKDIR /ruhacks

ENV PATH /ruhacks/node_modules/.bin:$PATH

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install firebase-tools -g 

COPY . ./
CMD ["npm", "start"]