FROM keymetrics/pm2:latest-alpine

WORKDIR /app

COPY app /app/app
COPY core /app/core
COPY dist /app/dist
COPY public /app/public
COPY webpack /app/webpack
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY tslint.json /app/tslint.json
COPY pm2.json /app/pm2.json

RUN npm install --production

RUN ls -laR /app

CMD [ "pm2-runtime", "start", "/app/pm2.json" ]