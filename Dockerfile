#FROM node:alpine
FROM node:16-alpine3.13

WORKDIR /my-app

COPY /my-app ./


RUN npm install
RUN npm run build


CMD ["npm", "start"]