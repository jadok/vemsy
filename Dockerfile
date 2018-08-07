FROM keymetrics/pm2:8-alpine

LABEL maintainer="jadok"

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
COPY index.js /app/

ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install
RUN ls -la /app

EXPOSE 9999

CMD [ "pm2-runtime", "start", "/app/pm2.json" ]