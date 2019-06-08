FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

USER root

RUN npm install -g typescript
RUN npm install -g @angular/cli
RUN npm install -g yarn
RUN yarn

COPY --chown=node:node . .

EXPOSE 4200

CMD ["ng-serve"]