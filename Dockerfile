FROM keymetrics/pm2:8-alpine

LABEL maintainer="jadok"

RUN mkdir /app

COPY ./bin /app/bin
COPY ./dist /app/dist
COPY ./node_modules /app/node_modules
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./pm2.json /app/pm2.json
COPY ./index.js /app/
RUN chown root:root /app/bin/ /app/dist/ -R


ENV NPM_CONFIG_LOGLEVEL warn

RUN cd /app && npm link

WORKDIR /opt/vemsy

RUN vemsy
RUN npm install -S /app

EXPOSE 9999

CMD [ "pm2-runtime", "start", "/opt/vemsy/pm2.json" ]
