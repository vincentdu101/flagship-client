FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

USER root

RUN npm install -g typescript
RUN npm install -g @angular/cli --latest
RUN npm install -g babel-cli
RUN npm install -g yarn
RUN yarn
RUN yarn start

COPY --chown=node:node . .

EXPOSE 4200

CMD ["ng-serve"]