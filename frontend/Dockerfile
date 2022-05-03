# Taken from https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:12.20.0-alpine3.10

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build

EXPOSE 3333

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3333

CMD [ "npm", "start" ]
