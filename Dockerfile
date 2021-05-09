FROM node:alpine

WORKDIR /my-app

COPY /my-app ./


RUN npm install
#RUN npm install dotenv --save
RUN npm run build


CMD ["npm", "start"]