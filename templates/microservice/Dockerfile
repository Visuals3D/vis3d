FROM node:10.16.3-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/package.json

RUN npm install

COPY ./ /app

CMD sh -c  "if [ '$NODE_ENV' = 'production' ] ; then npm run prod:start ; else npm run watch:debug ; fi"
