FROM node:16.17-alpine AS builder

RUN apk add --update --no-cache python3 make g++ automake autoconf file build-base libtool nasm musl libpng-dev zlib-dev libjpeg-turbo-dev

WORKDIR /app

COPY .npmrc .npmrc
COPY package.json package.json

RUN yarn install

COPY . .

RUN yarn build:prod

FROM nginx:alpine

COPY ./docker/nginx/conf.d /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
