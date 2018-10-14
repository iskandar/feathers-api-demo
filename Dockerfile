FROM node:8-stretch

RUN yarn global add nodemon

WORKDIR /app
COPY . /app

RUN yarn install

EXPOSE 3030
CMD [ "node", "index.js" ]