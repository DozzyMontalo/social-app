FROM node:16

COPY package.json /tmp/package.json

RUN cd /tmp && npm install

RUN rm -rf build

ADD ./ /src

RUN rm -rf node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN npm run build

EXPOSE 4000

CMD ["node", "build/src/app.js"]
